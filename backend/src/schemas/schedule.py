from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from .class_session import ClassType, Weekday, WeekType
from .subject import SubjectResponse
from .teacher import TeacherResponse
from .time_slot import TimeSlotResponse
from .group import GroupResponse


class ScheduleClassItem(BaseModel):
    """Class item in the schedule response"""
    id: int
    subject: Dict[str, Any]
    teacher: Dict[str, Any]
    time_slot: Dict[str, Any]
    class_type: str
    week_type: str
    subgroup: Optional[int] = None
    location: Optional[str] = None

    model_config = {
        "from_attributes": True
    }


class ScheduleDayItem(BaseModel):
    """Day item in the schedule response"""
    weekday: int
    classes: List[ScheduleClassItem]

    model_config = {
        "from_attributes": True
    }


class ScheduleResponse(BaseModel):
    """Model for the complete schedule response"""
    group: Dict[str, Any]
    days: List[Dict[str, Any]]

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "group": {
                    "id": 1,
                    "name": "CS-101",
                    "english_name": "Computer Science 101"
                },
                "days": [
                    {
                        "weekday": 1,  # Monday
                        "classes": [
                            {
                                "id": 1,
                                "subject": {
                                    "id": 1,
                                    "full_name": "Programming Fundamentals",
                                    "short_name": "ProgFund",
                                    "english_name": "Programming Fundamentals"
                                },
                                "teacher": {
                                    "id": 1,
                                    "first_name": "John",
                                    "last_name": "Doe",
                                    "patronymic": None,
                                    "gender": "male",
                                    "full_name": "John Doe"
                                },
                                "time_slot": {
                                    "id": 1,
                                    "name": "First Period",
                                    "english_name": "Period 1",
                                    "start_time": "09:00:00",
                                    "end_time": "10:30:00"
                                },
                                "class_type": "LEC",
                                "week_type": "weekly",
                                "subgroup": None,
                                "location": "Room 101"
                            }
                        ]
                    }
                ]
            }
        }
    }
