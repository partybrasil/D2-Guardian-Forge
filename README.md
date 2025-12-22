# 🎮 D2-Guardian-Forge

<div align="center">

**Build Planner for Destiny 2 - Edge of Fate 2025**

[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Your builds, your privacy, your control** 🛡️

</div>

---

## 🌟 Features

### ✨ Build Planning
- **18 Subclasses** - All 3 Guardian classes with 6 subclasses each (Solar, Arc, Void, Stasis, Strand, Prismatic)
- **Prismatic Subclass Support** - Mix Light and Dark abilities with proper class filtering
- **Complete Ability System** - 20+ Supers, 15 Grenades, 32 Melees, 6 Class Abilities
- **Aspects & Fragments** - 2 Aspects max + dynamic fragment slots (4-6 based on aspect selection)
- **Smart Fragment Slot System** - Automatically calculates available slots from selected aspects
- **Fragment Stat Modifiers** - Real-time stat adjustments from fragments with visual indicators
- **Class-Based Filtering** - Proper filtering for Prismatic builds (only shows abilities for selected class)
- **Armor 3.0 System** - 0-200 stat system with 6 archetypes
- **Build Management** - Create, edit, delete, filter, and organize builds
- **Icon System** - Visual icons for classes, subclasses, supers, aspects, fragments, and abilities ([see status](ICON_STATUS.md))
- **Backup & Restore** - Export all builds to JSON and restore from backup files
- **Responsive Design** - Optimized for mobile, tablet, and desktop

### 🔒 Privacy First
- **100% Local Storage** - IndexedDB (LocalForage) for all data
- **No External APIs** - Zero data transmission, no network calls
- **No Tracking** - Your builds stay on your device
- **Offline Capable** - Works without internet after initial load
- **No Analytics** - Complete privacy guaranteed

---

## 🚀 Quick Start

### Online Version
👉 **[https://partybrasil.github.io/D2-Guardian-Forge/](https://partybrasil.github.io/D2-Guardian-Forge/)**

### Local Development

```bash
# Clone and install
git clone https://github.com/partybrasil/D2-Guardian-Forge.git
cd D2-Guardian-Forge
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📊 Armor 3.0 System

### Stats (0-200)
| Stat | Tier 1 (0-100) | Tier 2 (101-200) | Priority |
|------|---------------|------------------|----------|
| **Grenade** | -40s cooldown, +65% dmg | +1 charge at 150+ | **Highest** |
| **Melee** | -30s cooldown, +30% dmg | -20% CD, +20% dmg | High |
| **Health** | +10% flinch resist | +20 shield, +45% recharge | High |
| **Class** | -40s cooldown | -20% CD, +20% bonus | High |
| **Super** | +40% energy gain | +30% gain, +10% dmg | Medium |
| **Weapons** | +10% reload/handling | +15% PvE dmg | Medium |

### Armor Archetypes
- **Bombardero** - Weapons ±30, Melee ±25
- **Especialista** - Class ±30, Grenade ±25
- **Ejemplar** - Super ±30, Health ±25
- **Camorrista** - Melee ±30, Grenade ±25
- **Granádero** - Weapons ±30, Grenade ±25
- **Guardián** - Health ±30, Class ±25

---

## 🎯 Key Features Explained

### Fragment System
- Each aspect provides **2-3 fragment slots**
- Select **2 aspects** to unlock **4-6 fragment slots** total
- Fragments provide **stat modifiers** (positive and negative)
- Real-time calculation shows **base stats** + **fragment modifiers** = **final stats**
- Visual indicators highlight stat gains (green) and losses (red)

### Build Dashboard
- **Filter by Class** - Warlock, Titan, Hunter
- **Filter by Subclass** - Solar, Arc, Void, Stasis, Strand, Prismatic
- **Build Cards** - Visual preview with icons, stats, and abilities
- **Quick Actions** - Edit, Export, Delete builds
- **Stats Preview** - See final stats with fragment modifiers at a glance

### Backup System
- **Download Backup** - Export all builds to a timestamped JSON file
- **Restore Backup** - Import builds from JSON with duplicate detection
- **Smart Import** - Skips existing builds, imports new ones
- **Safe Restore** - Shows import results (success, skipped, failed)

---

## 🛠️ Tech Stack

React 19 • TypeScript 5.9 • Vite 7.3 • Tailwind CSS 3.4 • LocalForage • React Router 7

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

<div align="center">

**Made with ❤️ for Guardians**

![Edge of Fate 2025](https://img.shields.io/badge/Edge_of_Fate-2025-d4af37?style=for-the-badge)

</div>
