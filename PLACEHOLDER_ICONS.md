# Placeholder Icon System

## Overview

D2-Guardian-Forge now uses an organized placeholder icon system where all game element icons are stored in categorized folders with descriptive filenames. This makes it easy to replace placeholder icons with real images one by one.

## Structure

All icons are located in `public/icons/` with the following subdirectories:

```
public/icons/
├── classes/              # 3 class icons
│   ├── Titan.png
│   ├── Hunter.png
│   └── Warlock.png
├── subclasses/           # 18 subclass icons
│   ├── solar_warlock.png
│   ├── arc_warlock.png
│   ├── void_warlock.png
│   ├── stasis_warlock.png
│   ├── strand_warlock.png
│   ├── prismatic_warlock.png
│   ├── solar_titan.png
│   ├── arc_titan.png
│   ├── void_titan.png
│   ├── stasis_titan.png
│   ├── strand_titan.png
│   ├── prismatic_titan.png
│   ├── solar_hunter.png
│   ├── arc_hunter.png
│   ├── void_hunter.png
│   ├── stasis_hunter.png
│   ├── strand_hunter.png
│   └── prismatic_hunter.png
├── supers/               # 32 super ability icons
│   ├── Well of Radiance.png
│   ├── Daybreak.png
│   ├── Chaos Reach.png
│   ├── Nova Bomb.png
│   ├── Winter's Wrath.png
│   ├── Golden Gun.png
│   ├── Shadowshot.png
│   └── ... (29 more)
├── grenades/             # 15 grenade icons
│   ├── Solar Grenade.png
│   ├── Fusion Grenade.png
│   ├── Arcbolt Grenade.png
│   ├── Vortex Grenade.png
│   ├── Duskfield Grenade.png
│   └── ... (10 more)
├── melees/               # 31 melee ability icons
│   ├── Celestial Fire.png
│   ├── Chain Lightning.png
│   ├── Pocket Singularity.png
│   ├── Hammer Strike.png
│   ├── Weighted Knife.png
│   └── ... (26 more)
├── classAbilities/       # 10 class ability icons
│   ├── Healing Rift.png
│   ├── Empowering Rift.png
│   ├── Phoenix Dive.png
│   ├── Towering Barricade.png
│   ├── Rally Barricade.png
│   ├── Marksman's Dodge.png
│   └── ... (4 more)
├── aspects/              # 51 aspect icons
│   ├── Touch of Flame.png
│   ├── Heat Rises.png
│   ├── Arc Soul.png
│   ├── Feed the Void.png
│   ├── Bleak Watcher.png
│   ├── Knockout.png
│   ├── Sol Invictus.png
│   └── ... (44 more)
├── fragments/            # 80 fragment icons
│   ├── Ember of Torches.png
│   ├── Spark of Amplitude.png
│   ├── Echo of Cessation.png
│   ├── Whisper of Bonds.png
│   ├── Thread of Ascent.png
│   ├── Facet of Awakening.png
│   └── ... (74 more)
├── exotics/              # 36 exotic gear icons
│   ├── Ophidian Aspect.png
│   ├── Crown of Tempests.png
│   ├── Starfire Protocol.png
│   ├── Heart of Inmost Light.png
│   ├── Celestial Nighthawk.png
│   └── ... (31 more)
├── weapons/              # 20 weapon icons
│   ├── Hawkmoon.png
│   ├── Ace of Spades.png
│   ├── Witherhoard.png
│   ├── Gjallarhorn.png
│   └── ... (16 more)
├── mods/                 # 18 mod icons
│   ├── Font of Might.png
│   ├── Elemental Charge.png
│   ├── Well of Life.png
│   └── ... (15 more)
└── default.png           # Fallback icon

Total: ~314 organized placeholder files
```

## Current Status

All placeholder icons are currently **geometric shapes** that were automatically generated. They maintain the visual structure of the UI and show which elements need icons.

## Replacing Placeholders

To replace a placeholder with a real icon:

1. **Locate the category folder** in `public/icons/` (e.g., `public/icons/aspects/`)
2. **Find the exact filename** (e.g., `Bastion.png`)
3. **Replace the file** with your real icon (must be PNG format)
4. **Keep the same filename** - the name must match exactly
5. **Recommended dimensions**: 96x96 pixels or higher
6. **Format**: PNG with transparency support

### Example

To replace the "Well of Radiance" super icon:
```bash
# Replace the placeholder
cp /path/to/real/well-of-radiance-icon.png public/icons/supers/"Well of Radiance.png"
```

The new icon will automatically appear in the UI without any code changes!

## Icon Component Usage

The Icon component supports both the new organized structure and legacy hash-based icons for backwards compatibility:

```tsx
// New organized structure (preferred)
<Icon category="aspects" name="Bastion" size={48} alt="Bastion Aspect" />

// Also works for all categories
<Icon category="classes" name="Titan" size={64} alt="Titan" />
<Icon category="supers" name="Well of Radiance" size={56} alt="Well of Radiance" />
<Icon category="fragments" name="Echo of Vigilance" size={32} alt="Echo of Vigilance" />

// Legacy hash support (backwards compatible)
<Icon hash={3941232607} size={48} alt="Bastion Aspect" />
```

## Benefits

✅ **Easy to understand** - Descriptive filenames instead of hash numbers  
✅ **Simple to replace** - Just drop new images with the same name  
✅ **Organized structure** - Icons grouped by category  
✅ **Git-friendly** - Meaningful filenames in version control  
✅ **No code changes needed** - Replace icons without touching code  
✅ **Maintains visual structure** - Geometric placeholders keep UI intact  

## Scripts Removed

The following download scripts have been removed as they were not functioning:

- ❌ `scripts/Manifest-Update-Run.py`
- ❌ `scripts/create-destiny-icons.py`
- ❌ `scripts/create-improved-placeholders.py`
- ❌ `scripts/create-placeholder-icons.py`
- ❌ `scripts/verify-icons.py`
- ❌ `.github/workflows/manifest-update.yml`

## Utility Script

A utility script `scripts/organize-placeholders.js` was used to organize the initial placeholders from the hash-based structure. This script can be used again if needed to reorganize icons.

## Technical Details

### Icon Loading

Icons are loaded using standard web image paths:
```
/icons/{category}/{name}.png
```

For example:
- `/icons/classes/Titan.png`
- `/icons/aspects/Bastion.png`
- `/icons/fragments/Echo of Vigilance.png`

### Fallback Behavior

If an icon fails to load, the Icon component automatically falls back to `/icons/default.png`.

### File Naming

File names must match exactly with the names in the data files:
- `src/data/supers.json`
- `src/data/grenades.json`
- `src/data/melees.json`
- `src/data/classAbilities.json`
- `src/data/aspects.json`
- `src/data/fragments.json`
- etc.

Subclass icons use the format: `{element}_{class}.png` (e.g., `solar_warlock.png`)

---

**Ready to replace placeholders?** Just drop your real icons into the appropriate category folder with the exact filename, and they'll automatically appear in the UI! 🎨
