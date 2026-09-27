from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PredictionRecord(BaseModel):
    timestamp: datetime
    predicted_class: int  # 0: Left, 1: Right, 2: Foot, 3: Tongue
    confidence: float
    action_taken: str  # "move_left", "move_right", "move_down", "select_letter"
    letter_selected: Optional[str] = None

class PerformanceMetrics(BaseModel):
    accuracy: float
    recall: float
    precision: float
    f1_score: float
    total_predictions: int
    correct_predictions: int

class PerformanceBase(BaseModel):
    session_id: str
    user_id: str
    predictions: List[PredictionRecord] = []
    metrics: Optional[PerformanceMetrics] = None
    word_history: List[str] = []  # List of words typed in this session

class PerformanceCreate(PerformanceBase):
    pass

class PerformanceUpdate(BaseModel):
    predictions: Optional[List[PredictionRecord]] = None
    metrics: Optional[PerformanceMetrics] = None
    word_history: Optional[List[str]] = None

class PerformanceResponse(PerformanceBase):
    id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
        populate_by_name = True

class PerformanceInDB(PerformanceBase):
    id: Optional[str] = None
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
    
    class Config:
        from_attributes = True
        populate_by_name = True

