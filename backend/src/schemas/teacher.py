from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"


class TeacherBase(BaseModel):
    """Base model for Teacher data validation"""
    first_name: Optional[str] = Field(
        None, description="First name of the teacher")
    last_name: str = Field(..., description="Last name of the teacher")
    patronymic: Optional[str] = Field(
        None, description="Patronymic (middle name)")
    gender: Optional[Gender] = Field(None, description="Gender of the teacher")


class TeacherCreate(TeacherBase):
    """Model for validating Teacher creation data"""
    pass


class TeacherUpdate(TeacherBase):
    """Model for validating Teacher update data"""
    last_name: Optional[str] = Field(
        None, description="Last name of the teacher")


class TeacherResponse(TeacherBase):
    """Model for Teacher response data"""
    id: int = Field(..., description="Unique identifier")
    full_name: str = Field(..., description="Full name of the teacher")

    class Config:
        orm_mode = True
