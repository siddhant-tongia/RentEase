import asyncio
from pwdlib import PasswordHash
from database.connection import database

password_hash = PasswordHash.recommended()
users_collection = database["users"]

async def seed_admin():
    admin_email = "admin@test.com"
    admin_password = "TestPassword123"

    existing = await users_collection.find_one({"email":admin_email})
    if existing:
        print("Admin already exists")
        return

    hashed_password = password_hash.hash(admin_password)

    await users_collection.insert_one({
        "name":"Admin",
        "email":admin_email,
        "password_hash":hashed_password,
        "role":"admin",
        "status":"approved"
    })

    print("Admin created successfully")

asyncio.run(seed_admin())
