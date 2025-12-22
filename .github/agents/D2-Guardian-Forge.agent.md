---
name: D2-Guardian-Forge-AutoDEV
description:  |
  Build Planner Destiny 2 Edge of Fate 2025. Local storage, no APIs. Armor 3.0, stats 0-200, 3 classes, 18 subclasses, complete ability system with icon support.
version: 1.0.0
enabled: true
---

instructions: |
  # D2-Guardian-Forge Agent - Edge of Fate 2025
  
  ## Stack
  React 19 + TypeScript 5.9 + Vite 7.3 + Tailwind CSS 3.4 (Dark Destiny theme)
  Storage: LocalForage (IndexedDB) + /builds folder (git-synced)
  Zero external APIs - 100% local data
  
  ## Arquitectura
  src/ → components/ (Icon, AbilitySelector, AspectSelector), data/ (JSON estático), hooks/ (useBuild, useFilters, useStats), types/, utils/ (validators, calculators, statsCalculator, backupManager, iconUtils), pages/ (Dashboard, BuildPlanner)
  builds/ → user builds (git-synced)
  public/icons/ → icon assets (fallback support)
  
  ## Clases & Subclasses (18 Total)
  **Warlock**: Well, Chaos Reach, Nova, Winter's Wrath, Needlestorm, Prismatic
  **Titan**: Sentinel Shield/Strike/Void, Glacial Quake, Strand, Prismatic
  **Hunter**: Golden Gun, Arcstaff, Shadowshot, Stasis Revolver, Threadling Net, Prismatic
  
  ## Elementos por Clase
  **Supers**: 20+ across all classes and subclasses
  **Grenades**: Shared across all classes, filtered by element (15 total: 3 Solar, 3 Arc, 3 Void, 3 Stasis, 3 Strand)
  **Melees**: Class-specific, filtered by class AND element (32 total: 11 Warlock, 10 Titan, 11 Hunter)
  **Class Abilities**: 1 per class (Rift for Warlock, Barricade for Titan, Dodge for Hunter)
  **Aspects**: Class-specific, 2 selectable max, each with 2-3 fragment slots
  **Fragments**: Element-specific, dynamically limited by aspect slots (4-6 total based on selected aspects)
  
  ## Prismatic Subclass Rules
  **Filtering**: Prismatic allows mixing Light + Dark abilities BUT only from the selected class
  - Supers: All supers from selected class (Solar/Arc/Void/Stasis/Strand)
  - Grenades: All grenades from all elements (shared across classes)
  - Melees: All melees from selected class only (all elements)
  - Aspects: All aspects from selected class only (Solar/Arc/Void/Stasis/Strand)
  - Fragments: All fragments from all elements (Solar/Arc/Void/Stasis/Strand/Prismatic)
  
  **Fragment Slots System**:
  - Each aspect provides 2-3 fragment slots (never 1)
  - Total available slots = sum of 2 selected aspects (4-6 slots)
  - Fragment counter shows "X/Y" where Y is dynamic based on selected aspects
  - Changing aspects recalculates available slots and may remove excess fragments
  - Fragments disabled until 2 aspects are selected
  
  **Fragment Stats System**:
  - Each fragment can modify stats (positive or negative)
  - Stats calculated: Base Stats + Fragment Modifiers = Final Stats
  - Visual indicators: Green for gains, Red for losses
  - Summary shows total gains/losses at top of stats display
  - Individual stat shows modifier breakdown: "120 (100+20)"
  
  ## Stats (0-200 Armor 3.0)
  **Weapons**: ±30%, Tier2: +15% PvE, +6% PvP
  **Health**: ±30%, Tier2: +20 shield, +45% recharge
  **Class**: -40s cooldown, Tier2: -20% extra, +20% bonus
  **Melee**: -30s cooldown, Tier2: -20% extra, +20% dmg
  **Grenade**: -40s cooldown, Tier2: -30% extra, **+1 CHARGE** at 150+
  **Super**: +40% energy, Tier2: +30% extra, +10% dmg
  
  ## Armor Archetypes (6)
  Bombardero (W±30/M±25), Especialista (C±30/G±25), Ejemplar (S±30/H±25)
  Camorrista (M±30/G±25), Granádero (W±30/G±25), Guardián (H±30/C±25)
  
  ## Mods (5 Slots, 50 Energy Max)
  Types: Weapon (5-10), Ability (8-10), Defense (8-10), Utility (5-8)
  Prohibido: 2x Font of Might, 2x Recharge Overload, 3+ Barrier, 2x Well of Life
  
  ## Funciones Core
  1. BuildManager: create/read/update/delete/list builds (IndexedDB via LocalForage)
  2. StatsCalculator: sum armor stats, apply fragment modifiers, calculate final stats, validate 0-200
  3. SubclassFilterer: dynamic super/ability/aspect/fragment options based on class/subclass
  4. SynergyAnalyzer: match synergies, score 0-100, strengths/weaknesses
  5. BuildExporter: JSON/Markdown/DIM formats
  6. BackupManager: downloadBuildsBackup(), restoreBuildsFromBackup() with duplicate detection
  7. IconUtils: getIconHash() for mapping items to icon hashes, fallback support
  
  ## UI Components
  **Pages**: BuildPlanner (left form + right analysis), Dashboard (filters + build cards grid)
  **Components**: Icon (lazy loading, fallback), AbilitySelector, AspectSelector, StatsPanel (6 sliders 0-200)
  **Responsive**: Mobile-first design, breakpoints: sm (640px), md (768px), lg (1024px)
  
  ## Icon System
  **Structure**: icons.json manifest with 308+ icon hashes
  **Usage**: <Icon hash={getIconHash('classes', 'Titan')} size={48} alt="Titan" />
  **Categories**: classes, subclasses, supers, grenades, melees, classAbilities, aspects, fragments
  **Fallback**: Automatic fallback to placeholder if icon not found
  **Status**: Infrastructure complete, icons currently use placeholders (see ICON_STATUS.md)
  
  ## Dashboard Features
  **Filters**: Class (Warlock/Titan/Hunter), Subclass (Solar/Arc/Void/Stasis/Strand/Prismatic)
  **Build Cards**: Visual preview with icons, abilities, aspects, fragments, final stats
  **Actions**: Edit (navigate to planner), Export, Delete (with confirmation)
  **Backup/Restore**: Download all builds to JSON, restore from JSON file
  **Responsive**: Optimized layout for mobile (stacked), tablet (2 cols), desktop (3 cols)
  
  ## Build Planner Features
  **Left Panel**: Class/Subclass selection, Super/Abilities selectors, Aspects (2 max), Fragments (dynamic slots), Stats sliders, Notes (Gameplay Loop, Build Details)
  **Right Panel**: Build summary, selected super info, selected aspects info, selected fragments list with stat modifiers
  **Save**: LocalForage storage with timestamps (created, updated)
  **Load**: Auto-load build if ?id=xxx in URL
  
  ## Data Files (src/data/)
  supers.json (20+ supers), grenades.json (15), melees.json (32), classAbilities.json (6)
  aspects.json (10+), fragments.json (10+ with stat modifiers), subclasses.json (18)
  armor-archetypes.json (6), stats.json, mods.json (12), icons.json (308+ hashes)
  
  ## Build JSON Schema
  { 
    id, name, class, subclass, super, 
    abilities: { grenade, melee, classAbility }, 
    aspects: [], fragments: [], 
    weapons: { kinetic, energy, power }, 
    armor: { head, hands, chest, legs, classItem }, 
    stats: { weapons, health, class, melee, grenade, super }, 
    mods: [], artifactPerks: [], 
    strengths: [], weaknesses: [], 
    gameplayLoop, buildDetails, 
    timestamps: { created, updated }, 
    version 
  }
  
  ## Design System
  **Colors**: 
  - Background: #0a0e27 (destiny-background)
  - Primary: #f7931e (destiny-primary)
  - Arc: #33c4ff (destiny-arc)
  - Solar: #ff6600 (destiny-solar)
  - Void: #7d4fff (destiny-void)
  - Stasis: #33ccff (destiny-stasis)
  - Strand: #00ff88 (destiny-strand)
  - Prismatic: #d4af37 (destiny-prismatic)
  
  **Components**:
  - Cards: bg-gray-800/50, border rounded-lg, p-6
  - Buttons: btn-primary (orange), btn-secondary (gray)
  - Inputs: bg-gray-700, border-gray-600, focus:border-primary
  
  ## Dev Rules
  ✅ TypeScript strict mode, all props typed
  ✅ Custom hooks for logic separation
  ✅ Zod validation for data integrity
  ✅ LocalForage (IndexedDB) - no localStorage
  ✅ No Bungie APIs - 100% local data
  ✅ Components one-per-file with clear naming
  ✅ Git versioned builds in /builds folder
  ✅ Responsive design: mobile-first approach
  ✅ Icon component with lazy loading and fallback
  ✅ Fragment stat modifiers with visual indicators
  
  ## Commands
  npm install | npm run dev (port 5173) | npm run build | npm run deploy | npm run lint
  
  ## Build Templates
  Grenade Spam Warlock: G190,M150,C110,W100,H80,S110 | Well + Swarm + Starfire Protocol
  Tank Titan: H180,C140,S100,M80,W60,G90 | Glacial Quake + Duskfield + Heart of Inmost Light
  DPS Hunter: W160,S140,G130,M120,H70,C50 | Arcstaff + Arcbolt + Raiden Flux
  
  ## Priorities by Activity
  **STRIKES**: G100>S100>M80 (Grenade spam for add clear)
  **DUNGEONS**: H140>M120>C100 (Survivability first)
  **RAIDS**: S160>G150>M100 (DPS windows)
  **GMs**: H180>M130>C100 (Max survivability)
  **PvP**: W150>S110>H100 (Weapon stats, mobility)
  
  ## Recent Updates (Last 7 Days)
  ✅ Icon system implementation (infrastructure complete)
  ✅ Fragment stat modifiers with real-time calculations
  ✅ Backup/Restore system with duplicate detection
  ✅ Dashboard mobile responsiveness improvements
  ✅ Build card visual enhancements with icons
  ✅ Stats display with fragment modifier indicators
  ✅ Responsive filter buttons for mobile
  ✅ Touch-friendly UI elements
  
  **D2-Guardian-Forge v1.0.0 | Edge of Fate 2025 Final**
