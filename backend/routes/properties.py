from fastapi import APIRouter,status,Depends,HTTPException
from pydantic import BaseModel
from schemas.property import PropertyCreate
from dependency import get_current_user
from database.connection import database
from bson.objectid import ObjectId
from bson.errors import InvalidId

router = APIRouter()

properties_collection = database["properties"]

class PropertyCreateResponse(BaseModel):
    message : str
    property_id : str


@router.post("/api/properties",status_code=status.HTTP_201_CREATED,response_model=PropertyCreateResponse)
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

    result = await properties_collection.insert_one(property_document)

    return {
        "message": "Property created successfully",
        "property_id": str(result.inserted_id)
    }

@router.get("/api/properties")
async def view_properties(current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "owner":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Only owner can see their properties")

    owner_id = current_user["user_id"]

    cursor = properties_collection.find({"owner_id":owner_id})
    result = await cursor.to_list(length=None)

    for property_item in result:
        property_item["property_id"] = str(property_item["_id"])
        del property_item["_id"]

    return result

@router.get("/api/properties/{property_id}")
async def view_property(property_id : str,current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "owner":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Only owner can see their properties")

    try:
        _id = ObjectId(property_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid property ID format")

    owner_id = current_user["user_id"]

    result = await properties_collection.find_one({"_id":_id,"owner_id":owner_id})

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Property not found")

    result["property_id"] = str(result["_id"])
    del result["_id"] 

    return result

@router.put("/api/properties/{property_id}",status_code=status.HTTP_200_OK,response_model=PropertyCreateResponse)
async def update_property(property_id : str,updated_property : PropertyCreate,current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "owner":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Only owner can make changes")

    try:
        _id = ObjectId(property_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid property ID")

    owner_id = current_user["user_id"]

    updated_property_document = {
        "title": updated_property.title,
        "address": updated_property.address,
        "property_type": updated_property.property_type,
        "monthly_rent": updated_property.monthly_rent,
        "availability": updated_property.availability,
        "description": updated_property.description
    }

    result = await properties_collection.update_one({"_id":_id,"owner_id":owner_id},{"$set":updated_property_document})

    if result.matched_count == 0 :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="No such property found")

    return{
        "message":"Updated the property successfully",
        "property_id": str(_id)
    }

@router.delete("/api/properties/{property_id}",status_code=status.HTTP_200_OK,response_model=PropertyCreateResponse)
async def delete_property(property_id : str,current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "owner":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Only owners can delete properties")

    try:
        _id = ObjectId(property_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid property ID")

    owner_id = current_user["user_id"]

    result = await properties_collection.delete_one({"_id":_id ,"owner_id":owner_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="No such property found")

    return{
        "message":"Deleted the property successfully",
        "property_id": str(_id)
    }

