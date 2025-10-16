# Configure Flutter to use OpenJDK 25

Write-Host "🚀 Configuring Flutter to use OpenJDK 25..." -ForegroundColor Green

# Find Java installation
Write-Host "📍 Finding Java installation..." -ForegroundColor Yellow
try {
    $javaPath = Get-Command java -ErrorAction Stop | Select-Object -ExpandProperty Source
    Write-Host "Found Java at: $javaPath" -ForegroundColor Cyan
    
    # Extract JDK directory from java.exe path
    $jdkDir = Split-Path $javaPath -Parent
    Write-Host "📁 JDK Directory: $jdkDir" -ForegroundColor Cyan
    
    # Configure Flutter to use this JDK
    Write-Host "🔧 Configuring Flutter..." -ForegroundColor Yellow
    & "C:\Users\ahmed\develop\flutter\bin\flutter.bat" config --jdk-dir "$jdkDir"
    
    # Verify configuration
    Write-Host "✅ Verifying configuration..." -ForegroundColor Yellow
    & "C:\Users\ahmed\develop\flutter\bin\flutter.bat" doctor
    
    Write-Host ""
    Write-Host "✅ JDK configuration complete!" -ForegroundColor Green
    Write-Host "🎯 Now try building the APK again." -ForegroundColor Cyan
    Write-Host ""
    
} catch {
    Write-Host "❌ Java not found in PATH" -ForegroundColor Red
    Write-Host "Please add Java to your PATH or specify the full path" -ForegroundColor Yellow
}

Read-Host "Press Enter to continue"

