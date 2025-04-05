from typing import Optional
from pydantic import BaseModel, Field


class SubjectBase(BaseModel):
    """Base model for Subject data validation"""
    full_name: str = Field(..., description="Full name of the subject")
    short_name: Optional[str] = Field(
        None, description="Short name or abbreviation")
    english_name: Optional[str] = Field(
        None, description="English name of the subject")


class SubjectCreate(SubjectBase):
    """Model for validating Subject creation data"""
    pass


class SubjectUpdate(SubjectBase):
    """Model for validating Subject update data"""
    full_name: Optional[str] = Field(
        None, description="Full name of the subject")


class SubjectResponse(SubjectBase):
    """Model for Subject response data"""
    id: int = Field(..., description="Unique identifier")

    model_config = {
        "from_attributes": True
    }
