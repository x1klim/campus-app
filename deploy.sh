#!/bin/bash
set -e

# Ensure we're in the project root
cd "$(dirname "$0")"

# Parse command line arguments
RUN_MIGRATIONS=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --with-migrations) RUN_MIGRATIONS=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    echo "Error: .env.prod file not found!"
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env.prod | xargs)

# Create nginx directory if it doesn't exist
mkdir -p nginx

# Pull latest changes if in git repository
if [ -d ".git" ]; then
    echo "Pulling latest changes..."
    git pull
fi

# Check if SSL certificates exist
SSL_EXISTS=false
if [ -f "/etc/letsencrypt/live/appcampus.ru/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/appcampus.ru/privkey.pem" ]; then
    SSL_EXISTS=true
    echo "SSL certificates found. HTTPS will be enabled."
else
    echo "SSL certificates not found. Will run in HTTP mode only."
    echo "To enable HTTPS, run ./setup-ssl.sh after deployment."
fi

# Build and start the services
echo "Starting deployment..."
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# Run migrations if requested
if [ "$RUN_MIGRATIONS" = true ]; then
    echo "Running database migrations..."
    docker compose -f docker-compose.prod.yml exec -T backend python tools/manage_db.py upgrade --env prod
    echo "Database migrations completed!"
fi

echo "==================================================="
echo "Deployment completed!"
if [ "$SSL_EXISTS" = true ]; then
    echo "Your application should be available at:"
    echo "https://appcampus.ru"
else
    echo "Your application is available at:"
    echo "http://appcampus.ru"
    echo ""
    echo "To enable HTTPS, run: ./setup-ssl.sh"
fi
echo "===================================================" 