from pydantic import BaseModel, EmailStr

class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    age: int
    gender: str
    language: str
    password: str

class UserInDB(User):
    id: str