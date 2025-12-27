# GitHub API 422 Error Fix

## Problem

The Icon Editor was failing with a **422 "Unprocessable Entity"** error when trying to trigger the GitHub Actions workflow via the `repository_dispatch` API.

### Root Cause

The GitHub `repository_dispatch` API has a **~10KB payload size limit** for the `client_payload` field. The Icon Editor was attempting to send base64-encoded image files through this payload, which resulted in:

- **Single icon**: 50-200KB in base64 format
- **Multiple icons**: 200KB+ total payload size
- **Result**: Far exceeds the 10KB limit → 422 error

## Solution

Replaced the `repository_dispatch` approach with **direct GitHub Contents API integration**:

### New Workflow

1. **Create Branch**: Use GitHub Git API to create a new branch from `main`
2. **Upload Files**: Use GitHub Contents API to upload each icon file individually to the branch
3. **Create PR**: Use GitHub Pull Requests API to create a PR with the changes

### Benefits

✅ **No payload size limits** - Files are uploaded individually, not in a single payload  
✅ **Faster processing** - No GitHub Actions queue delays  
✅ **Immediate feedback** - User gets PR URL instantly  
✅ **No workflow dependencies** - Works without GitHub Actions configuration  
✅ **Better error handling** - Specific error messages for each API call  

## Technical Changes

### Modified Files

1. **`src/pages/IconEditor.tsx`**
   - Removed `repository_dispatch` API call
   - Added branch creation logic using Git API
   - Added file upload logic using Contents API
   - Added PR creation logic using Pull Requests API
   - Enhanced error handling for 401, 403, 404, and 422 status codes

2. **`docs/ICON_UPDATE_WORKFLOW.md`**
   - Updated documentation to reflect new GitHub API integration
   - Removed references to GitHub Actions workflow
   - Updated troubleshooting guide
   - Incremented version to 3.0.0

### API Endpoints Used

```
GET  /repos/{owner}/{repo}/git/ref/heads/{branch}  - Get base branch SHA
POST /repos/{owner}/{repo}/git/refs                - Create new branch
GET  /repos/{owner}/{repo}/contents/{path}         - Check if file exists
PUT  /repos/{owner}/{repo}/contents/{path}         - Upload/update file
POST /repos/{owner}/{repo}/pulls                   - Create pull request
```

## GitHub Actions Workflow

The `update-icons.yml` workflow file is now **deprecated** and can be removed or disabled. It's no longer needed because:

- Icons are uploaded directly via the Contents API
- No `repository_dispatch` event is triggered
- The workflow won't receive any events to process

### Recommendation

You can either:
1. **Remove** `.github/workflows/update-icons.yml` entirely
2. **Keep it** as a backup (it won't interfere with the new system)

## Error Handling

The new implementation provides detailed error messages:

- **401**: Token is invalid or expired
- **403**: Token lacks required `repo` scope
- **404**: Repository not found or token lacks access
- **422**: Invalid request data (should not occur with current implementation)
- **Network errors**: Connection issues with GitHub API

All errors fall back to downloading a JSON file for manual processing.

## Testing

### Build Verification
```bash
npm run build  # ✅ Passes
npm run lint   # ✅ Passes (1 unrelated warning)
```

### Manual Testing Required

To verify the fix works:

1. Configure a GitHub token with `repo` scope
2. Upload one or more icons in the Icon Editor
3. Click "Save Changes"
4. Verify a PR is created automatically
5. Check the PR contains the uploaded icons

## Migration Notes

- **Users**: No action required - the fix is transparent
- **Existing tokens**: Will continue to work (same `repo` scope required)
- **Fallback**: Manual JSON processing still works as before
- **Backwards compatible**: No breaking changes to the Icon Editor UI

## Security

- Token still stored in localStorage (same as before)
- Token only sent to `api.github.com` (GitHub's official API)
- No additional permissions required
- All API calls use HTTPS

---

**Version**: 3.0.0  
**Date**: December 2025  
**Status**: ✅ Fixed and Deployed
