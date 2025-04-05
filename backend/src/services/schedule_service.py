from typing import Dict, Any, Optional, List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..repositories.schedule_repository import ScheduleRepository
from ..schemas.schedule import ScheduleResponse, ScheduleDayItem, ScheduleClassItem
from ..schemas.group import GroupResponse
from ..models.class_session import ClassSession, Weekday


class ScheduleService:
    """Service for schedule-related operations"""

    def __init__(self, db: Session):
        self.repository = ScheduleRepository(db)

    def get_schedule_by_group_name(self, group_name: str) -> ScheduleResponse:
        """Get the complete schedule for a specific group by name"""
        # Get schedule data from repository
        schedule_data = self.repository.get_schedule_by_group_name(group_name)

        if not schedule_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Group with name '{group_name}' not found"
            )

        # Convert SQLAlchemy model objects to Pydantic models
        group_dict = {
            "id": schedule_data["group"].id,
            "name": schedule_data["group"].name,
            "english_name": schedule_data["group"].english_name
        }

        days_list = []
        for day_item in schedule_data["days"]:
            weekday = day_item["weekday"]
            class_list = []

            for class_session in day_item["classes"]:
                # Convert each class session to a dictionary for ScheduleClassItem
                class_dict = {
                    "id": class_session.id,
                    "subject": {
                        "id": class_session.subject.id,
                        "full_name": class_session.subject.full_name,
                        "short_name": class_session.subject.short_name,
                        "english_name": class_session.subject.english_name
                    },
                    "teacher": {
                        "id": class_session.teacher.id,
                        "first_name": class_session.teacher.first_name,
                        "last_name": class_session.teacher.last_name,
                        "patronymic": class_session.teacher.patronymic,
                        "gender": class_session.teacher.gender.value if class_session.teacher.gender else None,
                        "full_name": class_session.teacher.full_name
                    },
                    "time_slot": {
                        "id": class_session.time_slot.id,
                        "name": class_session.time_slot.name,
                        "english_name": class_session.time_slot.english_name,
                        "start_time": class_session.time_slot.start_time.isoformat(),
                        "end_time": class_session.time_slot.end_time.isoformat()
                    },
                    "class_type": class_session.class_type.value,
                    "week_type": class_session.week_type.value,
                    "subgroup": class_session.subgroup,
                    "location": class_session.location
                }
                class_list.append(class_dict)

            days_list.append({
                "weekday": weekday.value,
                "classes": class_list
            })

        # Create and return the ScheduleResponse
        return ScheduleResponse(
            group=group_dict,
            days=days_list
        )
