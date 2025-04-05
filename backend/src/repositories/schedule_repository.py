from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session, joinedload

from ..models.class_session import ClassSession, Weekday
from ..models.group import Group
from .base import BaseRepository
from ..schemas.class_session import ClassSessionCreate, ClassSessionUpdate


class ScheduleRepository(BaseRepository[ClassSession, ClassSessionCreate, ClassSessionUpdate]):
    """Repository for schedule-related database operations"""

    def __init__(self, db: Session):
        super().__init__(ClassSession, db)

    def get_group_by_name(self, group_name: str) -> Optional[Group]:
        """Get a group by its name"""
        return self.db.query(Group).filter(Group.english_name == group_name).first()

    def get_schedule_by_group_id(self, group_id: int) -> List[ClassSession]:
        """Get the full schedule for a specific group"""
        return (
            self.db.query(ClassSession)
            .filter(ClassSession.group_id == group_id)
            .options(
                joinedload(ClassSession.subject),
                joinedload(ClassSession.teacher),
                joinedload(ClassSession.time_slot),
                joinedload(ClassSession.group)
            )
            .order_by(ClassSession.weekday, ClassSession.time_slot_id)
            .all()
        )

    def get_schedule_by_group_name(self, group_name: str) -> Dict[str, Any]:
        """Get the full schedule for a specific group by name"""
        group = self.get_group_by_name(group_name)
        if not group:
            return None

        class_sessions = self.get_schedule_by_group_id(group.id)

        # Organize classes by day of the week
        days = {}
        for session in class_sessions:
            weekday = session.weekday
            if weekday not in days:
                days[weekday] = []
            days[weekday].append(session)

        return {
            "group": group,
            "days": [
                {"weekday": weekday, "classes": classes}
                for weekday, classes in sorted(days.items(), key=lambda x: x[0].value)
            ]
        }
