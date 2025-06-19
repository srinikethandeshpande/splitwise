from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from .database import Base


group_members = Table(
    "group_members",
    Base.metadata,
    Column("group_id", Integer, ForeignKey("groups.id")),
    Column("user_id", Integer, ForeignKey("users.id"))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    expenses_paid = relationship("Expense", back_populates="payer")


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    members = relationship("User", secondary=group_members)
    expenses = relationship("Expense", back_populates="group")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Float)

    group_id = Column(Integer, ForeignKey("groups.id"))
    payer_id = Column(Integer, ForeignKey("users.id"))

    group = relationship("Group", back_populates="expenses")
    payer = relationship("User", back_populates="expenses_paid")
