from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from dotenv import load_dotenv
import certifi
import os
from typing import Optional

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "mindkey")

class Database:
    client: Optional[AsyncIOMotorClient] = None

database = Database()

async def connect_to_mongo():
    """Connect to MongoDB"""
    try:
        database.client = AsyncIOMotorClient(
            MONGODB_URL,
            serverSelectionTimeoutMS=10000,
            connectTimeoutMS=10000,
            tlsCAFile=certifi.where()
        )
        # Test connection
        await database.client.admin.command('ping')
        print(f"Connected to MongoDB: {DATABASE_NAME}")
        
        # Create necessary indexes to prevent Memory Limit Exceeded errors during sorting
        db = database.client[DATABASE_NAME]
        
        # Index for prediction trials sorting
        await db.trials.create_index([
            ("patient_id", 1), 
            ("filename", 1), 
            ("sequence_number", 1)
        ])
        
        # Index for sessions sorting
        await db.sessions.create_index([
            ("user_id", 1), 
            ("session_number", -1)
        ])
        await db.sessions.create_index([
            ("user_id", 1), 
            ("start_time", -1)
        ])
        
    except Exception as e:
        print(f"MongoDB connection failed: {str(e)}")
        database.client = None

async def close_mongo_connection():
    if database.client:
        database.client.close()
        print("Disconnected from MongoDB")

def get_database():
    if database.client is None:
        raise Exception("Database client not initialized. Check MongoDB connection.")
    return database.client[DATABASE_NAME]

# Optional sync client (only create if MONGODB_URL is set)
sync_client = None
sync_db = None
if MONGODB_URL:
    try:
        sync_client = MongoClient(MONGODB_URL, tlsCAFile=certifi.where())
        sync_db = sync_client[DATABASE_NAME]
    except Exception as e:
        print(f"Warning: Failed to create sync MongoDB client: {str(e)}")
