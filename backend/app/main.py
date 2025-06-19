from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine, Base


Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@app.get("/users/{user_id}/", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user



@app.post("/groups/", response_model=schemas.Group)
def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):
    return crud.create_group(db, group)

@app.get("/groups/{group_id}/", response_model=schemas.Group)
def read_group(group_id: int, db: Session = Depends(get_db)):
    db_group = crud.get_group(db, group_id)
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    return db_group



@app.post("/groups/{group_id}/expenses/", response_model=schemas.Expense)
def add_expense(group_id: int, expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.add_expense(db, group_id, expense)



@app.get("/groups/{group_id}/balances/", response_model=list[schemas.Balance])
def get_group_balances(group_id: int, db: Session = Depends(get_db)):
    return crud.calculate_group_balances(db, group_id)
