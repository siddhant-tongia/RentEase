import os
from fastapi import APIRouter,HTTPException,status,Response,Depends,Form,File,UploadFile
from pydantic import BaseModel
from typing import Literal
from pwdlib import PasswordHash
from datetime import datetime,timedelta,timezone
import jwt
from dotenv import load_dotenv
from database.connection import database
from dependency import get_current_user
from utils.cloudinary_helper import upload_file

load_dotenv()

class LoginRequest(BaseModel):
    email : str
    password : str

class MessageResponce(BaseModel):
    message : str

router = APIRouter()

password_hash = PasswordHash.recommended()
users_collection = database["users"]

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))

if not JWT_SECRET:
    raise ValueError("JWT_SECRET is not set in the .env file")

@router.post("/api/auth/register",status_code=status.HTTP_201_CREATED,response_model=MessageResponce)
async def register(
    name : str = Form(...,min_length=2,max_length=50),
    email : str = Form(...),
    password : str = Form(...,min_length=8),
    role : str = Form(...),
    document : UploadFile | None = File(None)
):
    if role not in ("owner","tenant"):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Role must be owner or tenant"
        )

    email = email.lower()

    existing_user = await users_collection.find_one(
        {"email": email}
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    if role == "owner" and not document:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Ownership proof document is required for owner registration"
        )

    document_url = None
    if document:
        allowed_types = ["image/jpeg","image/png","image/webp","application/pdf"]
        if document.content_type not in allowed_types:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Document must be a JPG, PNG, WebP image or PDF"
            )

        file_size = await document.read()
        if len(file_size) > 5 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Document must be less than 5MB"
            )
        await document.seek(0)

        document_url = upload_file(document,folder="rentease/documents")

    hashed_password = password_hash.hash(password)

    user_document = {
        "name":name,
        "email":email,
        "password_hash":hashed_password,
        "role":role,
        "status":"pending" if role == "owner" else "approved"
    }

    if document_url:
        user_document["document_url"] = document_url

    await users_collection.insert_one(user_document)

    if role == "owner":
        return {
            "message": "Registration successful. Your account is under review. You can login once approved by admin."
        }

    return{
        "message": "User registered successfully"
    }

@router.post("/api/auth/login",response_model=MessageResponce)
async def login(detail:LoginRequest,response:Response):
    email = str(detail.email).lower()
    user = await users_collection.find_one(
        {"email":email}
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    password_is_valid = password_hash.verify(
        detail.password,
        user["password_hash"]
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if user.get("role") == "owner" and user.get("status") != "approved":
        if user.get("status") == "pending":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your account is pending verification. Please wait for admin approval."
            )
        if user.get("status") == "rejected":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your verification was rejected. Please re-register with valid documents."
            )

    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRE_MINUTES)

    token_data = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "role": user["role"],
        "exp": expiration_time
    }

    access_token = jwt.encode(
        token_data,
        JWT_SECRET,
        algorithm=JWT_ALGORITHM
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=JWT_EXPIRE_MINUTES * 60
    )

    return {
        "message": "Login successful"
    }

@router.get("/api/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return{
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "role": current_user["role"]
    }

@router.post("/api/auth/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return {
        "message":"Logout successfully"
    }