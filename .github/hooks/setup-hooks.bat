@echo off
SETLOCAL

echo Setting up git hooks...

:: Get the git root directory
FOR /F "tokens=*" %%g IN ('git rev-parse --show-toplevel') do (SET REPO_ROOT=%%g)

:: Create symbolic link for pre-commit hook
mklink "%REPO_ROOT%\.git\hooks\pre-commit" "..\..\..\.github\hooks\pre-commit"

echo ✅ Git hooks setup complete!
echo The pre-commit hook will now check for sensitive files before each commit.

ENDLOCAL 