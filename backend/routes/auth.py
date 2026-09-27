from fastapi import APIRouter, HTTPException, Depends
from database import get_database
from models.user import UserCreate, UserLogin
from utils.auth import get_password_hash, verify_password, create_access_token
from utils.dependencies import get_current_user
from datetime import datetime
import traceback
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/signup")
async def signup(user_data: UserCreate):
    try:
        db = get_database()
    except Exception as e:
        logger.error(f"Database connection error: {str(e)}")
        raise HTTPException(
            status_code=503, 
            detail=f"Database connection failed: {str(e)}. Please check your MongoDB connection."
        )

    try:
        existing_user = await db.users.find_one({"email": user_data.email.lower()})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        if user_data.age < 5 or user_data.age > 120:
            raise HTTPException(status_code=400, detail="Age must be between 5 and 120")

        user_dict = {
            "email": user_data.email.lower(),
            "full_name": user_data.full_name,
            "age": user_data.age,
            "medical_condition": user_data.medical_condition,
            "guardian_name": user_data.guardian_name,
            "consent": user_data.consent,
            "hashed_password": get_password_hash(user_data.password),
            "created_at": datetime.utcnow()
        }

        result = await db.users.insert_one(user_dict)
        user_id = str(result.inserted_id)

        access_token = create_access_token({"sub": user_id})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "email": user_data.email,
                "full_name": user_data.full_name
            }
        }
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Signup error: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error during signup: {str(e)}"
        )

@router.post("/login")
async def login(credentials: UserLogin):
    try:
        db = get_database()
    except Exception as e:
        logger.error(f"Database connection error: {str(e)}")
        raise HTTPException(
            status_code=503, 
            detail=f"Database connection failed: {str(e)}. Please check your MongoDB connection."
        )

    try:
        user = await db.users.find_one({"email": credentials.email.lower()})
        if not user:
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        
        if not verify_password(credentials.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        
        access_token = create_access_token({"sub": str(user["_id"])})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(user["_id"]),
                "email": user["email"],
                "full_name": user["full_name"]
            }
        }
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error during login: {str(e)}"
        )

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current authenticated user information"""
    try:
        return {
            "id": str(current_user["_id"]),
            "email": current_user.get("email", ""),
            "full_name": current_user.get("full_name", ""),
            "age": current_user.get("age"),
            "medical_condition": current_user.get("medical_condition", ""),
            "guardian_name": current_user.get("guardian_name", ""),
            "created_at": current_user.get("created_at")
        }
    except Exception as e:
        logger.error(f"Get me error: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )
