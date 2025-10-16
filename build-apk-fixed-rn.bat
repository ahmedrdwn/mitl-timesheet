@echo off
REM MITL Timesheet React Native APK Build Script - Fixed Version

echo 🚀 Building MITL Timesheet React Native APK...

REM Set environment variables
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set ANDROID_HOME=C:\Users\ahmed\AppData\Local\Android\sdk
set PATH=%JAVA_HOME%\bin;%PATH%

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
