FROM python:3.11-slim AS base
WORKDIR /app
ENV PYTHONPATH=/app

# Install dependencies
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Development stage
FROM base AS development
ENV ENVIRONMENT=development
COPY . .
EXPOSE 8000

# Production stage
FROM base AS production
ENV ENVIRONMENT=production
COPY . .
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]