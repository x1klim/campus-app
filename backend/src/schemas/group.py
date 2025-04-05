from typing import Optional
from pydantic import BaseModel, Field


class GroupBase(BaseModel):
    """Base model for Group data validation"""
    name: str = Field(..., description="Name of the student group")
    english_name: str = Field(...,
                              description="English name of the student group")


class GroupCreate(GroupBase):
    """Model for validating Group creation data"""
    pass


class GroupUpdate(GroupBase):
    """Model for validating Group update data"""
    name: Optional[str] = Field(None, description="Name of the student group")
    english_name: Optional[str] = Field(
        None, description="English name of the student group")


class GroupResponse(GroupBase):
    """Model for Group response data"""
    id: int = Field(..., description="Unique identifier")

    class Config:
        orm_mode = True
