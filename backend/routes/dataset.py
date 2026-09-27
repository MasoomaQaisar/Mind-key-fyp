from fastapi import APIRouter, HTTPException, Depends
import os

router = APIRouter()

DATASET_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "dataset")

@router.get("/files")
async def list_dataset_files():
    """List all preprocessed .npy files in the dataset folder"""
    if not os.path.exists(DATASET_DIR):
        os.makedirs(DATASET_DIR, exist_ok=True)
        return []
        
    files = []
    for filename in os.listdir(DATASET_DIR):
        if filename.endswith(".npy"):
            # Format size to human readable
            size_bytes = os.path.getsize(os.path.join(DATASET_DIR, filename))
            size_mb = size_bytes / (1024 * 1024)
            files.append({
                "filename": filename,
                "size_mb": round(size_mb, 2),
                "subject": filename.split('_')[0]
            })
            
    # Sort files alphabetically
    files.sort(key=lambda x: x["filename"])
    return files
