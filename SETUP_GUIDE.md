# 🛠️ Complete Setup Guide for MITL Timesheet Android App

## Prerequisites Installation

### 1. Install Node.js
1. **Download Node.js** from [nodejs.org](https://nodejs.org/)
2. **Choose LTS version** (recommended for stability)
3. **Install with default settings**
4. **Restart your computer** after installation

### 2. Install Android Studio
1. **Download Android Studio** from [developer.android.com](https://developer.android.com/studio)
2. **Install with default settings**
3. **Open Android Studio** and follow setup wizard
4. **Install Android SDK** (API level 21+)
5. **Set up Android emulator** (optional but recommended)

### 3. Install Java Development Kit (JDK)
1. **Download JDK 11+** from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
2. **Install with default settings**
3. **Set JAVA_HOME environment variable**

## Environment Variables Setup

### Windows:
1. **Open System Properties** → Advanced → Environment Variables
2. **Add these variables:**
   ```
   JAVA_HOME = C:\Program Files\Java\jdk-11.0.x
   ANDROID_HOME = C:\Users\[YourName]\AppData\Local\Android\Sdk
   PATH = %JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
   ```

### Verify Installation:
```bash
node --version
npm --version
java -version
adb version
```

## Alternative Build Methods

### Method 1: Using Android Studio (Recommended)
1. **Open Android Studio**
2. **Open Project** → Navigate to your `android` folder
3. **Build** → Generate Signed Bundle/APK
4. **Choose APK** → Next
5. **Create new keystore** or use existing
6. **Build** the APK

### Method 2: Using Gradle Directly
```bash
# Navigate to android folder
cd android

# Clean and build
gradlew clean
gradlew assembleRelease

# APK will be at:
# android/app/build/outputs/apk/release/app-release.apk
```

### Method 3: Online Build Services
- **Expo EAS Build** (if using Expo)
- **GitHub Actions** with Android build
- **Bitrise** or **AppCenter** for CI/CD

## Quick Start (After Prerequisites)

### 1. Install Dependencies
```bash
npm install
```

### 2. Install React Native CLI
```bash
npm install -g react-native-cli
```

### 3. Build APK
```bash
# Windows
npm run build-apk-windows

# macOS/Linux
npm run build-apk
```

## Troubleshooting

### Common Issues:

1. **"npm not recognized"**
   - Install Node.js from nodejs.org
   - Restart computer after installation

2. **"gradlew not found"**
   - Navigate to android folder first
   - Use `gradlew.bat` on Windows

3. **"Android SDK not found"**
   - Install Android Studio
   - Set ANDROID_HOME environment variable

4. **"Java not found"**
   - Install JDK 11+
   - Set JAVA_HOME environment variable

### Build Commands Reference:
```bash
# Check versions
node --version
npm --version
java -version

# Install dependencies
npm install

# Clean build
cd android
gradlew clean
gradlew assembleRelease

# Find APK
# Location: android/app/build/outputs/apk/release/app-release.apk
```

## APK Distribution

### After Successful Build:
1. **APK Location**: `android/app/build/outputs/apk/release/app-release.apk`
2. **Copy to device** via USB, email, or cloud storage
3. **Enable "Unknown Sources"** in Android Settings
4. **Install APK** by tapping the file

### For Distribution:
- **Sign APK** with release keystore
- **Upload to Google Play Store** (requires developer account)
- **Share via direct download** (current method)

## Next Steps

1. **Install Node.js** (if not already installed)
2. **Install Android Studio** (if not already installed)
3. **Follow the build process** above
4. **Test APK** on Android device

---

**Need Help?** The most common issue is missing Node.js - install it first and restart your computer.


