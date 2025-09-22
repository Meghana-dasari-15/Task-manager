from typing import Optional
from sqlmodel import SQLModel, Field

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = ""
    status: Optional[str] = "pending"  # 'pending' or 'completed'

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
