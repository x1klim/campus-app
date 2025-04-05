from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class ClassType(str, Enum):
    LECTURE = "LEC"
    LABORATORY = "LAB"
    EXERCISE = "EXC"
    SEMINAR = "SEM"


class Weekday(int, Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7


class WeekType(str, Enum):
    WEEKLY = "weekly"  # Every week
    WEEK_A = "a"       # Only on A weeks
    WEEK_B = "b"       # Only on B weeks


class ClassSessionBase(BaseModel):
    """Base model for ClassSession data validation"""
    subject_id: int = Field(..., description="ID of the subject")
    teacher_id: int = Field(..., description="ID of the teacher")
    time_slot_id: int = Field(..., description="ID of the time slot")
    group_id: int = Field(..., description="ID of the student group")
    class_type: ClassType = Field(...,
                                  description="Type of class (lecture, lab, etc.)")
    weekday: Weekday = Field(..., description="Day of the week")
    week_type: WeekType = Field(
        WeekType.WEEKLY, description="Weekly schedule type")
    subgroup: Optional[int] = Field(
        None, description="Subgroup number (if applicable)")
    location: Optional[str] = Field(None, description="Location of the class")


class ClassSessionCreate(ClassSessionBase):
    """Model for validating ClassSession creation data"""
    pass


class ClassSessionUpdate(ClassSessionBase):
    """Model for validating ClassSession update data"""
    subject_id: Optional[int] = Field(None, description="ID of the subject")
    teacher_id: Optional[int] = Field(None, description="ID of the teacher")
    time_slot_id: Optional[int] = Field(
        None, description="ID of the time slot")
    group_id: Optional[int] = Field(
        None, description="ID of the student group")
    class_type: Optional[ClassType] = Field(
        None, description="Type of class (lecture, lab, etc.)")
    weekday: Optional[Weekday] = Field(None, description="Day of the week")
    week_type: Optional[WeekType] = Field(
        None, description="Weekly schedule type")


class ClassSessionResponse(ClassSessionBase):
    """Model for ClassSession response data"""
    id: int = Field(..., description="Unique identifier")

    class Config:
        orm_mode = True
