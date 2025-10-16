@echo off
REM Configure Flutter to use OpenJDK 25

echo 🚀 Configuring Flutter to use OpenJDK 25...

REM Find Java installation
echo 📍 Finding Java installation...
for /f "tokens=*" %%i in ('where java 2^>nul') do (
    echo Found Java at: %%i
    set JAVA_PATH=%%i
    goto :found
)

:found
if "%JAVA_PATH%"=="" (
    echo ❌ Java not found in PATH
    echo Please add Java to your PATH or specify the full path
    pause
    exit /b 1
)

REM Extract JDK directory from java.exe path
for %%i in ("%JAVA_PATH%") do set JDK_DIR=%%~dpi
echo 📁 JDK Directory: %JDK_DIR%

REM Configure Flutter to use this JDK
echo 🔧 Configuring Flutter...
C:\Users\ahmed\develop\flutter\bin\flutter.bat config --jdk-dir "%JDK_DIR%"

REM Verify configuration
echo ✅ Verifying configuration...
C:\Users\ahmed\develop\flutter\bin\flutter.bat doctor

echo.
echo ✅ JDK configuration complete!
echo 🎯 Now try building the APK again.
echo.

pause

