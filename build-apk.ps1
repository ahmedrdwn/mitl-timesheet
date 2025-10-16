# MITL Timesheet Flutter APK Build Script - PowerShell Version

Write-Host "🚀 Building MITL Timesheet Flutter APK..." -ForegroundColor Green

# Set environment variables
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "C:\Users\ahmed\AppData\Local\Android\sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# Navigate to Flutter project
Set-Location "mitl_timesheet_flutter"

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
& "C:\Users\ahmed\develop\flutter\bin\flutter.bat" clean

# Get dependencies
Write-Host "📦 Getting dependencies..." -ForegroundColor Yellow
& "C:\Users\ahmed\develop\flutter\bin\flutter.bat" pub get

# Build release APK
Write-Host "🔨 Building release APK..." -ForegroundColor Yellow
& "C:\Users\ahmed\develop\flutter\bin\flutter.bat" build apk --release

# Check if APK was created
$APK_PATH = "build\app\outputs\flutter-apk\app-release.apk"
if (Test-Path $APK_PATH) {
    Write-Host "✅ APK built successfully!" -ForegroundColor Green
    Write-Host "📱 APK location: $APK_PATH" -ForegroundColor Cyan
    
    # Copy APK to project root for easy access
    Copy-Item $APK_PATH "MITL_Timesheet_Flutter.apk"
    Write-Host "📋 APK copied to: MITL_Timesheet_Flutter.apk" -ForegroundColor Cyan
    Write-Host "🎉 Build complete! You can now install the APK on Android devices." -ForegroundColor Green
} else {
    Write-Host "❌ APK build failed!" -ForegroundColor Red
    exit 1
}

Read-Host "Press Enter to continue"
