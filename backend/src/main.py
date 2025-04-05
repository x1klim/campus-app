from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from .api import api_router
from .core.config import settings
from .models.base import Base
from .db.session import engine

# Create database tables if they don't exist (for development)
if settings.DEBUG:
    # Import models to ensure they are registered with the metadata
    import src.models.subject
    import src.models.teacher
    import src.models.time_slot
    import src.models.group
    import src.models.class_session

    # Create tables
    Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)


# Basic health check route
@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(
        "src.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
