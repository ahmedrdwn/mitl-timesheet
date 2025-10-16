# 🤝 Contributing to MITL Timesheet Android App

Thank you for your interest in contributing to the MITL Timesheet Android App!

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio
- Git

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mitl-timesheet-android.git
cd mitl-timesheet-android

# Install dependencies
npm install

# Run on Android
npm run android
```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Use functional components with hooks
- Maintain consistent naming conventions

### Project Structure
```
src/
├── screens/          # Screen components
├── services/         # Data services
└── utils/           # Utility functions
```

## 🐛 Reporting Issues

### Before Reporting
1. Check existing issues
2. Ensure you're using the latest version
3. Test on different Android versions

### Issue Template
```markdown
**Bug Description:**
[Clear description of the bug]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- Android Version: [e.g., Android 11]
- App Version: [e.g., 1.0.0]
- Device: [e.g., Samsung Galaxy S21]
```

## 🔧 Making Changes

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes

### Commit Messages
```
type: brief description

Detailed description of changes

Fixes #issue_number
```

### Types:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests

## 📋 Pull Request Process

### Before Submitting
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open Pull Request**

### PR Template
```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Android device
- [ ] Tested on emulator
- [ ] All existing tests pass

## Screenshots
[If applicable, add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🧪 Testing

### Manual Testing
- Test on different Android versions
- Test with various screen sizes
- Test offline functionality
- Test data persistence

### Test Cases
1. **Time Entry**: Add, edit, delete entries
2. **Data Export**: Excel generation and sharing
3. **Settings**: Profile management
4. **Navigation**: All screen transitions

## 📱 Building and Testing

### Development Build
```bash
npm run android
```

### Release Build
```bash
npm run build-apk
```

### Testing APK
1. Install on Android device
2. Test all functionality
3. Verify data persistence
4. Test export functionality

## 🎯 Feature Requests

### Before Requesting
1. Check existing issues
2. Consider if it fits the app's purpose
3. Think about implementation complexity

### Request Template
```markdown
**Feature Description:**
[Clear description of the feature]

**Use Case:**
[Why is this feature needed?]

**Proposed Solution:**
[How would you implement this?]

**Alternatives:**
[Other ways to achieve the same goal]
```

## 📚 Documentation

### Code Documentation
- Comment complex functions
- Use JSDoc for public APIs
- Update README for new features

### User Documentation
- Update README.md
- Add screenshots for new features
- Update build instructions

## 🏷️ Release Process

### Version Numbering
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number updated
- [ ] APK built and tested
- [ ] Release notes prepared

## 📞 Support

### Getting Help
- Check existing issues
- Read documentation
- Ask in discussions
- Contact maintainers

### Contact Information
- **Repository**: [GitHub Issues](https://github.com/YOUR_USERNAME/mitl-timesheet-android/issues)
- **Email**: [Your email]
- **McMaster MITL**: [Lab contact info]

## 📄 License

This project is developed for McMaster University's MITL lab. All contributions are subject to the project's license terms.

---

**Thank you for contributing to the MITL Timesheet Android App!** 🎉

