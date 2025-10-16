# 🔧 Git Installation Guide for Windows

## Quick Installation Steps

### Method 1: Official Git Website (Recommended)

1. **Go to Official Git Website**
   - Visit: [git-scm.com](https://git-scm.com/download/win)
   - This is the official Git for Windows download page

2. **Download Git**
   - Click the **"Download for Windows"** button
   - The file will be named something like `Git-2.43.0-64-bit.exe`

3. **Run the Installer**
   - Double-click the downloaded `.exe` file
   - Click **"Yes"** when Windows asks for permission

4. **Installation Wizard**
   - **Welcome Screen**: Click **"Next"**
   - **Select Destination**: Keep default location, click **"Next"**
   - **Select Components**: Keep all default selections, click **"Next"**
   - **Select Start Menu Folder**: Keep default, click **"Next"**
   - **Choose Default Editor**: Select **"Use Notepad as Git's default editor"**, click **"Next"**
   - **Adjusting PATH**: Select **"Git from the command line and also from 3rd-party software"**, click **"Next"**
   - **HTTPS Transport Backend**: Select **"Use the OpenSSL library"**, click **"Next"**
   - **Line Ending Conversions**: Select **"Checkout Windows-style, commit Unix-style line endings"**, click **"Next"**
   - **Terminal Emulator**: Select **"Use MinTTY"**, click **"Next"**
   - **Extra Options**: Keep default selections, click **"Next"**
   - **Experimental Options**: Leave unchecked, click **"Install"**

5. **Complete Installation**
   - Wait for installation to complete
   - Click **"Finish"**

### Method 2: Using Chocolatey (If you have it)

```bash
# Open PowerShell as Administrator
choco install git
```

### Method 3: Using Winget (Windows 10/11)

```bash
# Open PowerShell or Command Prompt
winget install Git.Git
```

## Verify Installation

### After Installation:
1. **Restart your computer** (important!)
2. **Open Command Prompt or PowerShell**
3. **Run this command**:
   ```bash
   git --version
   ```
4. **You should see**: `git version 2.43.0.windows.1` (or similar)

## Configure Git (First Time Setup)

### Set Your Identity:
```bash
# Set your name (replace with your actual name)
git config --global user.name "Your Name"

# Set your email (replace with your actual email)
git config --global user.email "your.email@example.com"
```

### Verify Configuration:
```bash
git config --list
```

## After Git Installation

### You Can Now:
1. **Initialize your repository**:
   ```bash
   git init
   ```

2. **Add files to Git**:
   ```bash
   git add .
   ```

3. **Create commits**:
   ```bash
   git commit -m "Your commit message"
   ```

4. **Connect to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/mitl-timesheet-android.git
   ```

5. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

## Troubleshooting

### Common Issues:

1. **"Git not recognized" after installation**
   - **Solution**: Restart your computer
   - **Alternative**: Close and reopen Command Prompt/PowerShell

2. **Permission denied errors**
   - **Solution**: Run Command Prompt as Administrator
   - **Alternative**: Check Windows User Account Control settings

3. **Git installation fails**
   - **Solution**: Download from official site only
   - **Alternative**: Try running installer as Administrator

4. **Git commands not working**
   - **Solution**: Check PATH environment variable
   - **Alternative**: Reinstall Git with default settings

### Verify Git is Working:
```bash
# Check Git version
git --version

# Check Git configuration
git config --list

# Check Git help
git help
```

## Next Steps After Git Installation

### 1. Create GitHub Account:
- Go to [github.com](https://github.com)
- Sign up for free account
- Verify your email

### 2. Create Repository:
- Click "New repository"
- Name: `mitl-timesheet-android`
- Description: `MITL Timesheet Android App for McMaster University`
- Make it Public
- Don't initialize with README

### 3. Push Your Code:
```bash
# Initialize repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: MITL Timesheet Android App"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mitl-timesheet-android.git

# Push to GitHub
git push -u origin main
```

## Installation Time
- **Download**: 2-3 minutes
- **Installation**: 3-5 minutes
- **Configuration**: 1-2 minutes
- **Total**: ~10 minutes

---

**Need Help?** If you encounter any issues during installation, restart your computer and try again. Git installation is usually straightforward on Windows.

