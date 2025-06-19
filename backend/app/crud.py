from sqlalchemy.orm import Session
from . import models, schemas


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()



def create_group(db: Session, group: schemas.GroupCreate):
    db_group = models.Group(name=group.name)
    db_users = db.query(models.User).filter(models.User.id.in_(group.member_ids)).all()
    db_group.members = db_users
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

def get_group(db: Session, group_id: int):
    return db.query(models.Group).filter(models.Group.id == group_id).first()



def add_expense(db: Session, group_id: int, expense: schemas.ExpenseCreate):
    db_expense = models.Expense(
        description=expense.description,
        amount=expense.amount,
        payer_id=expense.payer_id,
        group_id=group_id
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_group_expenses(db: Session, group_id: int):
    return db.query(models.Expense).filter(models.Expense.group_id == group_id).all()



def calculate_group_balances(db: Session, group_id: int):
    group = get_group(db, group_id)
    expenses = get_group_expenses(db, group_id)
    members = group.members
    num_members = len(members)

    balances = {user.id: 0.0 for user in members}

    for expense in expenses:
        split = expense.amount / num_members
        for user in members:
            if user.id == expense.payer_id:
                balances[user.id] += expense.amount - split
            else:
                balances[user.id] -= split

    return [{"user_id": user_id, "balance": round(balance, 2)} for user_id, balance in balances.items()]
