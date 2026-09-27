from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import os
import bcrypt

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  # 30 days

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    # Ensure password is a string
    if not isinstance(plain_password, str):
        plain_password = str(plain_password)
    
    # Bcrypt has a 72-byte limit
    password_bytes = plain_password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    
    # Ensure hashed_password is bytes (bcrypt.checkpw requires bytes)
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
    
    try:
        return bcrypt.checkpw(password_bytes, hashed_password)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt"""
    # Ensure password is a string
    if not isinstance(password, str):
        password = str(password)
    
    # Bcrypt has a 72-byte limit, so truncate if necessary
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    
    # Generate salt and hash password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    
    # Return as string (bcrypt returns bytes)
    return hashed.decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    """Decode JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None





