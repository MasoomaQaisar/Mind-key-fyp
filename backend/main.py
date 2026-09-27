from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, upload, prediction, sessions, performance, dataset
from database import connect_to_mongo, close_mongo_connection
import os

app = FastAPI(title="MindKey Backend API")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(prediction.router, prefix="/api/prediction", tags=["prediction"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])
app.include_router(performance.router, prefix="/api/performance", tags=["performance"])
app.include_router(dataset.router, prefix="/api/dataset", tags=["dataset"])

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
