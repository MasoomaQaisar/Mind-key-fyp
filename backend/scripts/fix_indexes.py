import asyncio
import os
from database import connect_to_mongo, get_database, database

async def check_indexes():
    try:
        await connect_to_mongo()
        db = get_database()
        print("Existing indexes on trials:")
        indexes = await db.trials.index_information()
        print(indexes)
        
        print("\nCreating index for trials...")
        # Create index on patient_id, filename, and sequence_number
        await db.trials.create_index([
            ("patient_id", 1),
            ("filename", 1),
            ("sequence_number", 1)
        ], name="trials_lookup_index")
        print("Index created successfully.")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if database.client:
            database.client.close()

if __name__ == "__main__":
    asyncio.run(check_indexes())
