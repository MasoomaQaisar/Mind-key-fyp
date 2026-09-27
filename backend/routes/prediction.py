from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
import os
import numpy as np
import scipy.io
import asyncio

router = APIRouter()

def get_predict_function():
    """Load the real ATCNet predict function, or fall back to a mock for testing."""
    try:
        from ml_model.model_loader import predict
        return predict
    except ImportError:
        # Fallback mock for testing without model weights
        def mock_predict(data, patient_id=None):
            import random
            classes = ["Left Hand", "Right Hand", "Foot", "Tongue"]
            actions = ["move_left", "move_right", "move_down", "select_letter"]
            idx = random.randint(0, 3)
            return {
                "predicted_class": idx,
                "confidence": round(random.uniform(0.5, 1.0), 4),
                "class_name": classes[idx],
                "action": actions[idx]
            }
        return mock_predict


def extract_trials_from_mat(file_path: str):
    """
    Extract individual trials from a BCI Competition 2a .mat file.
    
    CRITICAL: Preprocessing is applied to CONTINUOUS data BEFORE windowing,
    exactly matching the braindecode training pipeline:
      1. Pick 22 EEG channels
      2. CAR (average reference) on continuous data
      3. Exponential moving standardize on continuous data
      4. THEN extract trial windows
    
    The .mat structure for BCI2a:
      mat['data'] has shape (1, n_runs). Each run contains:
        - run['X'][0,0]     : raw EEG data, shape (time_points, channels)  
        - run['trial'][0,0] : trial onset indices
        - run['y'][0,0]     : true labels (optional)
    
    Returns:
        list of dicts: [{"eeg_data": np.array(22, 1001), "true_label": int or None, "preprocessed": True}, ...]
    """
    from braindecode.preprocessing import exponential_moving_standardize
    
    mat = scipy.io.loadmat(file_path)
    
    if 'data' not in mat:
        raise ValueError(f"The .mat file does not contain a 'data' field. Keys found: {list(mat.keys())}")
    
    data_struct = mat['data']
    trials = []
    
    for run_idx in range(data_struct.shape[1]):
        run = data_struct[0, run_idx]
        X = run['X'][0, 0]                           # (time_points, channels)
        trial_onsets = run['trial'][0, 0].flatten()   # trial onset indices
        
        # Try to get true labels (may not exist in all files)
        true_labels = None
        try:
            true_labels = run['y'][0, 0].flatten()
        except (KeyError, IndexError, ValueError):
            pass
        
        # --- Preprocess the CONTINUOUS data (matching braindecode training order) ---
        # 1. Pick first 22 EEG channels and transpose to (channels, time_points)
        X_eeg = X[:, :22].T.astype(np.float32)       # shape: (22, time_points)
        
        # 2. CAR (Common Average Reference) on continuous data
        channel_mean = np.mean(X_eeg, axis=0, keepdims=True)
        X_car = X_eeg - channel_mean
        
        # 3. Exponential Moving Standardize on continuous data
        #    This MUST run on the full continuous recording, not per-trial!
        X_norm = exponential_moving_standardize(X_car, factor_new=1e-3)
        
        # --- NOW extract trial windows from preprocessed continuous data ---
        for i, onset in enumerate(trial_onsets):
            onset = int(onset)
            if onset + 1001 <= X_norm.shape[1]:
                # Extract window from already-preprocessed data
                trial_data = X_norm[:, onset : onset + 1001]   # shape: (22, 1001)
                
                true_label = None
                if true_labels is not None and i < len(true_labels):
                    true_label = int(true_labels[i])
                
                trials.append({
                    "eeg_data": trial_data,
                    "true_label": true_label,
                    "run_index": run_idx,
                    "trial_index_in_run": i,
                    "preprocessed": True  # Flag: data is already preprocessed
                })
    
    print(f"[extract] Preprocessed {len(trials)} trials from {data_struct.shape[1]} runs (continuous preprocessing)")
    return trials


@router.post("/predict")
async def predict_segment(data: dict):
    """Single segment prediction endpoint (kept for backward compatibility)."""
    eeg_data = np.array(data.get("eeg_data"))
    patient_id = data.get("patient_id", "S1")
    
    predict_func = get_predict_function()
    result = predict_func(eeg_data, patient_id=patient_id)
    return result


