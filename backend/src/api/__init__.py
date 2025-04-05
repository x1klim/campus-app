from fastapi import APIRouter
from .routes import schedule

api_router = APIRouter()

api_router.include_router(
    schedule.router, prefix="/schedule", tags=["schedule"])
