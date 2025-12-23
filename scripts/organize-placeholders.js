#!/usr/bin/env node
/**
 * Organize Placeholder Icons
 * 
 * This script creates an organized folder structure with named placeholder icons
 * by copying existing geometric placeholder PNGs to categorized subdirectories.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(PROJECT_ROOT, 'public', 'icons');
const DATA_DIR = path.join(PROJECT_ROOT, 'src', 'data');

// Load JSON data
function loadJSON(filename) {
  const filepath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

// Load icons manifest
const iconsManifest = loadJSON('icons.json');

// Create directory if it doesn't exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
}

// Copy icon with fallback
function copyIcon(srcHash, destPath) {
  const srcPath = path.join(ICONS_DIR, `${srcHash}.png`);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    return true;
  } else {
    console.warn(`⚠️  Source not found: ${srcHash}.png`);
    return false;
  }
}

// Get default icon path
function getDefaultIcon() {
  const defaultHash = iconsManifest.default || 1458010785;
  return path.join(ICONS_DIR, `${defaultHash}.png`);
}

console.log('🎨 D2-Guardian-Forge Placeholder Icon Organizer\n');

// 1. Classes
console.log('📦 Organizing Classes...');
const classesDir = path.join(ICONS_DIR, 'classes');
ensureDir(classesDir);
for (const [className, hash] of Object.entries(iconsManifest.classes)) {
  const destPath = path.join(classesDir, `${className}.png`);
  if (copyIcon(hash, destPath)) {
    console.log(`  ✅ ${className}.png`);
  }
}

// 2. Subclasses
console.log('\n📦 Organizing Subclasses...');
const subclassesDir = path.join(ICONS_DIR, 'subclasses');
ensureDir(subclassesDir);
for (const [subclassKey, hash] of Object.entries(iconsManifest.subclasses)) {
  const destPath = path.join(subclassesDir, `${subclassKey}.png`);
  if (copyIcon(hash, destPath)) {
    console.log(`  ✅ ${subclassKey}.png`);
  }
}

// 3. Supers
console.log('\n📦 Organizing Supers...');
const supersDir = path.join(ICONS_DIR, 'supers');
ensureDir(supersDir);
const supers = loadJSON('supers.json');
const superHashes = iconsManifest.supers || {};
supers.forEach((super_, index) => {
  const hash = superHashes[index] || superHashes[super_.name];
  const destPath = path.join(supersDir, `${super_.name}.png`);
  if (hash && copyIcon(hash, destPath)) {
    console.log(`  ✅ ${super_.name}.png`);
  } else {
    // Use a default placeholder
    const defaultPath = getDefaultIcon();
    if (fs.existsSync(defaultPath)) {
      fs.copyFileSync(defaultPath, destPath);
      console.log(`  📋 ${super_.name}.png (using default)`);
    }
  }
});

// 4. Grenades
console.log('\n📦 Organizing Grenades...');
const grenadesDir = path.join(ICONS_DIR, 'grenades');
ensureDir(grenadesDir);
const grenades = loadJSON('grenades.json');
const grenadeHashes = iconsManifest.grenades || {};
grenades.forEach((grenade, index) => {
  const hash = grenadeHashes[index] || grenadeHashes[grenade.name];
  const destPath = path.join(grenadesDir, `${grenade.name}.png`);
  if (hash && copyIcon(hash, destPath)) {
    console.log(`  ✅ ${grenade.name}.png`);
  } else {
    const defaultPath = getDefaultIcon();
    if (fs.existsSync(defaultPath)) {
      fs.copyFileSync(defaultPath, destPath);
      console.log(`  📋 ${grenade.name}.png (using default)`);
    }
  }
});

// 5. Melees
console.log('\n📦 Organizing Melees...');
const meleesDir = path.join(ICONS_DIR, 'melees');
ensureDir(meleesDir);
const melees = loadJSON('melees.json');
const meleeHashes = iconsManifest.melees || {};
melees.forEach((melee, index) => {
  const hash = meleeHashes[index] || meleeHashes[melee.name];
  const destPath = path.join(meleesDir, `${melee.name}.png`);
  if (hash && copyIcon(hash, destPath)) {
    console.log(`  ✅ ${melee.name}.png`);
  } else {
    const defaultPath = getDefaultIcon();
    if (fs.existsSync(defaultPath)) {
      fs.copyFileSync(defaultPath, destPath);
      console.log(`  📋 ${melee.name}.png (using default)`);
    }
  }
});

// 6. Class Abilities
console.log('\n📦 Organizing Class Abilities...');
const classAbilitiesDir = path.join(ICONS_DIR, 'classAbilities');
ensureDir(classAbilitiesDir);
const classAbilities = loadJSON('classAbilities.json');
const classAbilityHashes = iconsManifest.classAbilities || {};
classAbilities.forEach((ability, index) => {
  const hash = classAbilityHashes[index] || classAbilityHashes[ability.name];
  const destPath = path.join(classAbilitiesDir, `${ability.name}.png`);
  if (hash && copyIcon(hash, destPath)) {
    console.log(`  ✅ ${ability.name}.png`);
  } else {
    const defaultPath = getDefaultIcon();
    if (fs.existsSync(defaultPath)) {
      fs.copyFileSync(defaultPath, destPath);
      console.log(`  📋 ${ability.name}.png (using default)`);
    }
  }
});

// 7. Aspects
console.log('\n📦 Organizing Aspects...');
const aspectsDir = path.join(ICONS_DIR, 'aspects');
ensureDir(aspectsDir);
for (const [aspectName, hash] of Object.entries(iconsManifest.aspects)) {
  const destPath = path.join(aspectsDir, `${aspectName}.png`);
  if (copyIcon(hash, destPath)) {
    console.log(`  ✅ ${aspectName}.png`);
  }
}

// 8. Fragments
console.log('\n📦 Organizing Fragments...');
const fragmentsDir = path.join(ICONS_DIR, 'fragments');
ensureDir(fragmentsDir);
for (const [fragmentName, hash] of Object.entries(iconsManifest.fragments)) {
  const destPath = path.join(fragmentsDir, `${fragmentName}.png`);
  if (copyIcon(hash, destPath)) {
    console.log(`  ✅ ${fragmentName}.png`);
  }
}

// 9. Exotics (if available)
if (iconsManifest.exotics) {
  console.log('\n📦 Organizing Exotics...');
  const exoticsDir = path.join(ICONS_DIR, 'exotics');
  ensureDir(exoticsDir);
  for (const [exoticName, hash] of Object.entries(iconsManifest.exotics)) {
    const destPath = path.join(exoticsDir, `${exoticName}.png`);
    if (copyIcon(hash, destPath)) {
      console.log(`  ✅ ${exoticName}.png`);
    }
  }
}

// 10. Weapons (if available)
if (iconsManifest.weapons) {
  console.log('\n📦 Organizing Weapons...');
  const weaponsDir = path.join(ICONS_DIR, 'weapons');
  ensureDir(weaponsDir);
  for (const [weaponName, hash] of Object.entries(iconsManifest.weapons)) {
    const destPath = path.join(weaponsDir, `${weaponName}.png`);
    if (copyIcon(hash, destPath)) {
      console.log(`  ✅ ${weaponName}.png`);
    }
  }
}

// 11. Mods (if available)
if (iconsManifest.mods) {
  console.log('\n📦 Organizing Mods...');
  const modsDir = path.join(ICONS_DIR, 'mods');
  ensureDir(modsDir);
  for (const [modName, hash] of Object.entries(iconsManifest.mods)) {
    const destPath = path.join(modsDir, `${modName}.png`);
    if (copyIcon(hash, destPath)) {
      console.log(`  ✅ ${modName}.png`);
    }
  }
}

// Create a default.png in root if it doesn't exist
const defaultPath = path.join(ICONS_DIR, 'default.png');
if (!fs.existsSync(defaultPath)) {
  const defaultHash = iconsManifest.default || 1458010785;
  const srcPath = path.join(ICONS_DIR, `${defaultHash}.png`);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, defaultPath);
    console.log('\n✅ Created default.png fallback');
  }
}

console.log('\n✨ Placeholder organization complete!');
console.log('📂 Organized icons are now in categorized subdirectories');
console.log('📝 You can now replace placeholders with real images one by one');
