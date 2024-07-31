from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from bson import ObjectId
from typing import List, Optional
from datetime import datetime

# FastAPI initialization

app= FastAPI()

# DataBase Connection

client= AsyncIOMotorClient("mongodb+srv://prithik:Indian@cluster0.gyp783r.mongodb.net/?retryWrites=true&w=majority&appName=cluster0")
db= client.chatpulse

# Pydantic Models
# User

class User(BaseModel):
    username : str
    email : EmailStr
    password : str
    
class UserInDB(User):
    id : str
    
# Message
    
class Message(BaseModel):
    sender_id : str
    receiver_id : str
    content : str
    time_stamp : str
    chat_id : str
    
class MessageInDB(Message):
    id : str
    
# Chat
    
class Chat(BaseModel):
    participants_id : List[str]
    is_group : bool = False
    group_name : str = None
    
class ChatInDB(Chat):
    id : str

# CRUD Operations

# User operations
@app.post("/users/", response_model=UserInDB)
async def create_user(user: User):
    user_dict = user.dict()
    result = await db.users.insert_one(user_dict)
    user_in_db = UserInDB(id=str(result.inserted_id), **user_dict)
    return user_in_db

@app.get("/users/{user_id}", response_model=UserInDB)
async def read_user(user_id: str):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserInDB(id=str(user["_id"]), **user)

# Chat operations
@app.post("/chats/", response_model=ChatInDB)
async def create_chat(chat: Chat):
    chat_dict = chat.dict()
    result = await db.chats.insert_one(chat_dict)
    chat_in_db = ChatInDB(id=str(result.inserted_id), **chat_dict)
    return chat_in_db

@app.get("/chats/{chat_id}", response_model=ChatInDB)
async def read_chat(chat_id: str):
    chat = await db.chats.find_one({"_id": ObjectId(chat_id)})
    if chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return ChatInDB(id=str(chat["_id"]), **chat)

@app.get("/chats/", response_model=List[ChatInDB])
async def list_chats():
    chats = []
    async for chat in db.chats.find():
        chats.append(ChatInDB(id=str(chat["_id"]), **chat))
    return chats

# Message operations
@app.post("/messages/", response_model=MessageInDB)
async def send_message(message: Message):
    message_dict = message.dict()
    result = await db.messages.insert_one(message_dict)
    message_in_db = MessageInDB(id=str(result.inserted_id), **message_dict)
    return message_in_db

@app.get("/messages/{chat_id}", response_model=List[MessageInDB])
async def list_messages(chat_id: str):
    messages = []
    async for message in db.messages.find({"chat_id": chat_id}):
        messages.append(MessageInDB(id=str(message["_id"]), **message))
    return messages

@app.delete("/messages/{message_id}")
async def delete_message(message_id: str):
    result = await db.messages.delete_one({"_id": ObjectId(message_id)})
    if result.deleted_count == 1:
        return {"message": "Message deleted"}
    raise HTTPException(status_code=404, detail="Message not found")