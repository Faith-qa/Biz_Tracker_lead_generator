#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up Biz Tracker Backend...${NC}"

# Check if .env.docker exists, if not create from example
if [ ! -f .env.docker ]; then
    echo -e "${YELLOW}Creating .env.docker from example...${NC}"
    if [ -f .env.docker.example ]; then
        cp .env.docker.example .env.docker
        echo -e "${GREEN}Created .env.docker. Please update the values in .env.docker${NC}"
    else
        echo -e "${YELLOW}Warning: .env.docker.example not found${NC}"
        # Create basic .env.docker
        cat > .env.docker << EOL
POSTGRES_USER=biz_tracker_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=biz_tracker_db
EOL
        echo -e "${GREEN}Created basic .env.docker. Please update the values${NC}"
    fi
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}Setup completed!${NC}"

# Ask if user wants to start the services
read -p "Do you want to start the Docker services now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Starting Docker services...${NC}"
    docker-compose up --build
else
    echo -e "${YELLOW}To start the services later, run:${NC}"
    echo "docker-compose up --build"
fi

echo -e "${GREEN}The API will be available at http://localhost:8000${NC}" 