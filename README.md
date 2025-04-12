# BizTracker Lead Generator

A comprehensive lead generation and management system for service-based businesses.

## Project Structure

```
biz_Tracker_lead_generator/
├── backend/          # FastAPI backend
├── frontend/         # (Coming soon)
└── mobile/          # (Coming soon)
```

## GitFlow Workflow

We follow the GitFlow branching model for development:

### Main Branches
- `main` - Production-ready code
- `develop` - Latest development changes

### Supporting Branches
- `feature/*` - New features
- `release/*` - Release preparation
- `hotfix/*` - Urgent production fixes
- `bugfix/*` - Bug fixes for the develop branch

### Branch Naming Convention
- Features: `feature/feature-name`
- Bugs: `bugfix/bug-description`
- Hotfixes: `hotfix/issue-description`
- Releases: `release/version-number`

### Workflow Rules
1. Create feature branches from `develop`
2. Create release branches from `develop`
3. Create hotfix branches from `main`
4. Merge feature branches into `develop`
5. Merge release branches into both `main` and `develop`
6. Merge hotfix branches into both `main` and `develop`

### Commit Message Convention
```
type(scope): subject

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Example: `feat(auth): implement JWT authentication`

## Getting Started

### Prerequisites
- Python 3.8+
- PostgreSQL
- Redis

### Setup
1. Clone the repository
```bash
git clone [repository-url]
cd biz_Tracker_lead_generator
```

2. Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

4. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configurations
```

5. Initialize the database
```bash
# Coming soon
```

## Development Workflow

1. Create a new feature branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

2. Make your changes and commit
```bash
git add .
git commit -m "feat(scope): description"
```

3. Push your changes
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request to the `develop` branch

## License

[License Type] - See LICENSE file for details 