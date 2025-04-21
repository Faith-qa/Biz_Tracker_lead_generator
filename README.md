# BizTracker Lead Generator

A comprehensive lead generation and management system for service-based businesses.

## Project Structure

```
biz_Tracker_lead_generator/
├── .github/          # GitHub configurations and hooks
├── backend/          # FastAPI backend
├── frontend/         # Expo React native
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
1. Development Flow:
   - All development happens in feature branches
   - Feature branches are created from `develop`
   - Feature branches are merged back into `develop` via Pull Request
   - Code review is required before merging

2. Release Process:
   - Release branches are created from `develop`
   - Only bug fixes and release preparations in release branches
   - Release branches are merged into `main` AND `develop`
   - Tag the release in `main` with version number
   - Delete release branch after merging

3. Hotfix Process:
   - Hotfix branches are created from `main`
   - Only critical bug fixes in hotfix branches
   - Hotfix branches are merged into `main` AND `develop`
   - Tag the hotfix in `main` with updated version number
   - Delete hotfix branch after merging

4. Pull Request Requirements:
   - All code changes require a Pull Request
   - PRs must be reviewed by at least one team member
   - All tests must pass
   - No sensitive data in commits
   - Follow commit message convention

5. Version Tagging:
   - Releases: v1.0.0, v1.1.0, etc.
   - Hotfixes: v1.0.1, v1.1.1, etc.
   - Use semantic versioning (MAJOR.MINOR.PATCH)

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

2. Set up Git hooks (Important!)
```bash
# Create symbolic link to the pre-commit hook
ln -sf ../../.github/hooks/pre-commit .git/hooks/pre-commit
# Make the hook executable
chmod +x .git/hooks/pre-commit
```

3. Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

4. Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

5. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configurations
```

6. Initialize the database
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

## Security Practices

### Environment Variables
- Never commit `.env` or `.env.docker` files
- Use `.env.example` and `.env.docker.example` as templates
- Copy example files and fill in your own values:
  ```bash
  cp .env.example .env
  cp .env.docker.example .env.docker
  ```

### Pre-commit Hook
The repository includes a pre-commit hook that:
- Prevents committing sensitive files
- Checks for potential credentials in code
- Can be bypassed with `git commit --no-verify` if needed

### Sensitive Information
- Never commit API keys, passwords, or tokens
- Use environment variables for sensitive data
- Keep credentials in `.env` files (not tracked by git)
- Use secret management in production 