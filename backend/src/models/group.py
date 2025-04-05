from sqlalchemy import Column, String
from .base import BaseModel


class Group(BaseModel):
    """Model representing university student groups"""
    __tablename__ = "groups"

    name = Column(String(50), nullable=False, unique=True, index=True)
    english_name = Column(String(50), nullable=False, unique=True)

    def __repr__(self):
        return f"<Group(id={self.id}, name='{self.name}')>"
