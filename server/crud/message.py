from fastapi import HTTPException
from bson import ObjectId
from typing import List
from db import db
from models.message import Message, MessageInDB

async def send_message(message: Message) -> MessageInDB:
    message_dict = message.dict()
    result = await db.messages.insert_one(message_dict)
    message_in_db = MessageInDB(id=str(result.inserted_id), **message_dict)
    return message_in_db

async def list_messages(chat_id: str) -> List[MessageInDB]:
    messages = []
    async for message in db.messages.find({"chat_id": chat_id}):
        messages.append(MessageInDB(id=str(message["_id"]), **message))
    return messages

async def delete_message(message_id: str):
    result = await db.messages.delete_one({"_id": ObjectId(message_id)})
    if result.deleted_count == 1:
        return {"message": "Message deleted"}
    raise HTTPException(status_code=404, detail="Message not found")