import os 
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "rentease")

if not MONGODB_URL:
    raise ValueError("MONGODB_URL is not set in the .env file")

client = AsyncIOMotorClient(MONGODB_URL)

database = client[DATABASE_NAME]

async def check_database_connection():
    await client.admin.command("ping")
    print("MongoDB connection successful")