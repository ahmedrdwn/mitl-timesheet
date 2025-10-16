#!/bin/bash

# MITL Timesheet Android APK Build Script
echo "🚀 Building MITL Timesheet APK..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
cd android
./gradlew clean
cd ..

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build release APK
echo "🔨 Building release APK..."
cd android
./gradlew assembleRelease
cd ..

# Check if APK was created
APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    echo "✅ APK built successfully!"
    echo "📱 APK location: $APK_PATH"
    echo "📏 APK size: $(du -h "$APK_PATH" | cut -f1)"
    
    # Copy APK to project root for easy access
    cp "$APK_PATH" "./MITL_Timesheet_Android.apk"
    echo "📋 APK copied to: ./MITL_Timesheet_Android.apk"
else
    echo "❌ APK build failed!"
    exit 1
fi

echo "🎉 Build complete! You can now install the APK on Android devices."


