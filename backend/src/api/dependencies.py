from typing import Generator
from fastapi import Depends
from sqlalchemy.orm import Session

from ..db.session import get_db
from ..services.schedule_service import ScheduleService


def get_schedule_service(db: Session = Depends(get_db)) -> ScheduleService:
    """Dependency for getting the ScheduleService instance"""
    return ScheduleService(db)
