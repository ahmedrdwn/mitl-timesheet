# 🚀 Quick APK Build Guide

## Current Issue
❌ **Node.js and npm are not installed** on your system.

## Immediate Solutions

### Option 1: Install Node.js (Recommended)
1. **Download Node.js** from [nodejs.org](https://nodejs.org/)
2. **Install LTS version** (Long Term Support)
3. **Restart your computer**
4. **Run build command**:
   ```bash
   npm run build-apk-windows
   ```

### Option 2: Use Android Studio Directly
1. **Open Android Studio**
2. **File → Open** → Navigate to `android` folder
3. **Build → Generate Signed Bundle/APK**
4. **Choose APK** → Create new keystore
5. **Build** → APK will be created

### Option 3: Manual Gradle Build
```bash
# Navigate to android folder
cd android

# Clean previous builds
gradlew clean

# Build release APK
gradlew assembleRelease

# APK location: app/build/outputs/apk/release/app-release.apk
```

## What You Need to Install

### Essential Software:
1. **Node.js** (for npm and React Native)
2. **Android Studio** (for Android SDK)
3. **Java JDK 11+** (for Gradle builds)

### Installation Order:
1. Install **Node.js** first
2. Install **Android Studio**
3. Install **Java JDK**
4. Set environment variables
5. Run build commands

## After Installation

### Verify Setup:
```bash
node --version    # Should show v16+
npm --version     # Should show v8+
java -version     # Should show Java 11+
```

### Build APK:
```bash
# Install dependencies
npm install

# Build APK
npm run build-apk-windows
```

## APK Location
After successful build:
- **Main APK**: `android/app/build/outputs/apk/release/app-release.apk`
- **Copy**: `MITL_Timesheet_Android.apk` (in project root)

## Quick Fix
**Most common solution**: Install Node.js from nodejs.org, restart computer, then run:
```bash
npm run build-apk-windows
```

---
**Need the APK now?** Use Android Studio method (Option 2) - no Node.js required!


