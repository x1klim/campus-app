from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any

from ...services.schedule_service import ScheduleService
from ...schemas.schedule import ScheduleResponse
from ..dependencies import get_schedule_service

router = APIRouter()


@router.get("/{group_name}", response_model=ScheduleResponse)
async def get_schedule(
    group_name: str,
    schedule_service: ScheduleService = Depends(get_schedule_service)
) -> Any:
    """
    Get the complete schedule for a specific group
    """
    return schedule_service.get_schedule_by_group_name(group_name)
