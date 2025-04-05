from sqlalchemy import Column, String, Enum
import enum
from .base import BaseModel


class Gender(enum.Enum):
    MALE = "male"
    FEMALE = "female"


class Teacher(BaseModel):
    """Model representing university teachers/professors"""
    __tablename__ = "teachers"

    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=False, index=True)
    patronymic = Column(String(100), nullable=True)
    gender = Column(Enum(Gender), nullable=True)

    def __repr__(self):
        full_name = f"{self.last_name}"
        if self.first_name:
            full_name = f"{self.first_name} {full_name}"
        if self.patronymic:
            full_name = f"{full_name} {self.patronymic}"
        return f"<Teacher(id={self.id}, name='{full_name}')>"

    @property
    def full_name(self):
        """Returns the full name of the teacher in the format: Last name, First name Patronymic"""
        components = [self.last_name]
        if self.first_name:
            components.append(self.first_name)
        if self.patronymic:
            components.append(self.patronymic)
        return " ".join(components)
