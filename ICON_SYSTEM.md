# Icon System Documentation

## Overview

The D2-Guardian-Forge icon system provides 100% offline-first icon support using assets from `data.destinysets.com`. All icons are pre-downloaded and cached locally for privacy-first, offline-capable operation.

## Architecture

### Files and Components

- **`src/data/icons.json`** - Icon hash manifest (307+ entries)
- **`src/components/Icon.tsx`** - React component for displaying icons
- **`src/utils/iconUtils.ts`** - Utility functions for icon lookup
- **`scripts/Manifest-Update-Run.py`** - Python script for downloading/updating icons
- **`.github/workflows/manifest-update.yml`** - GitHub Actions workflow for automated updates
- **`public/icons/`** - Local icon storage (308 PNGs, ~2.5MB)

## Usage

### Basic Icon Display

```tsx
import Icon from '../components/Icon';
import { getIconHash } from '../utils/iconUtils';

// Display a class icon
<Icon hash={getIconHash('classes', 'Titan')} size={48} alt="Titan" />

// Display an aspect icon
<Icon hash={getIconHash('aspects', 'Bastion')} size={40} alt="Bastion" />

// Display with custom fallback
<Icon 
  hash={getIconHash('fragments', 'Echo of Vigilance')} 
  size={32}
  alt="Echo of Vigilance"
  fallback="/custom-fallback.png"
/>
```

### Icon Categories

Available categories in `icons.json`:
- `classes` - Titan, Hunter, Warlock
- `subclasses` - All subclass variants (solar_titan, prismatic_warlock, etc.)
- `aspects` - All class-specific aspects
- `fragments` - All element-specific fragments
- `grenades` - Shared grenades
- `melees` - Class-specific melees
- `classAbilities` - Rift, Barricade, Dodge variants
- `supers` - All super abilities
- `exotics` - Exotic armor pieces
- `weapons` - Exotic weapons
- `mods` - Armor mods
- `default` - Fallback icon hash

### Icon Grid Display

For displaying multiple icons in a grid:

```tsx
import { IconGrid } from '../components/Icon';

<IconGrid
  icons={[
    { hash: 3941232607, label: 'Bastion', onClick: () => selectAspect('Bastion') },
    { hash: 2213715663, label: 'Echo of Vigilance' }
  ]}
  size={48}
  columns={4}
  gap={8}
/>
```

### Utility Functions

```tsx
import { 
  getIconHash, 
  getIconsByCategory, 
  hasIcon, 
  getAllIconHashes 
} from '../utils/iconUtils';

// Get a specific icon hash
const bastionHash = getIconHash('aspects', 'Bastion'); // Returns: 3941232607

// Get all icons in a category
const allAspects = getIconsByCategory('aspects'); // Returns: { "Bastion": 3941232607, ... }

// Check if an icon exists
if (hasIcon('fragments', 'Echo of Vigilance')) {
  // Icon exists in manifest
}

// Get all icon hashes (for preloading)
const allHashes = getAllIconHashes(); // Returns: [46524085, 123456789, ...]
```

## Updating Icons

### Local Update

Run the Python script manually:

```bash
python3 scripts/Manifest-Update-Run.py
```

This will:
- Load the manifest from `src/data/icons.json`
- Download any new/missing icons to `public/icons/`
- Skip already-downloaded icons (based on MD5 hash)
- Generate download log at `public/icons/.download_log.json`

### Automated Update (GitHub Actions)

1. Go to **Actions** tab in the repository
2. Select **Manifest Update Run** workflow
3. Click **Run workflow**
4. Optional: Check "Force update" to re-download all icons

The workflow will:
- Download/update all icons
- Commit changes to the repository
- Generate a summary report

## Adding New Icons

1. **Update the manifest** (`src/data/icons.json`):
   ```json
   {
     "aspects": {
       "New Aspect Name": 1234567890
     }
   }
   ```

2. **Run the update script**:
   ```bash
   python3 scripts/Manifest-Update-Run.py
   ```

3. **Verify the icon**:
   - Check `public/icons/1234567890.png` exists
   - Test in the UI: `<Icon hash={getIconHash('aspects', 'New Aspect Name')} />`

## Icon Sources

All icons are sourced from:
```
https://data.destinysets.com/assets/400/{HASH}.png
```

Example:
- Bastion aspect (hash: 3941232607)
- URL: https://data.destinysets.com/assets/400/3941232607.png

## Performance

### Preloading

Icons are preloaded in `App.tsx` for optimal performance:

```tsx
useEffect(() => {
  const iconHashes = getAllIconHashes();
  const criticalIcons = iconHashes.slice(0, 50); // First 50 icons
  
  criticalIcons.forEach((hash) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `/D2-Guardian-Forge/icons/${hash}.png`;
    document.head.appendChild(link);
  });
}, []);
```

### Lazy Loading

The Icon component uses native lazy loading:
```tsx
<img loading="lazy" decoding="async" ... />
```

## File Structure

```
D2-Guardian-Forge/
├── public/
│   └── icons/                    # 308 PNG files (~2.5MB)
│       ├── .download_log.json    # Download tracking
│       ├── 3941232607.png        # Bastion
│       ├── 2213715663.png        # Echo of Vigilance
│       └── default.png           # Fallback icon
├── scripts/
│   └── Manifest-Update-Run.py    # Download script
├── src/
│   ├── components/
│   │   └── Icon.tsx              # Icon component
│   ├── data/
│   │   └── icons.json            # Hash manifest
│   └── utils/
│       └── iconUtils.ts          # Helper functions
└── .github/
    └── workflows/
        └── manifest-update.yml   # Auto-update workflow
```

## Troubleshooting

### Missing Icons

If an icon shows the fallback image:
1. Check if the hash exists in `icons.json`
2. Verify the PNG file exists in `public/icons/`
3. Run the update script to download missing icons

### 404 Errors

If icons fail to download (404):
- The hash may be incorrect
- The icon may not exist in the CDN
- Update the hash in `icons.json`

### Offline Mode

Icons are fully cached locally. To test offline:
```bash
npm run build
npx serve dist
# Disconnect network - icons should still load
```

## Best Practices

1. **Always use `getIconHash()`** instead of hardcoded hashes
2. **Provide meaningful alt text** for accessibility
3. **Use appropriate sizes** (32-64px for UI elements)
4. **Include fallback prop** for critical UI elements
5. **Update manifest first** before running download script
6. **Test offline** after adding new icons

## Security & Privacy

- ✅ **No external API calls** - All icons cached locally
- ✅ **No tracking** - Direct CDN downloads during build
- ✅ **Offline-first** - Works without internet connection
- ✅ **Version controlled** - Icons committed to repository
- ✅ **No user data** - Icon system is purely presentational

---

**Last Updated:** December 2024  
**Version:** 1.0.0 - Edge of Fate
