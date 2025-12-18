# Changelog

All notable changes to D2-Guardian-Forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-18

### Added
- Initial release of D2-Guardian-Forge
- React 19 + TypeScript 5.9 + Vite 7.3 application
- Tailwind CSS 3.4 with Destiny 2 themed color scheme
- LocalForage integration for IndexedDB storage
- React Router 7 for navigation

#### Features
- **Build Creation System**
  - Guardian class selection (Warlock, Titan, Hunter)
  - Subclass selection (Solar, Arc, Void, Stasis, Strand, Prismatic)
  - Super ability selection (20 supers across all classes)
  - Grenade selection (15 grenades)
  - Melee selection (15 melees)
  - Class ability selection (6 abilities)
  - Aspect selection (2 max, 10 available)
  - Fragment selection (6 max, 10 available)
  - Stat customization (0-200 range for 6 stats)

- **Build Management**
  - Dashboard with build listing
  - Build filtering by class and subclass
  - Build editing with timestamp preservation
  - Build deletion
  - Real-time build summary preview

- **Data Layer**
  - Complete type definitions for all game elements
  - JSON data files for supers, grenades, melees, abilities
  - Armor archetype definitions (6 archetypes)
  - Stat system documentation (0-200 with Tier 1/2 bonuses)
  - Aspect and Fragment definitions
  - Mod definitions (12 mods)

- **Build Templates**
  - Template directory structure
  - Grenade Spam Warlock template

- **Deployment**
  - GitHub Pages deployment configuration
  - GitHub Actions workflow for automatic deployment
  - Production build optimization

#### Technical
- TypeScript strict mode enabled
- Type-safe data structures
- LocalForage for persistent storage
- Responsive design (mobile, tablet, desktop)
- Code review passed
- ESLint configured
- Vite build optimization

### Fixed
- Replaced deprecated `substr()` with `substring()`
- Fixed timestamp preservation when editing builds
- Proper TypeScript type imports

### Documentation
- Comprehensive README with feature list
- Armor 3.0 system documentation
- Tech stack documentation
- Build templates documentation
- Contribution guidelines

[1.0.0]: https://github.com/partybrasil/D2-Guardian-Forge/releases/tag/v1.0.0
