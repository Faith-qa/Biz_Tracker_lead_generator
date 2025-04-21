# Biz Tracker Backend

A FastAPI-based backend service for the Biz Tracker application, providing business tracking and lead generation capabilities.

## 🚀 Features

- FastAPI REST API
- PostgreSQL database
- Redis for caching and message queue
- Celery for background tasks
- Docker containerization
- Health checks for all services
- Environment-based configuration

## 🛠 Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL 15
- **Cache/Queue**: Redis 7
- **Task Queue**: Celery
- **Container**: Docker & Docker Compose
- **Python Version**: 3.11

## 📋 Prerequisites

- Docker
- Docker Compose
- Git

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/biz_tracker.git
   cd biz_tracker/backend
   ```

2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. Update the environment variables in `.env.docker` with your preferred values

4. Start the services:
   ```bash
   docker-compose up --build
   ```

The API will be available at `http://localhost:8000`

## 🏗 Architecture

The backend consists of four main services:

1. **Backend API Service**
   - FastAPI application
   - Handles HTTP requests
   - Exposed on port 8000

2. **PostgreSQL Database**
   - Version 15
   - Persistent data storage
   - Exposed on port 5432

3. **Redis Service**
   - Version 7
   - Used for caching and message queue
   - Exposed on port 6379

4. **Celery Worker**
   - Handles background tasks
   - Uses Redis as message broker

## 🔧 Configuration

Environment variables are managed through `.env.docker`:

```env
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
```

## 📚 API Documentation

Once the services are running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Testing

Run tests using pytest:
```bash
docker-compose exec backend pytest
```

## 📦 Development

To run the services in development mode:
```bash
docker-compose up --build
```

For hot-reload during development, the backend service is configured to automatically reload when code changes are detected.

## 🔍 Monitoring

- Health checks are configured for all services
- Check service status:
  ```bash
  docker-compose ps
  ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details. 