import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def check():
    load_dotenv()
    client = AsyncIOMotorClient(os.getenv('MONGODB_URL'))
    db = client[os.getenv('DATABASE_NAME')]
    
    users = await db.users.count_documents({})
    sessions = await db.sessions.count_documents({})
    performance = await db.performance.count_documents({})
    
    print(f"Users: {users}")
    print(f"Sessions: {sessions}")
    print(f"Performance: {performance}")
    
    if users > 0:
        sample_user = await db.users.find_one({})
        print(f"Sample User Email: {sample_user.get('email')}")

if __name__ == "__main__":
    asyncio.run(check())
