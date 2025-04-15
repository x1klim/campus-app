#!/usr/bin/env python3
"""
Script to manage database migrations for both local and production environments.
"""

import os
import sys
import subprocess
import argparse
import logging
from typing import Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def setup_environment(env_type: str) -> None:
    """Set up the environment variables based on the environment type."""
    backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Add the backend directory to the Python path
    sys.path.insert(0, backend_dir)

    # Load the appropriate .env file
    if env_type == "prod":
        env_file = os.path.join(backend_dir, "..", ".env.prod")
    else:
        env_file = os.path.join(backend_dir, "..", ".env")

    # Read and set environment variables
    if os.path.exists(env_file):
        logger.info(f"Loading environment from {env_file}")
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()
    else:
        logger.warning(f"Environment file {env_file} not found")


def run_alembic_command(command: list, env_type: str = "local") -> None:
    """Run an alembic command with the specified environment."""
    try:
        backend_dir = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))
        setup_environment(env_type)

        # Create versions directory if it doesn't exist
        os.makedirs(os.path.join(
            backend_dir, "src/alembic/versions"), exist_ok=True)

        # Run the alembic command
        subprocess.run(
            ["alembic"] + command,
            check=True,
            cwd=backend_dir,
            env=dict(os.environ, PYTHONPATH=backend_dir)
        )
    except subprocess.CalledProcessError as e:
        logger.error(f"Error running alembic command: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise


def main():
    parser = argparse.ArgumentParser(description="Manage database migrations")
    parser.add_argument(
        "command",
        choices=["init", "migrate", "upgrade",
                 "downgrade", "history", "current"],
        help="The command to execute"
    )
    parser.add_argument(
        "--env",
        choices=["local", "prod"],
        default="local",
        help="The environment to use (default: local)"
    )
    parser.add_argument(
        "--revision",
        help="Revision ID for upgrade/downgrade commands (optional)",
        default="head"
    )

    args = parser.parse_args()

    try:
        if args.command == "init":
            # Create initial migration
            run_alembic_command(
                ["revision", "--autogenerate", "-m", "Initial migration"], args.env)
        elif args.command == "migrate":
            # Create a new migration
            run_alembic_command(
                ["revision", "--autogenerate", "-m", "New migration"], args.env)
        elif args.command == "upgrade":
            # Upgrade to a specific revision or head
            run_alembic_command(
                ["upgrade", args.revision], args.env)
        elif args.command == "downgrade":
            # Downgrade to a specific revision
            run_alembic_command(
                ["downgrade", args.revision], args.env)
        elif args.command == "history":
            # Show migration history
            run_alembic_command(
                ["history"], args.env)
        elif args.command == "current":
            # Show current revision
            run_alembic_command(
                ["current"], args.env)

    except Exception as e:
        logger.error(f"Failed to execute command: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
