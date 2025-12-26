# Icon Update Workflow

This document describes how to update icons using the Icon Editor web interface.

## Overview

The Icon Editor allows you to upload custom icons to replace the placeholder images used throughout the application. Changes are packaged into a downloadable JSON file that can be processed to create a Pull Request.

## Web Interface Workflow

### 1. Access the Icon Editor

1. Open the application in your browser
2. Click the hamburger menu (☰) in the top right
3. Navigate to **Settings** → **Icon Editor**

### 2. Select Icons to Update

1. Choose a category (classes, subclasses, aspects, fragments, etc.)
2. Click **Upload** next to any icon you want to replace
3. Select a new image file from your computer
   - **Format**: PNG recommended (supports all image formats)
   - **Size**: Maximum 2MB per file
   - **Dimensions**: Recommended 256x256px or 512x512px for best quality

### 3. Review Your Changes

- Icons with pending changes are highlighted with an orange border
- You can see a preview of both the current and new icon
- Click **Remove** to discard a pending change
- Click **Clear All** to remove all pending changes

### 4. Save Changes

1. Click the **Save Changes** button at the bottom of the page
2. A JSON file will be downloaded to your computer: `icon-changes-<timestamp>.json`
3. The file contains all your icon changes and metadata

## Processing Icon Changes

### Option 1: Automated Script (Recommended)

Run the provided Node.js script to automatically process the changes:

```bash
node scripts/update-icons.js icon-changes-1234567890.json
```

The script will:
1. Create a new branch: `icon-update-<timestamp>`
2. Replace the icon files in `public/icons/{category}/`
3. Create a commit with a detailed message
4. Push the branch to GitHub
5. Display instructions for creating a Pull Request

### Option 2: Manual Processing

If you prefer to handle the changes manually:

1. Extract the icon files from the JSON
2. Place them in the appropriate `public/icons/{category}/` folders
3. Ensure filenames match exactly: `{IconName}.png`
4. Create a commit and push to a new branch
5. Create a Pull Request

---

**Last Updated**: December 2025  
**Version**: 1.0.0
