"""
Script to save the trained model from Model.ipynb
Run this after training the model in the notebook
"""
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../../notebooks'))

# This script should be run from the notebooks directory after training
# It will copy the model to backend/ml_model/eegnet_model.pth

import shutil
from pathlib import Path

def save_model():
    # Paths
    notebooks_dir = Path(__file__).parent.parent.parent / "notebooks"
    backend_dir = Path(__file__).parent.parent
    model_dir = backend_dir / "ml_model"
    
    # Source model (from notebook directory)
    source_model = notebooks_dir / "eegnet_model.pth"
    
    # Destination
    dest_model = model_dir / "eegnet_model.pth"
    
    if not source_model.exists():
        print(f"Model not found at {source_model}")
        print("Please train the model first in Model.ipynb")
        return False
    
    # Copy model
    shutil.copy2(source_model, dest_model)
    print(f"Model saved to {dest_model}")
    return True

if __name__ == "__main__":
    save_model()







