#!/usr/bin/env python3
"""
Script to create the initial migration for the database.
This should be run once to set up the migration files.
"""

import os
import sys
import subprocess
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def create_initial_migration() -> None:
    """Create the initial migration files."""
    try:
        logger.info("Creating initial Alembic migration...")

        # Get the absolute path to the backend directory
        backend_dir = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))

        # Add the backend directory to the Python path
        sys.path.insert(0, backend_dir)

        # Create versions directory if it doesn't exist
        os.makedirs(os.path.join(
            backend_dir, "src/alembic/versions"), exist_ok=True)

        # First make sure the models are properly registered
        # by importing them directly
        try:
            from src.models.base import Base
            import src.models.subject
            import src.models.teacher
            import src.models.time_slot
            import src.models.group
            import src.models.class_session

            logger.info(
                f"Models imported successfully. Metadata tables: {Base.metadata.tables.keys()}")
        except ImportError as e:
            logger.warning(f"Error importing models: {e}")

        # Run alembic revision command
        subprocess.run(
            [
                "alembic",
                "revision",
                "--autogenerate",
                "-m", "Initial migration - create all tables"
            ],
            check=True,
            cwd=backend_dir,
            env=dict(os.environ, PYTHONPATH=backend_dir)
        )

        logger.info("Initial migration created successfully!")
    except Exception as e:
        logger.error(f"Error creating initial migration: {e}")
        raise


if __name__ == "__main__":
    create_initial_migration()
