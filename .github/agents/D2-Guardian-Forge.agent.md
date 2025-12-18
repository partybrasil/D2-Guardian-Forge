name: D2-Guardian-Forge-AutoDEV
description: Build Planner Destiny 2 Edge of Fate 2025. Local storage, no APIs. Armor 3.0, stats 0-200, 3 clases, 6 subclasses.
version: 1.0.0
enabled: true

instructions: |
  # D2-Guardian-Forge Agent - Edge of Fate 2025
  
  ## Stack
  React 18 + TypeScript + Vite + Tailwind CSS (Dark Destiny theme)
  Storage: LocalForage (IndexedDB) + /builds folder (git-synced)
  Zero external APIs - 100% local data
  
  ## Arquitectura
  src/ → components/, data/ (JSON estático), hooks/ (useBuild, useFilters, useStats), types/, utils/ (validators, calculators), pages/
  builds/ → user builds (git-synced)
  
  ## Clases & Subclasses (18 Total)
  **Warlock**: Well, Chaos Reach, Nova, Winter's Wrath, Needlestorm, Prismatic
  **Titan**: Sentinel Shield/Strike/Void, Glacial Quake, Strand, Prismatic
  **Hunter**: Golden Gun, Arcstaff, Shadowshot, Stasis Revolver, Threadling Net, Prismatic
  
  ## Elementos por Clase
  15 Grenadas (3 Solar, 3 Arc, 3 Void, 3 Stasis, 3 Strand)
  15 Melees (3 Solar, 3 Arc, 3 Void, 3 Stasis, 3 Strand)
  1 Class Ability (Rift/Barricade/Dodge)
  2 Aspects seleccionables (4-6 por subclass)
  5-6 Fragments dinámicos
  
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
  1. BuildManager: create/read/update/delete/list builds (IndexedDB)
  2. StatsCalculator: sum armor stats, apply tier2 bonuses, validate 0-200
  3. SubclassFilterer: dynamic super/ability/aspect/fragment options
  4. SynergyAnalyzer: match synergies, score 0-100, strengths/weaknesses
  5. BuildExporter: JSON/Markdown/DIM formats
  
  ## UI Components
  BuildPlanner (left form + right analysis), Dashboard (filters + table), StatsPanel (6 sliders 0-200)
  ClassSelector, SubclassSelector, AspectsSelector, ModsSelector, ArmorSelector
  
  ## Data Files (src/data/)
  subclasses.json, aspects.json, fragments.json, armor-archetypes.json, stats.json, mods.json
  
  ## Build JSON Schema
  { id, name, class, subclass, super, abilities{}, aspects[], fragments[], weapons{}, armor{5}, stats{6}, mods[], artifactPerks[], strengths[], weaknesses[], gameplayLoop, buildDetails, timestamps, version }
  
  ## Design System
  #0a0e27 (bg), #f7931e (primary), #33c4ff (arc), #ff6600 (solar), #7d4fff (void), #33ccff (stasis), #00ff88 (strand), #d4af37 (prismatic)
  
  ## Dev Rules
  ✅ TypeScript strict, all props typed
  ✅ Custom hooks for logic
  ✅ Zod validation
  ✅ LocalForage (no localStorage)
  ✅ No Bungie APIs
  ✅ Components one-per-file
  ✅ Git versioned builds
  
  ## Commands
  npm install | npm run dev (port 5173) | npm run build | npm run deploy | npm run test | npm run lint
  
  ## Build Templates
  Grenade Spam Warlock: G190,M150,C110,W100,H80,S110 | Well + Swarm
  Tank Titan: H180,C140,S100,M80,W60,G90 | Glacial + Duskfield
  DPS Hunter: W160,S140,G130,M120,H70,C50 | Arcstaff + Arcbolt
  
  ## Priorities by Activity
  STRIKES: G100>S100>M80 | DUNGEONS: H140>M120>C100 | RAIDS: S160>G150>M100
  GMs: H180>M130>C100 | PvP: W150>S110>H100
  
  **D2-Guardian-Forge v1.0.0 | Edge of Fate 2025 Final**