#!/bin/bash

# Script to set up git hooks

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOKS_DIR="$REPO_ROOT/.git/hooks"

echo "Setting up git hooks..."

# Create hooks directory if it doesn't exist
mkdir -p "$HOOKS_DIR"

# Create symbolic link for pre-commit hook
ln -sf "../../.github/hooks/pre-commit" "$HOOKS_DIR/pre-commit"

# Make the hook executable
chmod +x "$HOOKS_DIR/pre-commit"

echo "✅ Git hooks setup complete!"
echo "The pre-commit hook will now check for sensitive files before each commit." 