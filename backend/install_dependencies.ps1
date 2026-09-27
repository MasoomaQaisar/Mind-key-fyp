# PowerShell script to install backend dependencies
# Run this script from the backend directory

Write-Host "Installing Backend Dependencies..." -ForegroundColor Green

# Step 1: Upgrade pip, setuptools, and wheel
Write-Host "`nStep 1: Upgrading pip, setuptools, and wheel..." -ForegroundColor Yellow
python.exe -m pip install --upgrade pip setuptools wheel

# Step 2: Install core FastAPI dependencies
Write-Host "`nStep 2: Installing FastAPI and core dependencies..." -ForegroundColor Yellow
pip install fastapi uvicorn[standard] pydantic pydantic[email] python-multipart

# Step 3: Install database drivers
Write-Host "`nStep 3: Installing database drivers..." -ForegroundColor Yellow
pip install motor pymongo

# Step 4: Install authentication libraries
Write-Host "`nStep 4: Installing authentication libraries..." -ForegroundColor Yellow
pip install python-jose[cryptography] passlib[bcrypt]

# Step 5: Install ML dependencies
Write-Host "`nStep 5: Installing ML dependencies (this may take a while)..." -ForegroundColor Yellow
pip install numpy
Write-Host "Installing PyTorch (CPU version)..." -ForegroundColor Yellow
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install scipy

Write-Host "`n✅ All dependencies installed successfully!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Create .env file with MongoDB connection string" -ForegroundColor White
Write-Host "2. Copy eegnet_model.pth to backend/ml_model/" -ForegroundColor White
Write-Host "3. Run: uvicorn main:app --reload --host 0.0.0.0 --port 8000" -ForegroundColor White







