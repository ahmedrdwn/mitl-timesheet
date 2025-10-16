@echo off
REM MITL Timesheet Flutter APK Build Script for Windows

echo 🚀 Building MITL Timesheet Flutter APK...

REM Check if Flutter is installed
flutter --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Flutter is not installed or not in PATH
    echo Please install Flutter from https://flutter.dev/docs/get-started/install
    pause
    exit /b 1
)

REM Clean previous builds
echo 🧹 Cleaning previous builds...
flutter clean

REM Get dependencies
echo 📦 Getting dependencies...
flutter pub get

REM Build release APK
echo 🔨 Building release APK...
flutter build apk --release

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
