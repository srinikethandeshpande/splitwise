from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class GroupBase(BaseModel):
    name: str

class GroupCreate(GroupBase):
    member_ids: List[int]

class Group(GroupBase):
    id: int
    members: List[User]

    class Config:
        orm_mode = True


class ExpenseBase(BaseModel):
    description: str
    amount: float
    payer_id: int

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    group_id: int

    class Config:
        orm_mode = True


class Balance(BaseModel):
    user_id: int
    balance: float
