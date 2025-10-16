# 🔐 GitHub Secret Setup Guide

## Option 1: Add GH_PAT Secret (Recommended)

### Step 1: Create Personal Access Token
1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name: `MITL Timesheet Release Token`
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### Step 2: Add Secret to Repository
1. Go to [https://github.com/ahmedrdwn/mitl-timesheet](https://github.com/ahmedrdwn/mitl-timesheet)
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `GH_PAT`
6. Value: Paste your personal access token
7. Click "Add secret"

## Option 2: Disable Release Creation (Alternative)

If you don't want to create a personal access token, you can disable the release creation step. The APK will still be available as an artifact.

### To disable releases:
1. The APK will be available in the "Artifacts" section of the Actions tab
2. You can download it directly from there
3. No GitHub release will be created

## 🎯 What Happens After Setup:

- **With GH_PAT**: APK will be available in both "Artifacts" and "Releases" tabs
- **Without GH_PAT**: APK will be available only in "Artifacts" tab

Both options will give you access to your APK file!
