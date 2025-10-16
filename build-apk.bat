@echo off
REM MITL Timesheet Android APK Build Script for Windows

echo 🚀 Building MITL Timesheet APK...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
cd android
gradlew clean
cd ..

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build release APK
echo 🔨 Building release APK...
cd android
gradlew assembleRelease
cd ..

REM Check if APK was created
set APK_PATH=android\app\build\outputs\apk\release\app-release.apk
if exist "%APK_PATH%" (
    echo ✅ APK built successfully!
    echo 📱 APK location: %APK_PATH%
    
    REM Copy APK to project root for easy access
    copy "%APK_PATH%" "MITL_Timesheet_Android.apk"
    echo 📋 APK copied to: MITL_Timesheet_Android.apk
    echo 🎉 Build complete! You can now install the APK on Android devices.
) else (
    echo ❌ APK build failed!
    exit /b 1
)

pause


