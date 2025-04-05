from typing import Optional
from pydantic import BaseModel, Field
from datetime import time


class TimeSlotBase(BaseModel):
    """Base model for TimeSlot data validation"""
    name: str = Field(..., description="Name of the time slot")
    english_name: Optional[str] = Field(
        None, description="English name of the time slot")
    start_time: time = Field(..., description="Start time in 24h format")
    end_time: time = Field(..., description="End time in 24h format")


class TimeSlotCreate(TimeSlotBase):
    """Model for validating TimeSlot creation data"""
    pass


class TimeSlotUpdate(TimeSlotBase):
    """Model for validating TimeSlot update data"""
    name: Optional[str] = Field(None, description="Name of the time slot")
    start_time: Optional[time] = Field(
        None, description="Start time in 24h format")
    end_time: Optional[time] = Field(
        None, description="End time in 24h format")


class TimeSlotResponse(TimeSlotBase):
    """Model for TimeSlot response data"""
    id: int = Field(..., description="Unique identifier")

    class Config:
        orm_mode = True
