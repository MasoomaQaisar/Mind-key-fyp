from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    age: int
    medical_condition: str
    guardian_name: str
    consent: bool = True

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True
        populate_by_name = True

class UserInDB(UserBase):
    id: Optional[str] = None
    hashed_password: str
    created_at: datetime = datetime.utcnow()
    
    class Config:
        from_attributes = True
        populate_by_name = True
