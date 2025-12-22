// Core types for D2-Guardian-Forge

export type GuardianClass = 'Warlock' | 'Titan' | 'Hunter';

export type Subclass = 'Solar' | 'Arc' | 'Void' | 'Stasis' | 'Strand' | 'Prismatic';

export type ArmorSlot = 'head' | 'hands' | 'chest' | 'legs' | 'classItem';

export type WeaponSlot = 'kinetic' | 'energy' | 'power';

export type ArmorArchetype = 
  | 'Bombardero'   // Weapons ±30, Melee ±25
  | 'Especialista' // Class ±30, Grenade ±25
  | 'Ejemplar'     // Super ±30, Health ±25
  | 'Camorrista'   // Melee ±30, Grenade ±25
  | 'Granádero'    // Weapons ±30, Grenade ±25
  | 'Guardián';    // Health ±30, Class ±25

export type StatName = 
  | 'weapons' 
  | 'health' 
  | 'class' 
  | 'melee' 
  | 'grenade' 
  | 'super';

export interface Stats {
  weapons: number;   // 0-200
  health: number;    // 0-200
  class: number;     // 0-200
  melee: number;     // 0-200
  grenade: number;   // 0-200
  super: number;     // 0-200
}

export interface Abilities {
  grenade: string;
  melee: string;
  classAbility: string;
  movement?: string;
}

export interface ExtraAbilities {
  aerial?: string;           // Auto-selected from aspects
  passive1?: string;         // Auto-selected from aspects
  passive2?: string;         // Auto-selected from aspects
  transcendenceMelee?: string;   // Auto-selected for Prismatic
  transcendenceGrenade?: string; // Auto-selected for Prismatic
}

export interface ArmorPiece {
  name: string;
  archetype: ArmorArchetype;
  masterwork: boolean;
}

export interface Armor {
  head: ArmorPiece;
  hands: ArmorPiece;
  chest: ArmorPiece;
  legs: ArmorPiece;
  classItem: ArmorPiece;
}

export interface Weapon {
  name: string;
  type: string;
  element?: Subclass;
}

export interface Weapons {
  kinetic: Weapon;
  energy: Weapon;
  power: Weapon;
}

export interface Mod {
  slot: number;      // 1-5
  name: string;
  energy: number;    // 5-10
  type: 'Weapon' | 'Ability' | 'Defense' | 'Utility';
  description?: string;
}

export interface Build {
  id: string;
  name: string;
  class: GuardianClass;
  subclass: Subclass;
  super: string;
  abilities: Abilities;
  extraAbilities?: ExtraAbilities; // New: Aerials, Passives, Transcendence
  aspects: string[];        // 2 max
  fragments: string[];      // 5-6 max
  weapons: Weapons;
  armor: Armor;
  stats: Stats;
  mods: Mod[];             // 5 max, 50 energy total
  artifactPerks?: string[];
  strengths?: string[];
  weaknesses?: string[];
  gameplayLoop?: string;
  buildDetails?: string;
  timestamps?: {
    created: string;
    updated: string;
  };
  version: string;         // "1.0.0-EdgeOfFate"
}

// Data structure types
export interface SuperAbility {
  name: string;
  class: GuardianClass;
  subclass: Subclass;
  type: 'Support' | 'DPS' | 'Burst' | 'CC' | 'Hybrid' | 'Defense' | 'Minion' | 'Sniper' | 'Debuff' | 'Trap' | 'Melee';
  duration: string;
  description: string;
  keyBenefit: string;
}

export interface Grenade {
  name: string;
  element: Subclass;
  mechanic: string;
  effect: string;
  radius: string;
  duration: string;
  description?: string;
}

export interface Melee {
  name: string;
  element: Subclass;
  class?: GuardianClass;
  type: 'Projectile' | 'AoE' | 'Chain' | 'Burst' | 'Wave' | 'Speed' | 'Pull' | 'Sustain' | 'Hook' | 'Multi';
  effect: string;
  range: string;
  cooldown: string;
  description?: string;
}

export interface ClassAbility {
  name: string;
  class: GuardianClass;
  type: 'Rift' | 'Barricade' | 'Dodge';
  primaryEffect: string;
  secondaryEffect?: string;
  cooldown: string;
  description?: string;
}

export interface Aspect {
  name: string;
  subclass: Subclass;
  class?: GuardianClass;
  description: string;
  fragmentSlots: number;
}

export interface Fragment {
  name: string;
  subclass: Subclass;
  effect: string;
  description: string;
  statModifiers?: {
    [key in StatName]?: number; // Positive or negative stat changes
  };
}

export interface SubclassDefinition {
  name: string;
  class: GuardianClass;
  element: Subclass;
  description: string;
  supers: string[];
  classAbility: string;
  keyFeatures: string[];
  playstyle: string;
  synergies: string[];
}

export interface ModDefinition {
  name: string;
  type: 'Weapon' | 'Ability' | 'Defense' | 'Utility';
  energy: number;
  description: string;
  conflictsWith?: string[];  // List of mods that can't be equipped together
}

export interface StatBreakdown {
  name: StatName;
  range: [number, number];
  tier1Bonus: string;
  tier2Bonus: string;
  perPoint: string;
  priority: 'Low' | 'Medium' | 'High' | 'Highest';
  description: string;
}

export interface ArchetypeDefinition {
  name: ArmorArchetype;
  primary: { stat: StatName; modifier: number };
  secondary: { stat: StatName; modifier: number };
  tertiary: { stat: StatName; modifier: number };
  bestFor: string;
  description: string;
}

// Filter and UI state types
export interface BuildFilters {
  class?: GuardianClass;
  subclass?: Subclass;
  searchText?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface SynergyAnalysis {
  score: number;        // 0-100
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

// Extra Abilities types
export interface AerialAbility {
  name: string;
  class: GuardianClass;
  element: Subclass;
  aspectRequired: string;
  description: string;
  activation: string;
  usage: string;
}

export interface PassiveAbility {
  name: string;
  class: GuardianClass;
  element: Subclass;
  aspectRequired: string;
  description: string;
  type: 'passive' | 'passive-interactive';
  effect: string;
  interaction?: string;
}

export interface TranscendenceAbility {
  name: string;
  class: GuardianClass;
  type: 'grenade' | 'melee';
  element: string;
  description: string;
  activation: string;
  cooldown: string;
  duration: string;
  buffs: string;
}
