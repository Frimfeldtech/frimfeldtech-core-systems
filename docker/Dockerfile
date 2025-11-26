# Multi-stage build for optimized image
FROM python:3.11-slim as builder

# Install build dependencies for C++
RUN apt-get update && apt-get install -y build-essential cmake

WORKDIR /app
COPY . .

# Placeholder for compilation steps
# RUN pip install . 

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /app /app
RUN pip install fastapi uvicorn

CMD ["uvicorn", "src.api_gateway.routes:app", "--host", "0.0.0.0", "--port", "8000"]
