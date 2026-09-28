from fastapi import APIRouter,status,Depends,HTTPException
from pydantic import BaseModel
from typing import Literal
from dependency import get_current_user
from database.connection import database
from bson.objectid import ObjectId
from bson.errors import InvalidId

router = APIRouter()

users_collection = database["users"]

class VerifyAction(BaseModel):
    action : Literal["approved","rejected"]

class MessageResponse(BaseModel):
    message : str

@router.get("/api/admin/pending-owners")
async def get_pending_owners(current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Admin access required")

    cursor = users_collection.find({"role":"owner","status":"pending"})
    result = await cursor.to_list(length=None)

    for user in result:
        user["user_id"] = str(user["_id"])
        del user["_id"]
        del user["password_hash"]

    return result

@router.put("/api/admin/verify-owner/{user_id}",response_model=MessageResponse)
async def verify_owner(user_id : str,body : VerifyAction,current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Admin access required")

    try:
        _id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid user ID format")

    result = await users_collection.update_one(
        {"_id":_id,"role":"owner","status":"pending"},
        {"$set":{"status":body.action}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Pending owner not found")

    return {
        "message":f"Owner {body.action} successfully"
    }
