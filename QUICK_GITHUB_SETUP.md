# 🚀 Quick GitHub Setup for APK Build

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `mitl-timesheet` (or any name you prefer)
3. Make it **Public** (required for free GitHub Actions)
4. Click "Create repository"

## Step 2: Push Your Code
Run the setup script:
```bash
.\setup-github.bat
```

Then add your GitHub repository:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 3: Get Your APK
1. Go to your GitHub repository
2. Click "Actions" tab
3. Wait for the build to complete (green checkmark)
4. Download APK from "Artifacts" section

## 🎯 That's It!
Your APK will be built automatically in the cloud, bypassing all local Java/Gradle issues.

## 📱 APK Location
- **Artifacts**: Actions tab → Latest run → Artifacts section
- **Releases**: Releases tab → Latest release
- **File**: `mitl_timesheet_flutter/build/app/outputs/flutter-apk/app-release.apk`

## 🔄 Manual Build
If you want to trigger a build manually:
1. Go to Actions tab
2. Click "Build Flutter APK"
3. Click "Run workflow"
4. Click "Run workflow" button

## ✅ Success Indicators
- Green checkmark in Actions tab
- APK available for download
- No local Java/Gradle issues to worry about!