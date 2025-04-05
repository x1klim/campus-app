from sqlalchemy import Column, String, Time
from .base import BaseModel


class TimeSlot(BaseModel):
    """Model representing time slots for university classes"""
    __tablename__ = "time_slots"

    name = Column(String(50), nullable=False)
    english_name = Column(String(50), nullable=True)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    def __repr__(self):
        return f"<TimeSlot(id={self.id}, name='{self.name}', time='{self.start_time}-{self.end_time}')>"
