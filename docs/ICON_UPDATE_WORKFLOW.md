# Icon Update Workflow

This document describes how to update icons using the Icon Editor web interface with automated PR creation.

## Overview

The Icon Editor allows you to upload custom icons to replace the placeholder images used throughout the application. Changes are automatically processed by GitHub Actions to create a Pull Request.

## Automated Workflow (Recommended)

### Setup (One-time)

1. **Create a GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens/new
   - Token name: `D2-Guardian-Forge-Icon-Editor`
   - Expiration: Choose your preferred duration
   - Scope: Check `repo` (Full control of private repositories)
   - Click "Generate token"
   - Copy the token (you won't see it again!)

2. **Configure the Token in Browser**
   - Open the Icon Editor page
   - Open browser console (F12)
   - Run: `localStorage.setItem('github_token', 'your-token-here')`
   - Replace `'your-token-here'` with your actual token

### Using the Automated Workflow

1. **Access the Icon Editor**
   - Open the application
   - Navigate to Settings → Icon Editor

2. **Select Icons to Update**
   - Choose a category (classes, subclasses, aspects, fragments, etc.)
   - Click "Upload" next to any icon
   - Select a new image file (PNG recommended, max 2MB)

3. **Review Your Changes**
   - Icons with pending changes are highlighted with a primary color border
   - Preview shows current and new icon side-by-side
   - Click "Remove" to discard a change
   - Click "Clear All" to remove all pending changes

4. **Save Changes**
   - Click "Save Changes" button
   - GitHub Actions will automatically:
     - Create a new branch: `icon-update-<timestamp>`
     - Replace the icon files in `public/icons/{category}/`
     - Create a commit with detailed message
     - Push the branch to GitHub
     - Open a Pull Request with summary

5. **Review and Merge**
   - Go to: https://github.com/partybrasil/D2-Guardian-Forge/pulls
   - Find your PR (will be the most recent)
   - Review the changes
   - Approve and merge!

## Fallback: Manual Processing

If you don't configure a GitHub token, the system will download a JSON file instead.

### Option 1: Automated Script

Run the provided Node.js script to process the changes:

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

1. Extract the icon files from the JSON
2. Place them in the appropriate `public/icons/{category}/` folders
3. Ensure filenames match exactly: `{IconName}.png`
4. Create a commit and push to a new branch
5. Create a Pull Request

## GitHub API Integration

The automated PR creation uses GitHub's Content API directly (no GitHub Actions required):

1. **Triggered by**: Icon Editor "Save Changes" button with valid GitHub token
2. **Process**:
   - Creates a new branch: `icon-update-<timestamp>`
   - Uploads icon files directly to the branch using GitHub Contents API
   - Creates a Pull Request with summary of changes
3. **Benefits**:
   - No payload size limitations (handles any number of icons)
   - Faster processing (no workflow queue delays)
   - Immediate feedback with PR URL
   - Works without any GitHub Actions configuration

## Security Notes

- GitHub Personal Access Token is stored in browser's localStorage
- Token is only sent to GitHub API (api.github.com)
- Never share your token or commit it to the repository
- Revoke token if compromised: https://github.com/settings/tokens
- Token is optional - fallback methods work without it

## Troubleshooting

### Token Not Working

- Verify token has `repo` scope
- Check token isn't expired
- Ensure token is a **Classic** Personal Access Token (not fine-grained)
- Clear localStorage and re-add token: `localStorage.removeItem('github_token')`
- Check browser console for detailed error messages

### API Errors

If the automated PR creation fails:
- **401 Error**: Token is invalid or expired - create a new token
- **403 Error**: Token lacks required `repo` scope permissions - recreate token with correct scope
- **404 Error**: Token doesn't have access to the repository - verify token permissions
- **422 Error**: Invalid request data (rare, should not occur with the current implementation)
- **Network Error**: Check internet connection or GitHub API availability

The system will automatically fall back to downloading a JSON file for manual processing.

### Icons Not Updating

- Clear browser cache after changes are merged
- Check that filenames match exactly (case-sensitive)
- Verify file paths in the workflow logs

### Workflow Fails

If the automated process fails:
- Check the error message displayed in the Icon Editor UI
- Review browser console for detailed error information
- Verify your GitHub token has the correct `repo` scope
- Ensure you have write access to the repository
- Use the downloaded JSON file as a fallback with the manual script

---

**Last Updated**: December 2025  
**Version**: 3.0.0 (Direct GitHub API Integration)
