from sqlmodel import Session, select
from .models import Task
from .db import engine

def get_all_tasks():
    with Session(engine) as s:
        return s.exec(select(Task)).all()

def get_task(task_id: int):
    with Session(engine) as s:
        return s.get(Task, task_id)

def create_task(data: dict):
    with Session(engine) as s:
        task = Task(**data)
        s.add(task)
        s.commit()
        s.refresh(task)
        return task

def update_task(task_id: int, fields: dict):
    with Session(engine) as s:
        task = s.get(Task, task_id)
        if not task:
            return None
        for k, v in fields.items():
            if v is not None:
                setattr(task, k, v)
        s.add(task)
        s.commit()
        s.refresh(task)
        return task

def delete_task(task_id: int):
    with Session(engine) as s:
        task = s.get(Task, task_id)
        if not task:
            return False
        s.delete(task)
        s.commit()
        return True