@router.websocket("/stream/{session_id}")
async def stream_predictions(websocket: WebSocket, session_id: str, patient_id: str = "S1", filename: str = ""):
    """
    WebSocket endpoint for real-time trial-by-trial prediction streaming.
    
    Flow:
    1. Accept WebSocket connection
    2. Locate the .mat file on disk (uploads/ folder)
    3. Extract all trial windows from the file
    4. For EACH trial (sequentially):
       a. Run ATCNet prediction
       b. Send the result + metadata to the frontend
       c. Wait 1.5 seconds (so the keyboard movement is visible)
    5. Send a "complete" message when done
    """
    print(f"[WS] Connection attempt: session={session_id}, patient={patient_id}, file={filename}")
    
    try:
        await websocket.accept()
        print(f"[WS] Connection accepted for session {session_id}")
    except Exception as e:
        print(f"[WS] Accept failed: {e}")
        return

    try:
        # --- Step 1: Locate the file on disk ---
        # If it's a preprocessed file, look in dataset/
        if filename.endswith('.npy'):
            target_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dataset")
            possible_paths = [os.path.join(target_dir, filename)]
        else:
            # Otherwise look in uploads/
            target_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
            possible_paths = [
                os.path.join(target_dir, f"{patient_id}_{filename}"),
                os.path.join(target_dir, filename),
            ]
        
        file_path = None
        for path in possible_paths:
            if os.path.exists(path):
                file_path = path
                break
        
        if file_path is None:
            error_msg = f"File not found. Searched: {possible_paths}"
            print(f"[WS] {error_msg}")
            await websocket.send_json({"type": "error", "message": error_msg})
            await websocket.close()
            return
        
        print(f"[WS] Found file: {file_path}")
        
        # --- Step 2: Extract trials from the file (in thread pool to avoid blocking) ---
        print(f"[WS] Extracting trials from {filename}...")
        await websocket.send_json({"type": "status", "message": "Loading and parsing data file..."})
        
        if filename.endswith('.npy'):
            # It's a preprocessed dataset array
            import numpy as np
            trials = await asyncio.to_thread(np.load, file_path, allow_pickle=True)
            # Ensure it's a list
            trials = trials.tolist() if isinstance(trials, np.ndarray) else trials
        elif filename.endswith('.mat'):
            # Run blocking scipy.io.loadmat in a thread pool so the event loop stays alive
            trials = await asyncio.to_thread(extract_trials_from_mat, file_path)
        else:
            await websocket.send_json({"type": "error", "message": "Unsupported file format. Must be .mat or .npy"})
            await websocket.close()
            return
            
        total_trials = len(trials)
        
        if total_trials == 0:
            await websocket.send_json({"type": "error", "message": "No valid trials found in the file."})
            await websocket.close()
            return
        
        print(f"[WS] Extracted {total_trials} trials. Starting predictions...")
        
        # Send initial metadata to frontend
        await websocket.send_json({
            "type": "stream_start",
            "total_trials": total_trials,
            "patient_id": patient_id,
            "filename": filename
        })
        
        # --- Step 3: Load prediction function (and warm up the model) ---
        predict_func = get_predict_function()
        
        # Warm up the model by loading it in a thread pool before streaming starts
        # This ensures the first prediction doesn't cause a long delay
        first_trial_data = trials[0]["eeg_data"]
        await asyncio.to_thread(predict_func, first_trial_data, patient_id)
        print(f"[WS] Model loaded and warmed up for patient {patient_id}")
        
        # --- Step 4: Stream predictions one trial at a time ---
        for i, trial in enumerate(trials):
            eeg_data = trial["eeg_data"]   # shape: (22, 1001)
            
            # Run model inference in thread pool to avoid blocking the event loop
            result = await asyncio.to_thread(predict_func, eeg_data, patient_id)
            
            # Build the message with full metadata
            message = {
                "type": "prediction",
                "trial_number": i + 1,
                "total_trials": total_trials,
                "run_index": trial["run_index"],
                "trial_index_in_run": trial["trial_index_in_run"],
                "predicted_class": result["predicted_class"],
                "class_name": result["class_name"],
                "action": result["action"],
                "confidence": round(result["confidence"], 4),
            }
            
            # Include true label if available
            if trial["true_label"] is not None:
                message["true_label"] = trial["true_label"]
            
            await websocket.send_json(message)
            print(f"[WS] Trial {i+1}/{total_trials}: {result['class_name']} ({result['confidence']:.2%}) -> {result['action']}")
            
            # Pause between trials so the frontend can show the keyboard movement
            if i < total_trials - 1:  # Don't wait after the last trial
                await asyncio.sleep(1.5)
        
        # --- Step 5: Send completion message ---
        await websocket.send_json({
            "type": "stream_complete",
            "total_trials": total_trials,
            "message": f"All {total_trials} trials processed."
        })
        print(f"[WS] Stream complete: {total_trials} trials processed for session {session_id}")
        
    except WebSocketDisconnect:
        print(f"[WS] Client disconnected from session {session_id}")
    except Exception as e:
        print(f"[WS] Stream error: {str(e)}")
        import traceback
        traceback.print_exc()
        try:
            await websocket.send_json({"type": "error", "message": str(e)})
        except:
            pass
    finally:
        try:
            await websocket.close()
        except:
            pass
