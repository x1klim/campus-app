FROM python:3.11-slim AS base
WORKDIR /app
ENV PYTHONPATH=/app

# Install dependencies
RUN apt-get update && apt-get install -y curl postgresql-client && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Verify pydantic-settings is installed
RUN pip list | grep pydantic

# Create entrypoint script
COPY ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Development stage
FROM base AS development
ENV ENVIRONMENT=development
COPY . .
EXPOSE 8000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# Dev alias for development stage
FROM development AS dev

# Production stage
FROM base AS production
ENV ENVIRONMENT=production
COPY . .
EXPOSE 8000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]