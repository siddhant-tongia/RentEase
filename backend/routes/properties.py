from fastapi import APIRouter,status,Depends,HTTPException
from pydantic import BaseModel
from schemas.property import PropertyCreate
from dependency import get_current_user
from database.connection import database

router = APIRouter()

property_collection = database["properties"]

class PropertyCreateResponse(BaseModel):
    message : str
    property_id : str

@router.post("/api/properties",status_code=status.HTTP_401_UNAUTHORIZED,response_model=PropertyCreateResponse)
async def create_property(property_data : PropertyCreate,current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "owner":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Only owner can create properties")

    property_document = {
        "owner_id":current_user["user_id"],
        "title": property_data.title,
        "address": property_data.address,
        "property_type": property_data.property_type,
        "monthly_rent": property_data.monthly_rent,
        "availability": property_data.availability,
        "description": property_data.description
    }

    result = await property_collection.insert_one(property_document)

    return {
        "message": "Property created successfully",
        "property_id": str(result.inserted_id)
    }