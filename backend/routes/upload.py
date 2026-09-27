from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Depends
import shutil
import os
from datetime import datetime
from utils.dependencies import get_current_user

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/dataset")
async def upload_dataset(
    file: UploadFile = File(...),
    patientId: str = Form(...),
    recordingDate: str = Form(...),
    sessionType: str = Form(...),
    notes: str = Form(""),
    current_user: dict = Depends(get_current_user)
):
    """
    Upload an EEG dataset file (.mat, .edf, etc.).
    
    The file is saved to the uploads/ folder with naming: {patientId}_{filename}
    Trial extraction is handled on-the-fly during WebSocket prediction streaming,
    so no background processing is needed here.
    """
    try:
        # Save file to uploads folder in a thread pool to avoid blocking the event loop
        from fastapi.concurrency import run_in_threadpool
        file_path = os.path.join(UPLOAD_DIR, f"{patientId}_{file.filename}")
        
        def save_file():
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        
        await run_in_threadpool(save_file)
        
        file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
        print(f"[Upload] Saved {file.filename} ({file_size_mb:.1f} MB) for patient {patientId}")
        
        return {
            "message": "File uploaded successfully. Go to Keyboard Interface and click 'Start Predictions' to begin.",
            "file_path": file_path,
            "patientId": patientId,
            "filename": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
