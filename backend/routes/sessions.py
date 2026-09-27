from fastapi import APIRouter, HTTPException, Depends
from database import get_database
from models.session import SessionCreate, SessionUpdate, SessionResponse
from utils.dependencies import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=dict)
async def create_session(
    current_user: dict = Depends(get_current_user)
):
    """Create a new session for the current user (POST /api/sessions/)"""
    return await _create_session_impl(current_user)

@router.post("/create", response_model=dict)
async def create_session_alt(
    current_user: dict = Depends(get_current_user)
):
    """Create a new session for the current user (alternative endpoint)"""
    return await _create_session_impl(current_user)

async def _create_session_impl(current_user: dict):
    """Create a new session for the current user"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    # Get next session number
    last_session = await db.sessions.find_one(
        {"user_id": user_id},
        sort=[("session_number", -1)]
    )
    session_number = (last_session["session_number"] + 1) if last_session else 1
    
    # Create session
    session_dict = {
        "user_id": user_id,
        "session_number": session_number,
        "start_time": datetime.utcnow(),
        "end_time": None,
        "words_typed": 0,
        "characters": 0,
        "quick_phrases": 0,
        "suggestions_used": 0
    }
    
    result = await db.sessions.insert_one(session_dict)
    session_id = str(result.inserted_id)
    
    # Create corresponding performance record
    await db.performance.insert_one({
        "session_id": session_id,
        "user_id": user_id,
        "predictions": [],
        "metrics": None,
        "word_history": [],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    })
    
    return {
        "id": session_id,
        "session_id": session_id,
        "_id": session_id,
        "session_number": session_number,
        "start_time": session_dict["start_time"].isoformat()
    }

@router.put("/{session_id}", response_model=dict)
async def update_session(
    session_id: str,
    session_update: SessionUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update session data (PUT /api/sessions/{session_id})"""
    return await _update_session_impl(session_id, session_update, current_user)

@router.put("/{session_id}/update", response_model=dict)
async def update_session_alt(
    session_id: str,
    session_update: SessionUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update session data (alternative endpoint)"""
    return await _update_session_impl(session_id, session_update, current_user)

async def _update_session_impl(session_id: str, session_update: SessionUpdate, current_user: dict):
    """Update session data implementation"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    # Verify session belongs to user
    session = await db.sessions.find_one({
        "_id": ObjectId(session_id),
        "user_id": user_id
    })
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Update session
    update_dict = {k: v for k, v in session_update.dict().items() if v is not None}
    if not update_dict:
        return {"message": "No updates provided"}
    
    await db.sessions.update_one(
        {"_id": ObjectId(session_id)},
        {"$set": update_dict}
    )
    
    return {"message": "Session updated successfully"}

@router.post("/{session_id}/end", response_model=dict)
async def end_session(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """End a session (POST /api/sessions/{session_id}/end)"""
    return await _end_session_impl(session_id, current_user)

@router.put("/{session_id}/end", response_model=dict)
async def end_session_alt(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """End a session (alternative endpoint)"""
    return await _end_session_impl(session_id, current_user)

async def _end_session_impl(session_id: str, current_user: dict):
    """End a session implementation"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    # Verify session belongs to user
    session = await db.sessions.find_one({
        "_id": ObjectId(session_id),
        "user_id": user_id
    })
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Update session
    await db.sessions.update_one(
        {"_id": ObjectId(session_id)},
        {"$set": {"end_time": datetime.utcnow()}}
    )
    
    return {"message": "Session ended successfully"}

@router.get("/", response_model=list)
async def get_user_sessions(
    current_user: dict = Depends(get_current_user)
):
    """Get all sessions for current user"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    sessions = await db.sessions.find(
        {"user_id": user_id}
    ).sort("start_time", -1).to_list(length=100)
    
    result = []
    for session in sessions:
        result.append({
            "id": str(session["_id"]),
            "session_number": session["session_number"],
            "start_time": session["start_time"].isoformat() if isinstance(session["start_time"], datetime) else session["start_time"],
            "end_time": session["end_time"].isoformat() if session.get("end_time") and isinstance(session["end_time"], datetime) else session.get("end_time"),
            "words_typed": session.get("words_typed", 0),
            "characters": session.get("characters", 0),
            "quick_phrases": session.get("quick_phrases", 0),
            "suggestions_used": session.get("suggestions_used", 0)
        })
    
    return result

@router.get("/{session_id}", response_model=dict)
async def get_session(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get a specific session"""
    db = get_database()
    user_id = str(current_user["_id"])
    
    session = await db.sessions.find_one({
        "_id": ObjectId(session_id),
        "user_id": user_id
    })
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {
        "id": str(session["_id"]),
        "session_id": str(session["_id"]),  # Add for compatibility
        "_id": str(session["_id"]),  # Add for compatibility
        "session_number": session["session_number"],
        "start_time": session["start_time"].isoformat() if isinstance(session["start_time"], datetime) else session["start_time"],
        "end_time": session["end_time"].isoformat() if session.get("end_time") and isinstance(session["end_time"], datetime) else session.get("end_time"),
        "words_typed": session.get("words_typed", 0),
        "characters": session.get("characters", 0),
        "quick_phrases": session.get("quick_phrases", 0),
        "suggestions_used": session.get("suggestions_used", 0)
    }

@router.post("/{session_id}/add_word", response_model=dict)
async def add_word_to_session(
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
    
    # Update word history in performance collection
    await db.performance.update_one(
        {"session_id": session_id, "user_id": user_id},
        {
            "$push": {"word_history": word},
            "$set": {"updated_at": datetime.utcnow()}
        },
        upsert=True
    )
    
    return {"message": "Word added to history"}

