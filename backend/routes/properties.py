from fastapi import APIRouter,status,Depends,HTTPException,Form,File,UploadFile
from pydantic import BaseModel
from typing import List
from dependency import get_current_user
from database.connection import database
from bson.objectid import ObjectId
from bson.errors import InvalidId
from utils.cloudinary_helper import upload_file

router = APIRouter()

properties_collection = database["properties"]
users_collection = database["users"]

class PropertyCreateResponse(BaseModel):
    message : str
    property_id : str

ALLOWED_IMAGE_TYPES = ["image/jpeg","image/png","image/webp"]

@router.post("/api/properties",status_code=status.HTTP_201_CREATED,response_model=PropertyCreateResponse)
async def create_property(
    title : str | None = Form(None,max_length=100),
    address : str = Form(...,min_length=5,max_length=100),
    property_type : str = Form(...),
    monthly_rent : float = Form(...,gt=0),
    availability : str = Form(...),
    description : str | None = Form(None,max_length=500),
    images : List[UploadFile] = File([]),
    current_user : dict = Depends(get_current_user)
):
    if current_user["role"] != "owner":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Only owner can create properties")

    if property_type not in ("apartment","house","room","other"):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail="Invalid property type")

    if availability not in ("available","occupied"):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail="Invalid availability value")

    if len(images) > 3:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail="Maximum 3 images allowed")

    image_urls = []
    for image in images:
        if image.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Images must be JPG, PNG or WebP"
            )

        file_bytes = await image.read()
        if len(file_bytes) > 5 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Each image must be less than 5MB"
            )
        await image.seek(0)

        url = upload_file(image,folder="rentease/properties")
        image_urls.append(url)

    property_document = {
        "owner_id":current_user["user_id"],
        "title":title,
        "address":address,
        "property_type":property_type,
        "monthly_rent":monthly_rent,
        "availability":availability,
        "description":description,
        "image_urls":image_urls
    }

    result = await properties_collection.insert_one(property_document)

    return {
        "message": "Property created successfully",
        "property_id": str(result.inserted_id)
    }

@router.get("/api/properties/available")
async def view_available_properties(current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "tenant":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Tenants can see the property")
    
    cursor = properties_collection.find({"availability": "available"})

    result = await cursor.to_list(length=None)

    for property in result:
        owner = await users_collection.find_one({"_id":ObjectId(property["owner_id"])})
        property["owner_name"] = owner["name"] if owner else "Unknown"
        property["owner_phone"] = owner.get("phone","N/A") if owner else "N/A"
        property["property_id"] = str(property["_id"])
        del property["_id"]
        del property["owner_id"]

    return result

@router.get("/api/properties/available/{property_id}")
async def view_available_property(property_id : str, current_user : dict = Depends(get_current_user)):
    if current_user["role"] != "tenant":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Tenants can see the property")

    try:
        _id = ObjectId(property_id)
    except InvalidId:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid property ID format")

    result = await properties_collection.find_one({"_id":_id,"availability":"available"})

    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Property not found")

    owner = await users_collection.find_one({"_id":ObjectId(result["owner_id"])})
    result["owner_name"] = owner["name"] if owner else "Unknown"
    result["owner_phone"] = owner.get("phone","N/A") if owner else "N/A"
    result["property_id"] = str(result["_id"])
    del result["_id"]
    del result["owner_id"]
    return result

@router.get("/api/properties")
async def view_owner_properties(current_user : dict = Depends(get_current_user)):
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
async def view_owner_property(property_id : str,current_user : dict = Depends(get_current_user)):
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
async def update_property(
    property_id : str,
    title : str | None = Form(None,max_length=100),
    address : str = Form(...,min_length=5,max_length=100),
    property_type : str = Form(...),
    monthly_rent : float = Form(...,gt=0),
    availability : str = Form(...),
    description : str | None = Form(None,max_length=500),
    images : List[UploadFile] = File([]),
    existing_images : str = Form(""),
    current_user : dict = Depends(get_current_user)
):
    if current_user["role"] != "owner":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Only owner can make changes")

    try:
        _id = ObjectId(property_id)
    except InvalidId:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid property ID")

    if property_type not in ("apartment","house","room","other"):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail="Invalid property type")

    if availability not in ("available","occupied"):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail="Invalid availability value")

    owner_id = current_user["user_id"]

    kept_urls = [url for url in existing_images.split(",") if url.strip()] if existing_images else []

    new_image_urls = []
    for image in images:
        if image.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Images must be JPG, PNG or WebP"
            )

        file_bytes = await image.read()
        if len(file_bytes) > 5 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Each image must be less than 5MB"
            )
        await image.seek(0)

        url = upload_file(image,folder="rentease/properties")
        new_image_urls.append(url)

    all_image_urls = kept_urls + new_image_urls

    if len(all_image_urls) > 3:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,detail="Maximum 3 images allowed")

    updated_property_document = {
        "title":title,
        "address":address,
        "property_type":property_type,
        "monthly_rent":monthly_rent,
        "availability":availability,
        "description":description,
        "image_urls":all_image_urls
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