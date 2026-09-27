from fastapi import APIRouter, HTTPException, Depends
from database import get_database
from utils.dependencies import get_current_user
from models.performance import PerformanceMetrics, PredictionRecord
from datetime import datetime
from bson import ObjectId
from typing import List, Optional

router = APIRouter()

@router.get("/session/{session_id}")
async def get_session_performance(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get performance data for a specific session"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    # Get performance record
    performance = await db.performance.find_one({
        "session_id": session_id,
        "user_id": user_id
    })
    
    if not performance:
        raise HTTPException(status_code=404, detail="Performance data not found")
    
    # Get session data
    session = await db.sessions.find_one({"_id": ObjectId(session_id)})
    
    # Calculate metrics if not present
    metrics = performance.get("metrics")
    if not metrics and performance.get("predictions"):
        metrics = calculate_metrics(performance.get("predictions", []))
    
    return {
        "session_id": session_id,
        "session_number": session.get("session_number") if session else None,
        "date": session["start_time"].isoformat() if session and isinstance(session["start_time"], datetime) else None,
        "start_time": session["start_time"].isoformat() if session and isinstance(session["start_time"], datetime) else None,
        "duration": calculate_duration(session) if session else None,
        "words_typed": session.get("words_typed", 0) if session else 0,
        "characters": session.get("characters", 0) if session else 0,
        "quick_phrases": session.get("quick_phrases", 0) if session else 0,
        "suggestions": session.get("suggestions_used", 0) if session else 0,
        "metrics": metrics,
        "word_history": performance.get("word_history", [])
    }

@router.get("/user/all")
async def get_all_performance(
    current_user: dict = Depends(get_current_user)
):
    """Get all performance data for current user"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    # Get all sessions
    sessions = await db.sessions.find(
        {"user_id": user_id}
    ).sort("start_time", -1).to_list(length=100)
    
    if not sessions:
        return []
        
    session_ids = [str(s["_id"]) for s in sessions]
    
    # Fetch all performance documents in ONE query to fix N+1 issue, and exclude the massive 'predictions' array
    performances = await db.performance.find(
        {"session_id": {"$in": session_ids}, "user_id": user_id},
        {"predictions": 0}  # Exclude predictions to prevent freezing the server
    ).to_list(length=100)
    
    perf_map = {p["session_id"]: p for p in performances}
    
    result = []
    for session in sessions:
        session_id = str(session["_id"])
        performance = perf_map.get(session_id)
        
        # If metrics were calculated previously, they will be here.
        # If not, we don't calculate them on the fly anymore because we didn't fetch predictions.
        # (This is a necessary tradeoff to prevent crashing the page).
        metrics = performance.get("metrics") if performance else None
        if not metrics:
            metrics = {
                "accuracy": 0.0, "recall": 0.0, "precision": 0.0, "f1_score": 0.0,
                "total_predictions": 0, "correct_predictions": 0
            }
            
        start_time = session.get("start_time")
        if start_time:
            iso_start = start_time.isoformat() if isinstance(start_time, datetime) else str(start_time)
        else:
            iso_start = "N/A"
            
        # Ensure session_number is an integer or string
        session_number = session.get("session_number", 0)
        
        result.append({
            "id": session_id,
            "session_number": session_number,
            "date": iso_start.split("T")[0] if "T" in iso_start else iso_start,
            "start_time": iso_start,
            "duration": calculate_duration(session),
            "words_typed": session.get("words_typed", 0),
            "characters": session.get("characters", 0),
            "quick_phrases": session.get("quick_phrases", 0),
            "suggestions": session.get("suggestions_used", 0),
            "metrics": metrics,
            "word_history": performance.get("word_history", []) if performance else []
        })
    
    return result

@router.get("/", response_model=list)
async def get_all_performance_root(
    current_user: dict = Depends(get_current_user)
):
    """Get all performance data for current user (GET /api/performance/)"""
    return await get_all_performance(current_user)

@router.put("/session/{session_id}/word")
async def add_word_to_history(
    session_id: str,
    word_data: dict,
    current_user: dict = Depends(get_current_user)
):
    """Add a word to the session's word history"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    # Extract word from request body
    word = word_data.get("word")
    if not word:
        raise HTTPException(status_code=400, detail="Word is required in request body")
    
    # Verify session belongs to user
    session = await db.sessions.find_one({
        "_id": ObjectId(session_id),
        "user_id": user_id
    })
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Update word history
    await db.performance.update_one(
        {"session_id": session_id, "user_id": user_id},
        {
            "$push": {"word_history": word},
            "$set": {"updated_at": datetime.utcnow()}
        },
        upsert=True
    )
    
    return {"message": "Word added to history"}

def calculate_metrics(predictions: List[dict]) -> dict:
    """Calculate performance metrics from predictions"""
    if not predictions:
        return {
            "accuracy": 0.0,
            "recall": 0.0,
            "precision": 0.0,
            "f1_score": 0.0,
            "total_predictions": 0,
            "correct_predictions": 0
        }
    
    total = len(predictions)
    # For now, use confidence as a proxy for correctness
    # In a real scenario, you'd compare with ground truth
    correct = sum(1 for p in predictions if p.get("confidence", 0) > 0.7)
    
    accuracy = (correct / total * 100) if total > 0 else 0.0
    
    # Simplified metrics (in production, calculate from confusion matrix)
    return {
        "accuracy": round(accuracy, 2),
        "recall": round(accuracy * 0.95, 2),  # Placeholder
        "precision": round(accuracy * 0.97, 2),  # Placeholder
        "f1_score": round(accuracy * 0.96, 2),  # Placeholder
        "total_predictions": total,
        "correct_predictions": correct
    }

def calculate_duration(session: dict) -> str:
    """Calculate session duration"""
    if not session or not session.get("end_time"):
        if session and session.get("start_time"):
            # Calculate from start to now if session is ongoing
            start = session["start_time"]
            if isinstance(start, datetime):
                delta = datetime.utcnow() - start
            elif isinstance(start, str):
                try:
                    start_dt = datetime.fromisoformat(start.replace('Z', '+00:00'))
                    delta = datetime.utcnow() - start_dt.replace(tzinfo=None)
                except:
                    return "N/A"
            else:
                return "N/A"
            minutes = int(delta.total_seconds() / 60)
            return f"{minutes} min"
        return "Ongoing"
    
    start = session["start_time"]
    end = session["end_time"]
    
    if isinstance(start, datetime):
        start_dt = start
    elif isinstance(start, str):
        try:
            start_dt = datetime.fromisoformat(start.replace('Z', '+00:00'))
            if start_dt.tzinfo:
                start_dt = start_dt.replace(tzinfo=None)
        except:
            return "N/A"
    else:
        return "N/A"
    
    if isinstance(end, datetime):
        end_dt = end
    elif isinstance(end, str):
        try:
            end_dt = datetime.fromisoformat(end.replace('Z', '+00:00'))
            if end_dt.tzinfo:
                end_dt = end_dt.replace(tzinfo=None)
        except:
            return "N/A"
    else:
        return "N/A"
    
    delta = end_dt - start_dt
    minutes = int(delta.total_seconds() / 60)
    return f"{minutes} min"

