# app/models/chat.py
from pydantic import BaseModel
from typing import List, Optional

class Chat(BaseModel):
    participants_id: List[str]
    is_group: bool = False
    group_name: Optional[str] = None

class ChatInDB(Chat):
    id: str
