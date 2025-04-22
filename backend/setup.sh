#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up Biz Tracker Backend...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo -e "${RED}Docker daemon is not running. Please start Docker Desktop first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

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

# Load environment variables
if [ -f .env.docker ]; then
    echo -e "${GREEN}Loading environment variables...${NC}"
    export $(cat .env.docker | xargs)
else
    echo -e "${RED}Error: .env.docker file not found${NC}"
    exit 1
fi

# Check for existing containers
check_container() {
    local container_name=$1
    if docker ps -a --format '{{.Names}}' | grep -q "^${container_name}$"; then
        if docker ps --format '{{.Names}}' | grep -q "^${container_name}$"; then
            echo -e "${YELLOW}Container ${container_name} is already running.${NC}"
            return 0
        else
            echo -e "${YELLOW}Container ${container_name} exists but is not running.${NC}"
            return 1
        fi
    fi
    return 2
}

# Check all our containers
containers=("biz_tracker_backend" "biz_tracker_db" "biz_tracker_redis" "biz_tracker_celery")
running_containers=()
stopped_containers=()

for container in "${containers[@]}"; do
    check_container "$container"
    status=$?
    if [ $status -eq 0 ]; then
        running_containers+=("$container")
    elif [ $status -eq 1 ]; then
        stopped_containers+=("$container")
    fi
done

if [ ${#running_containers[@]} -gt 0 ]; then
    echo -e "${YELLOW}The following containers are already running:${NC}"
    printf '%s\n' "${running_containers[@]}"
    echo -e "${YELLOW}Would you like to stop them? (y/n)${NC}"
    read -p "" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}Stopping containers...${NC}"
        for container in "${running_containers[@]}"; do
            docker stop "$container"
        done
    else
        echo -e "${YELLOW}Please stop the running containers before proceeding.${NC}"
        exit 1
    fi
fi

if [ ${#stopped_containers[@]} -gt 0 ]; then
    echo -e "${YELLOW}The following containers exist but are not running:${NC}"
    printf '%s\n' "${stopped_containers[@]}"
    echo -e "${YELLOW}Would you like to remove them? (y/n)${NC}"
    read -p "" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${GREEN}Removing stopped containers...${NC}"
        for container in "${stopped_containers[@]}"; do
            docker rm "$container"
        done
    fi
fi

echo -e "${GREEN}Setup completed!${NC}"

# Ask if user wants to start the services
read -p "Do you want to start the Docker services now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Starting Docker services...${NC}"
    if ! docker-compose up --build; then
        echo -e "${RED}Failed to start Docker services. Please check the error messages above.${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}To start the services later, run:${NC}"
    echo "docker-compose up --build"
fi

echo -e "${GREEN}The API will be available at http://localhost:8000${NC}" 