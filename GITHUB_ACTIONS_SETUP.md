# 🚀 GitHub Actions APK Build Setup

This guide will help you set up automated APK building using GitHub Actions, bypassing local Java/Gradle issues.

## 📋 Prerequisites

1. **GitHub Account** - Free account works fine
2. **Git Repository** - Your project should be on GitHub
3. **Flutter Project** - Located in `mitl_timesheet_flutter/` directory

## 🛠️ Setup Steps

### Step 1: Push to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Add Flutter project with GitHub Actions workflow"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Verify Workflow File
The workflow file `.github/workflows/build-apk.yml` has been created with:
- ✅ Flutter 3.35.6 setup
- ✅ Java 17 (compatible with Gradle)
- ✅ Android SDK setup
- ✅ APK build and artifact upload
- ✅ Automatic release creation

### Step 3: Trigger Build
The workflow will automatically run when you:
- Push to `main` or `master` branch
- Create a pull request
- Manually trigger from GitHub Actions tab

## 📱 Getting Your APK

### Method 1: Download from Actions
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Click on the latest workflow run
4. Download the APK from "Artifacts" section

### Method 2: Download from Releases
1. Go to your GitHub repository
2. Click on "Releases" tab
3. Download the latest APK release

## 🔧 Workflow Features

### Automatic Builds
- **On Push**: Builds APK when you push to main branch
- **On PR**: Builds APK when you create pull requests
- **Manual**: You can manually trigger builds from GitHub Actions tab

### Artifacts
- APK is automatically uploaded as a build artifact
- APK is attached to releases for easy download
- Build logs are available for debugging

### Environment
- **Ubuntu Latest**: Clean, consistent build environment
- **Flutter 3.35.6**: Latest stable Flutter version
- **Java 17**: Compatible with all Gradle versions
- **Android SDK**: Automatically configured

## 🚨 Troubleshooting

### Build Fails
1. Check the Actions tab for error logs
2. Common issues:
   - Missing dependencies in `pubspec.yaml`
   - Flutter version compatibility
   - Android SDK configuration

### No APK Generated
1. Verify the workflow file is in `.github/workflows/`
2. Check that the Flutter project is in `mitl_timesheet_flutter/`
3. Ensure all dependencies are properly specified

### Manual Trigger
1. Go to Actions tab in your GitHub repository
2. Click on "Build Flutter APK" workflow
3. Click "Run workflow" button
4. Select branch and click "Run workflow"

## 📋 Workflow Configuration

The workflow includes:
- **Flutter Setup**: Latest stable Flutter version
- **Java Setup**: Java 17 for Gradle compatibility
- **Android SDK**: Automatic license acceptance
- **Dependencies**: Automatic `flutter pub get`
- **Build**: Release APK generation
- **Artifacts**: APK upload and release creation

## 🎯 Success Indicators

✅ **Build Successful When:**
- Green checkmark in Actions tab
- APK artifact available for download
- Release created with APK attached

❌ **Build Failed When:**
- Red X in Actions tab
- Error logs in Actions output
- No APK artifact generated

## 🔄 Next Steps

1. **Push to GitHub**: Upload your project to GitHub
2. **Check Actions**: Monitor the build process
3. **Download APK**: Get your APK from artifacts or releases
4. **Install**: Install APK on Android devices

---

**Need Help?** Check the GitHub Actions documentation or the workflow logs for detailed error information.
