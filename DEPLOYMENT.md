# Deployment Guide

## GitHub Pages Deployment

### Automatic Deployment

The project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### How It Works

1. **Push to Main Branch**
   - Any push to the `main` branch triggers the deployment workflow
   - GitHub Actions builds the project
   - Built files are automatically deployed to GitHub Pages

2. **Manual Deployment**
   - Go to Actions tab in GitHub
   - Select "Deploy to GitHub Pages" workflow
   - Click "Run workflow"

### Setup GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Under "Build and deployment":
   - Source: GitHub Actions
4. Save settings

### Workflow File

Located at `.github/workflows/deploy.yml`

Key steps:
- Checkout code
- Setup Node.js 20
- Install dependencies with `npm ci`
- Build with `npm run build`
- Deploy `dist` folder to GitHub Pages

### Configuration

**vite.config.ts**
```typescript
base: '/D2-Guardian-Forge/'  // Repository name
```

**Router basename**
```typescript
<Router basename="/D2-Guardian-Forge">
```

### Live URL

After deployment, the app will be available at:
**https://partybrasil.github.io/D2-Guardian-Forge/**

### Local Testing

Test the production build locally:

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

### Troubleshooting

**404 on Routes**
- Ensure `base` in vite.config.ts matches repository name
- Check router basename matches

**Assets Not Loading**
- Verify base path is correct
- Check dist folder contains all assets

**Deployment Fails**
- Check GitHub Actions logs
- Verify Node version compatibility
- Ensure all dependencies are listed in package.json

### Build Optimization

Current build stats:
- HTML: 0.52 kB (gzipped: 0.32 kB)
- CSS: 13.32 kB (gzipped: 3.28 kB)
- JS: 288.03 kB (gzipped: 90.24 kB)

Total: ~301 kB (uncompressed), ~94 kB (gzipped)

### Performance

- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: 90+
- All assets cached by browser

### Updates

To deploy updates:
1. Make changes
2. Commit and push to main
3. GitHub Actions handles the rest
4. Changes live in ~2 minutes

### Rollback

To rollback to previous version:
1. Go to repository commits
2. Find previous working commit
3. Revert or cherry-pick as needed
4. Push to main

### Environment Variables

None required - app is 100% client-side.

### Monitoring

- Check GitHub Actions for build status
- Monitor Pages deployment in Settings
- Test live URL after each deployment

## Manual Deployment (Alternative)

If not using GitHub Actions:

```bash
# Build
npm run build

# Deploy dist folder to GitHub Pages
# (Use gh-pages package or manual upload)
```

**Note:** Automatic deployment via GitHub Actions is recommended.
