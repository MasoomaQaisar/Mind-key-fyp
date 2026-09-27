"""
Simple script to start the backend server with better error handling
Run this instead of uvicorn directly: python start_server.py
"""
import sys
import os
from pathlib import Path

# Add current directory to path
sys.path.insert(0, str(Path(__file__).parent))

def check_env_file():
    """Check if .env file exists"""
    env_path = Path(__file__).parent / ".env"
    if not env_path.exists():
        print("WARNING: .env file not found!")
        print("   Please create .env file with:")
        print("   MONGODB_URL=your-connection-string")
        print("   DATABASE_NAME=mindkeydb")
        print("   SECRET_KEY=your-secret-key")
        print("   ALGORITHM=HS256")
        print("   ACCESS_TOKEN_EXPIRE_MINUTES=43200")
        print()
        response = input("Continue anyway? (y/n): ")
        if response.lower() != 'y':
            print("Exiting. Please create .env file first.")
            sys.exit(1)
    else:
        print(".env file found")

def test_imports():
    """Test if required packages are installed"""
    try:
        import fastapi
        import uvicorn
        import motor
        print("Required packages installed")
        return True
    except ImportError as e:
        print(f"Missing package: {e}")
        print("   Run: pip install -r requirements.txt")
        return False

def main():
    print("=" * 60)
    print("MindKey Backend Server Startup")
    print("=" * 60)
    print()
    
    # Check .env file
    check_env_file()
    print()
    
    # Test imports
    if not test_imports():
        sys.exit(1)
    
    print()
    print("Starting server on http://localhost:8000") 
    print("   Press CTRL+C to stop")
    print("=" * 60)
    print()
    
    # Start server
    try:
        import uvicorn
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n\nServer stopped by user")
    except Exception as e:
        print(f"\nError starting server: {e}")
        print("\nTroubleshooting:")
        print("1. Check if port 8000 is already in use")
        print("2. Verify .env file has correct MongoDB connection string")
        print("3. Run: python test_connection.py")
        sys.exit(1)

if __name__ == "__main__":
    main()




