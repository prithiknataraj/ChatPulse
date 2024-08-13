from pydantic import BaseModel
from typing import Optional

class Message(BaseModel):
    sender_id: str
    receiver_id: str
    content: str
    chat_id: str
    time_stamp: Optional[str] = None

class MessageInDB(Message):
    id: str