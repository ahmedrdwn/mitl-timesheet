# 🚀 GitHub Repository Setup Guide

## Prerequisites Installation

### 1. Install Git
1. **Download Git** from [git-scm.com](https://git-scm.com/download/win)
2. **Install with default settings**
3. **Restart your computer** after installation
4. **Verify installation**: Open new terminal and run `git --version`

### 2. Create GitHub Account
1. **Go to** [github.com](https://github.com)
2. **Sign up** for a free account
3. **Verify your email** address

## Repository Setup Process

### Step 1: Initialize Local Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MITL Timesheet Android App"
```

### Step 2: Create GitHub Repository
1. **Go to GitHub.com**
2. **Click "New repository"** (green button)
3. **Repository name**: `mitl-timesheet-android`
4. **Description**: `MITL Timesheet Android App for McMaster University`
5. **Make it Public** (or Private if preferred)
6. **Don't initialize** with README (we already have files)
7. **Click "Create repository"**

### Step 3: Connect Local to GitHub
```bash
# Add remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mitl-timesheet-android.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Complete Setup Commands

### After Installing Git:
```bash
# 1. Initialize repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: MITL Timesheet Android App

- Complete React Native Android app
- Timesheet tracking with Excel export
- Local data storage with AsyncStorage
- Professional UI with McMaster branding
- Ready for APK build and distribution"

# 4. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mitl-timesheet-android.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

## Repository Structure

Your GitHub repository will contain:

```
📁 mitl-timesheet-android/
├── 📱 App.tsx                    # Main app component
├── 📱 index.js                   # App entry point
├── 📱 app.json                   # App configuration
├── 📦 package.json               # Dependencies
├── 📁 src/
│   ├── 📁 screens/               # Screen components
│   ├── 📁 services/              # Data services
│   └── 📁 utils/                 # Utility functions
├── 📁 android/                   # Android configuration
├── 🔧 build-apk.sh              # Build scripts
├── 🔧 build-apk.bat             # Windows build script
├── 📋 README.md                 # Project documentation
├── 📋 BUILD_INSTRUCTIONS.md     # Build guide
├── 📋 SETUP_GUIDE.md            # Setup instructions
└── 📋 GITHUB_SETUP.md           # This file
```

## GitHub Repository Features

### Repository Settings:
- **Name**: `mitl-timesheet-android`
- **Description**: `MITL Timesheet Android App for McMaster University`
- **Visibility**: Public (recommended for open source)
- **Topics**: `react-native`, `android`, `timesheet`, `mcmaster`, `mitl`

### README.md Features:
- ✅ **Project description** and features
- ✅ **Installation instructions**
- ✅ **Build and deployment guide**
- ✅ **Screenshots** (add later)
- ✅ **Contributing guidelines**

## After GitHub Setup

### 1. Clone Repository (on other machines):
```bash
git clone https://github.com/YOUR_USERNAME/mitl-timesheet-android.git
cd mitl-timesheet-android
npm install
```

### 2. Make Changes and Push:
```bash
# Make your changes
git add .
git commit -m "Update: Description of changes"
git push origin main
```

### 3. Create Releases:
1. **Go to GitHub repository**
2. **Click "Releases"** → "Create a new release"
3. **Tag version**: `v1.0.0`
4. **Release title**: `MITL Timesheet Android v1.0.0`
5. **Upload APK** as release asset

## Repository Benefits

### For Development:
- ✅ **Version control** for all changes
- ✅ **Backup** of your code
- ✅ **Collaboration** with team members
- ✅ **Issue tracking** for bugs and features

### For Distribution:
- ✅ **Public repository** for easy access
- ✅ **Release downloads** for APK files
- ✅ **Documentation** for users
- ✅ **Professional presentation**

## Quick Start (After Git Installation)

```bash
# 1. Initialize and commit
git init
git add .
git commit -m "Initial commit: MITL Timesheet Android App"

# 2. Create GitHub repository (via web interface)
# 3. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/mitl-timesheet-android.git
git branch -M main
git push -u origin main
```

---

**Need Help?** Install Git first, then follow the step-by-step commands above.


