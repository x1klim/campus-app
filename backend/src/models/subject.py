from sqlalchemy import Column, String
from .base import BaseModel


class Subject(BaseModel):
    """Model representing university subjects"""
    __tablename__ = "subjects"

    full_name = Column(String(255), nullable=False, index=True)
    short_name = Column(String(50), nullable=True)
    english_name = Column(String(255), nullable=True)

    def __repr__(self):
        return f"<Subject(id={self.id}, full_name='{self.full_name}')>"
