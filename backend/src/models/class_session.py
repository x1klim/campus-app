from sqlalchemy import Column, Integer, String, Enum, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel


class ClassType(enum.Enum):
    LECTURE = "LEC"
    LABORATORY = "LAB"
    EXERCISE = "EXC"
    SEMINAR = "SEM"


class Weekday(enum.Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7


class WeekType(enum.Enum):
    WEEKLY = "weekly"  # Every week
    WEEK_A = "a"       # Only on A weeks
    WEEK_B = "b"       # Only on B weeks


class ClassSession(BaseModel):
    """Model representing scheduled university classes"""
    __tablename__ = "class_sessions"

    # Foreign keys
    subject_id = Column(Integer, ForeignKey(
        "subjects.id", ondelete="CASCADE"), nullable=False)
    teacher_id = Column(Integer, ForeignKey(
        "teachers.id", ondelete="CASCADE"), nullable=True)
    time_slot_id = Column(Integer, ForeignKey(
        "time_slots.id", ondelete="CASCADE"), nullable=False)
    group_id = Column(Integer, ForeignKey(
        "groups.id", ondelete="CASCADE"), nullable=False)

    # Class details
    class_type = Column(Enum(ClassType), nullable=False)
    weekday = Column(Enum(Weekday), nullable=False)
    week_type = Column(Enum(WeekType), nullable=False, default=WeekType.WEEKLY)
    subgroup = Column(Integer, nullable=True)
    location = Column(String(100), nullable=True)

    # Relationships
    subject = relationship("Subject", backref="classes")
    teacher = relationship("Teacher", backref="classes")
    time_slot = relationship("TimeSlot", backref="classes")
    group = relationship("Group", backref="classes")

    # Ensure subgroup is positive if provided
    __table_args__ = (
        CheckConstraint('subgroup IS NULL OR subgroup > 0',
                        name='check_positive_subgroup'),
    )

    def __repr__(self):
        return f"<ClassSession(id={self.id}, subject={self.subject_id}, group={self.group_id}, weekday={self.weekday}, week_type={self.week_type})>"
