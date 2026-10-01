import asyncio
from pwdlib import PasswordHash
from database.connection import database

password_hash = PasswordHash.recommended()
users_collection = database["users"]

async def seed_admin():
    admin_email = "tongiasiddhant42@gmail.com".lower().strip()
    admin_password = "1234567890"

    hashed_password = password_hash.hash(admin_password)

    existing = await users_collection.find_one({"email": admin_email})
    if existing:
        await users_collection.update_one(
            {"email": admin_email},
            {"$set": {
                "password_hash": hashed_password,
                "role": "admin",
                "status": "approved"
            }}
        )
        print("Admin updated successfully")
        return

    await users_collection.insert_one({
        "name": "Admin",
        "email": admin_email,
        "password_hash": hashed_password,
        "role": "admin",
        "status": "approved"
    })

    print("Admin created successfully")

asyncio.run(seed_admin())
