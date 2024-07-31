# app/models/message.py
from pydantic import BaseModel

class Message(BaseModel):
    sender_id: str
    receiver_id: str
    content: str
    time_stamp: str
    chat_id: str

class MessageInDB(Message):
    id: str