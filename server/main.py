from fastapi import FastAPI, WebSocket, HTTPException, Depends, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from crud import user as user_crud
from crud import message as message_crud
from crud import chat as chat_crud
from models.user import User, UserInDB
from models.message import Message, MessageInDB
from models.chat import Chat, ChatInDB
from pydantic import BaseModel
from datetime import timedelta
from typing import List
from connection_manager import ConnectionManager
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class SignupModel(BaseModel):
    first_name: str
    last_name: str
    email: str
    age: int
    gender: str
    password: str
    language: str

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    email: str

@app.post("/signup/", response_model=UserInDB)
async def signup(user: SignupModel):
    try:
        existing_user = await user_crud.get_user_by_email(user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        new_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            age=user.age,
            gender=user.gender,
            language=user.language,
            password=user.password
        )
        
        created_user = await user_crud.create_user(new_user)
        return created_user
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        user = await user_crud.get_user_by_email(form_data.username)
        
        if not user or not user_crud.verify_password(form_data.password, user.password):
            raise HTTPException(
                status_code=401,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(minutes=user_crud.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = user_crud.create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.websocket("/ws/{email}")
async def websocket_endpoint(websocket: WebSocket, email: str):
    await manager.connect(websocket, email)
    print(f"Client {email} connected")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received encoded message: {data} from {email}")
            decoded_message = base64.b64decode(data).decode()
            recipient_email, message = decoded_message.split(":", 1)
            print(f"Routing message to {recipient_email}: {message}")
            await manager.send_private_message(message, recipient_email)
    except WebSocketDisconnect:
        manager.disconnect(websocket, email)
        print(f"Client {email} disconnected")

@app.post("/users/", response_model=UserInDB)
async def create_user(user: User):
    return await user_crud.create_user(user)

@app.get("/users/{user_id}", response_model=UserInDB)
async def read_user(user_id: str):
    return await user_crud.read_user(user_id)

@app.get("/users/", response_model=List[UserInDB])
async def get_users():
    return await user_crud.list_users()

@app.post("/chats/", response_model=ChatInDB)
async def create_chat(chat: Chat):
    return await chat_crud.create_chat(chat)

@app.get("/chats/{chat_id}", response_model=ChatInDB)
async def read_chat(chat_id: str):
    return await chat_crud.read_chat(chat_id)

@app.get("/chats/", response_model=List[ChatInDB])
async def list_chats():
    return await chat_crud.list_chats()

@app.post("/messages/", response_model=MessageInDB)
async def send_message(message: Message):
    return await message_crud.send_message(message)

@app.get("/messages/{chat_id}", response_model=List[MessageInDB])
async def list_messages(chat_id: str):
    return await message_crud.list_messages(chat_id)

@app.delete("/messages/{message_id}")
async def delete_message(message_id: str):
    return await message_crud.delete_message(message_id)
