@echo off
REM MITL Timesheet Flutter APK Build Script - Fixed Version

echo 🚀 Building MITL Timesheet Flutter APK with fixed environment...

REM Set environment variables
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set ANDROID_HOME=C:\Users\ahmed\AppData\Local\Android\sdk
set PATH=%JAVA_HOME%\bin;%PATH%

REM Navigate to Flutter project
cd mitl_timesheet_flutter

REM Clean previous builds
echo 🧹 Cleaning previous builds...
C:\Users\ahmed\develop\flutter\bin\flutter.bat clean

REM Get dependencies
echo 📦 Getting dependencies...
C:\Users\ahmed\develop\flutter\bin\flutter.bat pub get

REM Build release APK
echo 🔨 Building release APK...
C:\Users\ahmed\develop\flutter\bin\flutter.bat build apk --release

REM Check if APK was created
set APK_PATH=build\app\outputs\flutter-apk\app-release.apk
if exist "%APK_PATH%" (
    echo ✅ APK built successfully!
    echo 📱 APK location: %APK_PATH%
    
    REM Copy APK to project root for easy access
    copy "%APK_PATH%" "MITL_Timesheet_Flutter.apk"
    echo 📋 APK copied to: MITL_Timesheet_Flutter.apk
    echo 🎉 Build complete! You can now install the APK on Android devices.
) else (
    echo ❌ APK build failed!
    exit /b 1
)

pause
