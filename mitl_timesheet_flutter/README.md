# 🚀 MITL Timesheet Flutter App

A Flutter version of the MITL Timesheet app for McMaster University students.

## 📱 Latest Build
- **Version**: 1.0.0+1
- **Last Updated**: $(date)
- **Status**: Ready for installation

## 📱 Features

- **Home Screen**: Overview with total hours, weekly summary, and recent entries
- **Add Entry**: Create new timesheet entries with time tracking
- **All Entries**: View and manage all timesheet entries
- **Settings**: Profile management and data export
- **Excel Export**: Generate and share Excel timesheets
- **Local Storage**: All data stored locally on device

## 🛠️ Prerequisites

Before building the APK, ensure you have:

1. **Flutter SDK** (3.0.0 or higher)
2. **Android Studio** with Android SDK
3. **Java Development Kit (JDK 11 or higher)**

## 🚀 Quick Build

### For Windows:
```bash
# Method 1: Using batch file
build-apk.bat

# Method 2: Manual commands
flutter clean
flutter pub get
flutter build apk --release
```

### For macOS/Linux:
```bash
# Manual commands
flutter clean
flutter pub get
flutter build apk --release
```

## 📦 Dependencies

- `shared_preferences`: Local data storage
- `path_provider`: File system access
- `excel`: Excel file generation
- `share_plus`: File sharing
- `intl`: Date formatting

## 🏗️ Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   ├── timesheet_entry.dart
│   └── app_data.dart
├── services/                  # Business logic
│   ├── storage_service.dart
│   └── excel_service.dart
├── screens/                   # UI screens
│   ├── home_screen.dart
│   ├── add_entry_screen.dart
│   ├── all_entries_screen.dart
│   └── settings_screen.dart
└── utils/                     # Utilities
    └── time_utils.dart
```

## 📱 APK Location

After successful build:
- **Main APK**: `build/app/outputs/flutter-apk/app-release.apk`
- **Copied**: `MITL_Timesheet_Flutter.apk` (in project root)

## 🔧 Installation

### On Android Device:
1. Enable "Unknown Sources" in Android Settings
2. Transfer APK to device via USB, email, or cloud storage
3. Open APK file on device to install

### Via ADB:
```bash
adb install MITL_Timesheet_Flutter.apk
```

## 🎨 UI Features

- **Material Design**: Modern, intuitive interface
- **Responsive Layout**: Works on all screen sizes
- **Dark/Light Theme**: System theme support
- **Smooth Animations**: Flutter's built-in animations

## 📊 Data Management

- **Local Storage**: All data stored on device
- **Export Options**: Excel file generation and sharing
- **Data Backup**: Export functionality for data backup
- **Profile Management**: Student name and ID storage

## 🚨 Troubleshooting

### Common Issues:

1. **Flutter Not Found**
   ```bash
   # Install Flutter from https://flutter.dev/docs/get-started/install
   # Add Flutter to PATH
   flutter doctor
   ```

2. **Build Fails**
   ```bash
   flutter clean
   flutter pub get
   flutter build apk --release
   ```

3. **Dependencies Issues**
   ```bash
   flutter pub get
   flutter pub upgrade
   ```

## 📋 App Information

- **App Name**: MITL Timesheet Flutter
- **Package**: com.mitltimesheet.flutter
- **Version**: 1.0.0
- **Target SDK**: 33
- **Min SDK**: 21

## 🎯 Success Indicators

✅ **Build Successful When:**
- No error messages in terminal
- APK file created in build folder
- APK size is reasonable (10-50MB)
- APK can be installed on Android device

❌ **Build Failed When:**
- Flutter not installed
- Missing dependencies
- Android SDK issues
- Permission problems

---

**Need Help?** Check Flutter documentation or run `flutter doctor` for setup issues.
