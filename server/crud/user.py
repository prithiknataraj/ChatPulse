# app/crud/user.py
from fastapi import HTTPException
from bson import ObjectId
from db import db
from models.user import User, UserInDB
# from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import List

SECRET_KEY = "b0b3beeb80245637bb4174d578d6f8fdefcb4b92758b604f6f10472956741584"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_user(user: User) -> UserInDB:
    user_dict = user.dict()
    # user_dict["password"] = pwd_context.hash(user_dict["password"])  # Hash the password
    result = await db.users.insert_one(user_dict)
    user_in_db = UserInDB(id=str(result.inserted_id), **user_dict)
    return user_in_db

async def read_user(user_id: str) -> UserInDB:
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserInDB(id=str(user["_id"]), **user)

async def get_user_by_email(email: str) -> UserInDB:
    user = await db.users.find_one({"email": email})
    if user:
        return UserInDB(id=str(user["_id"]), **user)
    return None

def verify_password(plain_password: str, stored_password: str) -> bool:
    return plain_password == stored_password

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def list_users() -> List[UserInDB]:
    users = []
    async for user in db.users.find():
        user_dict = {
            'id': str(user['_id']),
            'first_name': user.get('first_name', ''), 
            'last_name': user.get('last_name', ''),
            'email': user.get('email', ''),
            'age': user.get('age', 0),
            'gender': user.get('gender', ''),
            'language': user.get('language', ''),
            'password': user.get('password', '')
        }
        users.append(UserInDB(**user_dict))
    return users