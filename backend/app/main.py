from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from .db import init_db, engine
from .models import Task, TaskCreate, TaskUpdate

app = FastAPI(title="Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/tasks", response_model=List[Task])
def read_tasks():
    with Session(engine) as s:
        return s.exec(select(Task)).all()

@app.post("/tasks", response_model=Task, status_code=201)
def create_task_endpoint(task: TaskCreate):
    with Session(engine) as s:
        db_task = Task(**task.dict())
        s.add(db_task)
        s.commit()
        s.refresh(db_task)
        return db_task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task_endpoint(task_id: int, task: TaskUpdate):
    with Session(engine) as s:
        db_task = s.get(Task, task_id)
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        data = task.dict(exclude_unset=True)
        for k, v in data.items():
            setattr(db_task, k, v)
        s.add(db_task)
        s.commit()
        s.refresh(db_task)
        return db_task

@app.delete("/tasks/{task_id}", status_code=204)
def delete_task_endpoint(task_id: int):
    with Session(engine) as s:
        db_task = s.get(Task, task_id)
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        s.delete(db_task)
        s.commit()
        return
