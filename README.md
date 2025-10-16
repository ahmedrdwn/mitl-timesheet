# 📱 MITL Timesheet Android App

A React Native Android application for McMaster University's Manufacturing Innovation Technology Lab (MITL) student employees to track their work hours and generate timesheets.

[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)](https://reactnative.dev/)
[![Android](https://img.shields.io/badge/Android-API%2021%2B-green.svg)](https://developer.android.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![McMaster University](https://img.shields.io/badge/McMaster%20University-MITL-red.svg)](https://www.mcmaster.ca/)

## Features

- 📱 **Mobile-First Design**: Optimized for Android devices
- ⏰ **Time Tracking**: Easy time in/out entry with break calculations
- 📊 **Visual Statistics**: Weekly and total hour summaries
- 📄 **Excel Export**: Generate professional timesheets in Excel format
- 💾 **Local Storage**: Data persists on device using AsyncStorage
- 🔄 **Cloud Integration**: Easy sharing to Google Drive, OneDrive, Dropbox
- 🎨 **Modern UI**: Clean, intuitive interface with McMaster branding

## Prerequisites

Before running this app, make sure you have:

- Node.js (v16 or higher)
- React Native CLI
- Android Studio
- Android SDK
- Java Development Kit (JDK 11 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mitl-timesheet-android
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install React Native dependencies**
   ```bash
   npx react-native install
   ```

4. **For Android setup:**
   - Open Android Studio
   - Install Android SDK (API level 21 or higher)
   - Set up Android emulator or connect physical device

## Running the App

### Android

1. **Start Metro bundler**
   ```bash
   npm start
   ```

2. **Run on Android device/emulator**
   ```bash
   npm run android
   ```

### Development

- **Start development server**: `npm start`
- **Run on Android**: `npm run android`
- **Run on iOS**: `npm run ios`
- **Run tests**: `npm test`
- **Lint code**: `npm run lint`

## Building for Production

### Android APK

```bash
npm run build-android
```

The APK will be generated in `android/app/build/outputs/apk/release/`

## Project Structure

```
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── AddEntryScreen.tsx
│   │   ├── AllEntriesScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── services/          # Data services
│   │   ├── StorageService.ts
│   │   └── ExcelService.ts
│   └── utils/            # Utility functions
│       └── TimeUtils.ts
├── android/             # Android-specific files
├── App.tsx              # Main app component
├── index.js             # App entry point
└── package.json         # Dependencies and scripts
```

## Key Features Explained

### Time Tracking
- Simple time in/out entry with date picker
- Automatic break time calculation
- Task description for work details
- Real-time hours calculation

### Data Management
- Local storage using AsyncStorage
- Data persistence across app sessions
- Export to Excel with professional formatting
- Easy data backup and sharing

### User Interface
- Bottom tab navigation
- Material Design icons
- McMaster University branding
- Responsive design for various screen sizes

## Dependencies

### Core
- **React Native**: Mobile app framework
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data storage
- **Vector Icons**: Icon library

### File Handling
- **react-native-fs**: File system operations
- **react-native-share**: File sharing
- **xlsx**: Excel file generation

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **Permission issues**
   - Ensure Android permissions are properly configured
   - Check device storage permissions

### Development Tips

- Use React Native Debugger for debugging
- Enable hot reloading for faster development
- Test on both emulator and physical device
- Use Flipper for advanced debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is developed for McMaster University's MITL lab. All rights reserved.

## Support

For technical support or questions, please contact the MITL lab administration.

---

**McMaster University**  
**Manufacturing Innovation Technology Lab (MITL)**  
*Student Employee Timesheet Application*

