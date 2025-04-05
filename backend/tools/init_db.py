#!/usr/bin/env python3
"""
Database initialization script.
This script is used to initialize the database with the initial migration.
It should be run once when setting up a new environment.
"""

import os
import sys
import time
import logging
import subprocess
from src.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init_db() -> None:
    """Initialize database with migrations."""
    max_retries = 5
    retry_interval = 5  # seconds

    logger.info("Initializing database...")
    logger.info(f"Database URL: {settings.DATABASE_URL}")

    for i in range(max_retries):
        try:
            # Run alembic migrations
            logger.info("Running Alembic migrations...")
            subprocess.run(
                ["alembic", "upgrade", "head"],
                check=True,
                cwd=os.path.dirname(os.path.abspath(__file__))
            )
            logger.info("Database initialization completed successfully!")
            return
        except Exception as e:
            logger.error(f"Error initializing database: {e}")
            if i < max_retries - 1:
                logger.info(f"Retrying in {retry_interval} seconds...")
                time.sleep(retry_interval)
            else:
                logger.error(
                    "Max retries reached. Database initialization failed.")
                sys.exit(1)


if __name__ == "__main__":
    init_db()
