#!/bin/bash
set -e

echo "Installing dependencies..."
pip install -r /app/requirements.txt

# Function to wait for database
wait_for_db() {
    echo "Waiting for postgres database to be available..."
    
    # Try to connect to the database for 60 seconds
    for i in {1..30}; do
        if pg_isready -h postgres -p 5432 -U ${POSTGRES_USER} >/dev/null 2>&1; then
            echo "Database is ready!"
            return 0
        fi
        echo "Waiting for database to be ready... ${i}/30"
        sleep 2
    done
    
    echo "Failed to connect to database after 60 seconds"
    return 1
}

# Wait for database
wait_for_db

# Create the database tables directly with SQLAlchemy
echo "Creating database tables directly with SQLAlchemy..."
python -c "
from src.models.base import Base
from src.db.session import engine
import src.models.subject
import src.models.teacher
import src.models.time_slot
import src.models.group
import src.models.class_session

print('Creating tables...')
Base.metadata.create_all(bind=engine)
print('Tables created successfully!')
"

# Execute the main command
echo "Starting application..."
exec "$@" 