import torch
import torch.nn as nn
import numpy as np
import os
import re
from pathlib import Path

# Load ATCNet from braindecode
try:
    from braindecode.models import ATCNet
except ImportError:
    print("braindecode is not installed. Please run: pip install braindecode")
    ATCNet = None

# Global dictionary to cache loaded models per patient
_models_cache = {}
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def _get_subject_folder(patient_id: str) -> str:
    """Extract subject number from patientId to find the corresponding folder."""
    if not patient_id:
        return "S1"
    
    # Extract first number found in patient_id
    match = re.search(r'\d+', patient_id)
    if match:
        num = match.group(0)
        return f"S{num}"
    
    # Default to S1 if no number
    return "S1"

def load_model(patient_id: str = "S1"):
    """Load the trained ATCNet model for a specific patient"""
    global _models_cache
    
    subject_folder = _get_subject_folder(patient_id)
    
    if subject_folder in _models_cache:
        return _models_cache[subject_folder]
    
    if ATCNet is None:
        raise ImportError("braindecode is required to load ATCNet.")
    
    # Look for model in save directory
    current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    # Path to ATCNet save directory
    base_save_dir = os.path.join(current_dir, "save", "1777193624_bci2a_ATCNet")
    model_path = os.path.join(base_save_dir, subject_folder, "train_end_params.pt")
    
    if not os.path.exists(model_path):
        # Fallback to S1 if the specific subject model doesn't exist
        fallback_path = os.path.join(base_save_dir, "S1", "train_end_params.pt")
        if os.path.exists(fallback_path):
            print(f"Warning: Model for {subject_folder} not found. Falling back to S1.")
            model_path = fallback_path
        else:
            raise FileNotFoundError(f"Model file not found at {model_path} and fallback S1 failed.")
    
    # Initialize ATCNet
    # As per bci2a.py: n_chans=22, n_outputs=4, n_times=1001 (for 250Hz * 4s? Wait, in code.py n_times=1001, but in bci2a.py it depends on preprocessing)
    # bci2a data usually has 22 channels, 1001 timepoints for 4s at 250Hz.
    model = ATCNet(n_chans=22, n_outputs=4, n_times=1001)
    
    # Load weights
    model.load_state_dict(torch.load(model_path, map_location=_device))
    model.to(_device)
    model.eval()
    
    print(f"Model loaded for {subject_folder} from {model_path}")
    _models_cache[subject_folder] = model
    return model

from scipy.signal import butter, sosfiltfilt

def preprocess_eeg_data(eeg_data: np.ndarray) -> torch.Tensor:
    """
    Preprocess EEG data exactly as it was during Braindecode training:
    1. Bandpass filter (4-38Hz)
    2. Average referencing
    3. Exponential moving standardize
    
    Args:
        eeg_data: numpy array of shape (channels, time_points)
    Returns:
        Preprocessed tensor ready for model input
    """
    import numpy as np
    
    if eeg_data.ndim == 2:
        # eeg_data shape: (22, 1001)
        
        # 1. Average referencing (CAR)
        channel_mean = np.mean(eeg_data, axis=0, keepdims=True)
        car_data = eeg_data - channel_mean
        
        # 2. Exponential moving standardize (using braindecode if available, fallback to z-score)
        try:
            from braindecode.preprocessing import exponential_moving_standardize
            # braindecode expects (channels, time)
            norm_data = exponential_moving_standardize(car_data, factor_new=1e-3)
        except ImportError:
            # Fallback robust z-score if braindecode not available
            mean = np.mean(car_data, axis=1, keepdims=True)
            std = np.std(car_data, axis=1, keepdims=True)
            norm_data = (car_data - mean) / (std + 1e-6)
            
        # Add batch dimension: (1, channels, time_points)
        final_data = norm_data[np.newaxis, :, :].astype(np.float32)
    else:
        # Fallback if already 3D
        final_data = eeg_data.astype(np.float32)
        
    tensor = torch.Tensor(final_data).to(_device)
    return tensor

def predict(eeg_data: np.ndarray, patient_id: str = "S1") -> dict:
    """
    Predict class from EEG data
    """
    model = load_model(patient_id)
    
    input_tensor = preprocess_eeg_data(eeg_data)
    
    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probabilities, 1)
    
    predicted_class = predicted.item()
    confidence_value = confidence.item()
    
    # 0: Left Hand, 1: Right Hand, 2: Foot, 3: Tongue
    class_mapping = {
        0: {"name": "Left Hand", "action": "move_left"},
        1: {"name": "Right Hand", "action": "move_right"},
        2: {"name": "Foot", "action": "move_down"},
        3: {"name": "Tongue", "action": "select_letter"}
    }
    
    return {
        "predicted_class": predicted_class,
        "confidence": confidence_value,
        "class_name": class_mapping[predicted_class]["name"],
        "action": class_mapping[predicted_class]["action"]
    }
