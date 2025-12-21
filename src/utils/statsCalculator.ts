import type { Stats } from '../types';
import fragmentsData from '../data/fragments.json';

/**
 * Calculate the stat modifiers from selected fragments
 */
export function calculateFragmentModifiers(selectedFragments: string[]): Stats {
  const totalModifiers: Stats = {
    weapons: 0,
    health: 0,
    class: 0,
    melee: 0,
    grenade: 0,
    super: 0,
  };

  const selectedFragmentDetails = fragmentsData.filter(f => 
    selectedFragments.includes(f.name)
  );

  selectedFragmentDetails.forEach(fragment => {
    if (fragment.statModifiers) {
      Object.entries(fragment.statModifiers).forEach(([stat, value]) => {
        totalModifiers[stat as keyof Stats] += value;
      });
    }
  });

  return totalModifiers;
}

/**
 * Calculate final stats by combining base stats with fragment modifiers
 */
export function calculateFinalStats(baseStats: Stats, selectedFragments: string[]): Stats {
  const modifiers = calculateFragmentModifiers(selectedFragments);
  
  return {
    weapons: baseStats.weapons + modifiers.weapons,
    health: baseStats.health + modifiers.health,
    class: baseStats.class + modifiers.class,
    melee: baseStats.melee + modifiers.melee,
    grenade: baseStats.grenade + modifiers.grenade,
    super: baseStats.super + modifiers.super,
  };
}

/**
 * Get total gains and losses from fragment modifiers
 */
export function getFragmentStatSummary(selectedFragments: string[]) {
  const modifiers = calculateFragmentModifiers(selectedFragments);
  
  const gains = Object.values(modifiers).filter(v => v > 0).reduce((sum, v) => sum + v, 0);
  const losses = Object.values(modifiers).filter(v => v < 0).reduce((sum, v) => sum + v, 0);
  
  return { 
    gains, 
    losses: Math.abs(losses),
    modifiers 
  };
}
