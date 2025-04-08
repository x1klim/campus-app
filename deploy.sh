#!/bin/bash
set -e

# Ensure we're in the project root
cd "$(dirname "$0")"

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    echo "Error: .env.prod file not found!"
    echo "Please create .env.prod file"
    exit 1
fi

# Check if SSL certificates exist
if [ ! -d "nginx/ssl" ]; then
    echo "SSL certificates not found. Setting up directory..."
    mkdir -p nginx/ssl
    echo "Please place your SSL certificates in the nginx/ssl directory"
    echo "You will need fullchain.pem and privkey.pem files"
    exit 1
fi

# Check domain name
DOMAIN_NAME=$(grep DOMAIN_NAME .env.prod | cut -d '=' -f2)
if [ "$DOMAIN_NAME" = "your-domain.com" ]; then
    echo "Please update the DOMAIN_NAME in .env.prod"
    exit 1
fi

# Update Nginx configuration with the correct domain
sed -i "s/your-domain.com/$DOMAIN_NAME/g" nginx/nginx.conf

# Load environment variables
export $(grep -v '^#' .env.prod | xargs)

# Pull latest changes if in git repository
if [ -d ".git" ]; then
    echo "Pulling latest changes..."
    git pull
fi

# Build and start the services
echo "Starting deployment..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

echo "Deployment completed successfully!"
echo "Кампус should be available at https://$DOMAIN_NAME" 