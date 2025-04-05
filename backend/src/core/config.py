import os
from pydantic import validator, Field
from pydantic_settings import BaseSettings
from typing import List, Optional, Union


class Settings(BaseSettings):
    PROJECT_NAME: str = "Campus Schedule API"
    API_V1_STR: str = "/api/v1"

    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "dev")
    DEBUG: bool = ENVIRONMENT in ["dev", "development"]

    # Database
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT")

    # Constructed database URL
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
    )
    SQL_ECHO: bool = DEBUG

    # API
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8000"))

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://frontend:3000"
    ]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
