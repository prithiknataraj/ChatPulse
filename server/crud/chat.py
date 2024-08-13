# app/crud/chat.py
from fastapi import HTTPException
from bson import ObjectId
from typing import List
from db import db
from models.chat import Chat, ChatInDB

async def create_chat(chat: Chat) -> ChatInDB:
    chat_dict = chat.dict()
    result = await db.chats.insert_one(chat_dict)
    chat_in_db = ChatInDB(id=str(result.inserted_id), **chat_dict)
    return chat_in_db

async def read_chat(chat_id: str) -> ChatInDB:
    chat = await db.chats.find_one({"_id": ObjectId(chat_id)})
    if chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return ChatInDB(id=str(chat["_id"]), **chat)

async def list_chats() -> List[ChatInDB]:
    chats = []
    async for chat in db.chats.find():
        chats.append(ChatInDB(id=str(chat["_id"]), **chat))
    return chats