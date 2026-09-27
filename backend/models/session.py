from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class SessionBase(BaseModel):
    user_id: str
    start_time: datetime
    end_time: Optional[datetime] = None
    words_typed: int = 0
    characters: int = 0
    quick_phrases: int = 0
    suggestions_used: int = 0

class SessionCreate(SessionBase):
    pass

class SessionUpdate(BaseModel):
    end_time: Optional[datetime] = None
    words_typed: Optional[int] = None
    characters: Optional[int] = None
    quick_phrases: Optional[int] = None
    suggestions_used: Optional[int] = None

class SessionResponse(SessionBase):
    id: str
    session_number: int
    
    class Config:
        from_attributes = True
        populate_by_name = True

class SessionInDB(SessionBase):
    id: Optional[str] = None
    session_number: int
    
    class Config:
        from_attributes = True
        populate_by_name = True

