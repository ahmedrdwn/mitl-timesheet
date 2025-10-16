# 🚀 Building APK for MITL Timesheet Android App

## Prerequisites

Before building the APK, ensure you have:

1. **Node.js** (v16 or higher)
2. **Java Development Kit (JDK 11 or higher)**
3. **Android Studio** with Android SDK
4. **React Native CLI**: `npm install -g react-native-cli`

## Quick Build Commands

### For Windows:
```bash
# Method 1: Using npm script
npm run build-apk-windows

# Method 2: Using batch file
build-apk.bat
```

### For macOS/Linux:
```bash
# Method 1: Using npm script
npm run build-apk

# Method 2: Using shell script
chmod +x build-apk.sh
./build-apk.sh
```

## Step-by-Step Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Clean Previous Builds
```bash
cd android
./gradlew clean  # On Windows: gradlew clean
cd ..
```

### 3. Build Release APK
```bash
cd android
./gradlew assembleRelease  # On Windows: gradlew assembleRelease
cd ..
```

### 4. Locate Your APK
The APK will be created at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## APK Installation

### On Android Device:
1. Enable "Unknown Sources" in Android Settings
2. Transfer APK to device via USB, email, or cloud storage
3. Open APK file on device to install

### Via ADB (Android Debug Bridge):
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

## Troubleshooting

### Common Issues:

1. **Gradle Build Fails**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease --stacktrace
   ```

2. **Java Version Issues**
   - Ensure JDK 11+ is installed
   - Set JAVA_HOME environment variable

3. **Android SDK Issues**
   - Open Android Studio
   - Install required SDK components
   - Set ANDROID_HOME environment variable

4. **Permission Issues**
   ```bash
   chmod +x android/gradlew  # On macOS/Linux
   ```

### Build Optimization:

1. **Reduce APK Size:**
   - Enable ProGuard in `android/app/build.gradle`
   - Remove unused dependencies

2. **Sign APK for Distribution:**
   - Create keystore file
   - Configure signing in `android/app/build.gradle`

## APK Information

- **App Name**: MITL Timesheet
- **Package**: com.mitltimesheet
- **Version**: 1.0.0
- **Target SDK**: 33
- **Min SDK**: 21

## Distribution

### Internal Distribution:
- Share APK directly via email/cloud storage
- Install on devices via ADB

### Google Play Store:
- Create signed APK with release keystore
- Follow Google Play Console requirements
- Upload AAB (Android App Bundle) format

## File Locations

```
📁 Project Root/
├── 📱 MITL_Timesheet_Android.apk (Final APK)
├── 📁 android/
│   └── 📁 app/build/outputs/apk/release/
│       └── 📱 app-release.apk (Original APK)
├── 🔧 build-apk.sh (Linux/macOS script)
├── 🔧 build-apk.bat (Windows script)
└── 📋 BUILD_INSTRUCTIONS.md (This file)
```

## Success Indicators

✅ **Build Successful When:**
- No error messages in terminal
- APK file created in release folder
- APK size is reasonable (10-50MB)
- APK can be installed on Android device

❌ **Build Failed When:**
- Gradle build errors
- Missing dependencies
- Java/Android SDK issues
- Permission problems

---

**Need Help?** Check the troubleshooting section or refer to the main README.md file.


