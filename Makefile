.PHONY: build test run

build:
	@echo "Building C++ extensions..."
	# Command to build C++ extensions would go here

test:
	@echo "Running tests..."
	pytest tests/

run:
	@echo "Starting API..."
	uvicorn src.api_gateway.routes:app --reload
