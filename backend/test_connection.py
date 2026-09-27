"""
Quick test script to verify backend setup
Run this before starting the server to check everything is configured correctly
"""
import os
import sys
from pathlib import Path

def test_imports():
    """Test if all required packages are installed"""
    print("Testing imports...")
    try:
        import fastapi
        import uvicorn
        import motor
        import pymongo
        import pydantic
        from jose import jwt
        from passlib.context import CryptContext
        import numpy
        import scipy
        print("✅ Core imports successful")
        
        # Test torch separately (optional for server startup)
        try:
            import torch
            print("✅ PyTorch import successful")
        except Exception as e:
            print(f"⚠️  PyTorch import failed: {e}")
            print("   Server will start but predictions won't work")
            print("   See backend/FIX_PYTORCH.md for fix")
        
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("   Run: pip install -r requirements.txt")
        return False

def test_env_file():
    """Check if .env file exists"""
    print("\nTesting .env file...")
    env_path = Path(__file__).parent / ".env"
    if env_path.exists():
        print("✅ .env file exists")
        
        # Check if it has required variables
        from dotenv import load_dotenv
        load_dotenv()
        
        required_vars = ["MONGODB_URL", "DATABASE_NAME", "SECRET_KEY"]
        missing = []
        for var in required_vars:
            if not os.getenv(var):
                missing.append(var)
        
        if missing:
            print(f"⚠️  Missing variables in .env: {', '.join(missing)}")
            return False
        else:
            print("✅ All required variables found in .env")
            return True
    else:
        print("❌ .env file not found")
        print("   Create .env file with MongoDB connection string")
        return False

def test_model_file():
    """Check if model file exists"""
    print("\nTesting model file...")
    model_paths = [
        Path(__file__).parent / "ml_model" / "eegnet_model.pth",
        Path(__file__).parent.parent / "notebooks" / "eegnet_model.pth",
    ]
    
    for path in model_paths:
        if path.exists():
            print(f"✅ Model file found: {path}")
            return True
    
    print("⚠️  Model file not found")
    print("   Predictions won't work, but other features will")
    print("   Train model using notebooks/Model.ipynb")
    return False

def test_database_connection():
    """Test MongoDB connection"""
    print("\nTesting database connection...")
    try:
        from dotenv import load_dotenv
        load_dotenv()
        
        from motor.motor_asyncio import AsyncIOMotorClient
        import asyncio
        
        mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        
        if not mongodb_url or mongodb_url == "mongodb://localhost:27017":
            print("⚠️  MONGODB_URL not set in .env file")
            print("   Using default: mongodb://localhost:27017")
            print("   Make sure MongoDB is running locally or set MONGODB_URL in .env")
        
        async def test_connection():
            try:
                # Increase timeout for slow connections
                client = AsyncIOMotorClient(
                    mongodb_url, 
                    serverSelectionTimeoutMS=10000,
                    connectTimeoutMS=10000
                )
                await client.admin.command('ping')
                print(f"✅ Database connection successful")
                print(f"   Connected to: {mongodb_url.split('@')[-1] if '@' in mongodb_url else mongodb_url}")
                return True
            except Exception as e:
                error_msg = str(e)
                print(f"❌ Database connection failed")
                if "timeout" in error_msg.lower():
                    print("   Connection timeout - Check:")
                    print("   1. MongoDB is running (if local)")
                    print("   2. MONGODB_URL is correct in .env")
                    print("   3. Network/firewall allows connection")
                    print("   4. IP whitelist includes your IP (if Atlas)")
                elif "authentication" in error_msg.lower():
                    print("   Authentication failed - Check:")
                    print("   1. Username and password in MONGODB_URL")
                    print("   2. Database user exists and has permissions")
                else:
                    print(f"   Error: {error_msg}")
                return False
            finally:
                try:
                    client.close()
                except:
                    pass
        
        return asyncio.run(test_connection())
    except Exception as e:
        print(f"❌ Connection test error: {e}")
        return False

def main():
    print("=" * 50)
    print("MindKey Backend Setup Test")
    print("=" * 50)
    
    results = []
    results.append(("Imports", test_imports()))
    results.append(("Environment", test_env_file()))
    results.append(("Model File", test_model_file()))
    results.append(("Database", test_database_connection()))
    
    print("\n" + "=" * 50)
    print("Test Results:")
    print("=" * 50)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{name:20} {status}")
    
    all_passed = all(result for _, result in results)
    
    if all_passed:
        print("\n🎉 All tests passed! You can start the server.")
        print("   Run: uvicorn main:app --reload")
    else:
        print("\n⚠️  Some tests failed. Please fix the issues above.")
    
    return all_passed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

