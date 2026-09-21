import os
from fastapi import APIRouter,HTTPException,status,Response,Depends
from pydantic import BaseModel,Field,EmailStr,SecretStr
from typing import Literal
from pwdlib import PasswordHash
from datetime import datetime,timedelta,timezone
import jwt
from dotenv import load_dotenv
from database.connection import database
from dependency import get_current_user

load_dotenv()

class RegisterRequest(BaseModel): 
    name : str = Field(min_length=2,max_length=50,description="Enter your name")
    email : EmailStr
    password : SecretStr
    role : Literal["owner","tenant"]

class LoginRequest(BaseModel):
    email : EmailStr
    password : SecretStr

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
async def register(detail : RegisterRequest):
    email = str(detail.email).lower()

    existing_user = await users_collection.find_one(
        {"email": email}
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    hashed_password = password_hash.hash(
        detail.password.get_secret_value()
    )

    user_document = {
        "name":detail.name,
        "email":email,
        "password_hash":hashed_password,
        "role":detail.role
    }

    await users_collection.insert_one(user_document)

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
        detail.password.get_secret_value(),
        user["password_hash"]
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
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
        secure=False,  # For production -> secure=True
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