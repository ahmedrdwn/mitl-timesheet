@echo off
REM GitHub Actions Setup Script for MITL Timesheet

echo 🚀 Setting up GitHub Actions for APK build...

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing git repository...
    git init
)

REM Add all files
echo 📁 Adding files to git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Add Flutter project with GitHub Actions workflow for APK build"

echo.
echo ✅ Git repository ready!
echo.
echo 📋 Next steps:
echo 1. Create a new repository on GitHub (https://github.com/new)
echo 2. Copy the repository URL
echo 3. Run these commands:
echo    git remote add origin YOUR_GITHUB_REPO_URL
echo    git push -u origin main
echo.
echo 🎯 After pushing, your APK will be built automatically!
echo 📱 Check the Actions tab in your GitHub repository for the build status.
echo.

pause
