/**
 * Icon Utilities - D2-Guardian-Forge
 * 
 * Provides easy access to organized icon paths and legacy hash support
 */

import iconsData from '../data/icons.json';

export type IconCategory = 
  | 'classes'
  | 'subclasses'
  | 'aspects'
  | 'fragments'
  | 'grenades'
  | 'melees'
  | 'classAbilities'
  | 'supers'
  | 'exotics'
  | 'weapons'
  | 'mods';

/**
 * Get icon properties for organized folder structure
 * 
 * @param category - The category of the icon (e.g., 'aspects', 'fragments')
 * @param name - The name of the item (e.g., 'Bastion', 'Echo of Vigilance')
 * @returns Object with category and name for the Icon component
 * 
 * @example
 * ```ts
 * const iconProps = getIconProps('aspects', 'Bastion');
 * // Use with: <Icon {...iconProps} size={48} alt="Bastion" />
 * ```
 */
export function getIconProps(category: IconCategory, name: string): { category: string; name: string } {
  return { category, name };
}

/**
 * Get icon hash for a specific item by name and category (Legacy support)
 * 
 * @param category - The category of the icon (e.g., 'aspects', 'fragments')
 * @param name - The name of the item (e.g., 'Bastion', 'Echo of Vigilance')
 * @returns The icon hash number, or the default hash if not found
 * 
 * @deprecated Use getIconProps() instead for better placeholder support
 * 
 * @example
 * ```ts
 * const bastionHash = getIconHash('aspects', 'Bastion'); // Returns 3941232607
 * ```
 */
export function getIconHash(category: IconCategory, name: string): number {
  const categoryData = iconsData[category] as Record<string, number>;
  
  if (!categoryData) {
    console.warn(`Icon category '${category}' not found in manifest`);
    return iconsData.default;
  }
  
  const hash = categoryData[name];
  
  if (hash === undefined) {
    console.warn(`Icon '${name}' not found in category '${category}'`);
    return iconsData.default;
  }
  
  return hash;
}

/**
 * Get all icon hashes for a specific category
 * 
 * @param category - The category to retrieve
 * @returns Object mapping names to hashes
 */
export function getIconsByCategory(category: IconCategory): Record<string, number> {
  return iconsData[category] as Record<string, number>;
}

/**
 * Check if an icon exists in the manifest
 * 
 * @param category - The category of the icon
 * @param name - The name of the item
 * @returns True if the icon exists
 */
export function hasIcon(category: IconCategory, name: string): boolean {
  const categoryData = iconsData[category] as Record<string, number>;
  return categoryData && categoryData[name] !== undefined;
}

/**
 * Get the default fallback icon hash
 */
export function getDefaultIconHash(): number {
  return iconsData.default;
}

/**
 * Get all unique icon hashes from the manifest
 */
export function getAllIconHashes(): number[] {
  const hashes = new Set<number>();
  
  Object.keys(iconsData).forEach(category => {
    if (category === 'default') return;
    
    const categoryData = iconsData[category as IconCategory] as Record<string, number>;
    Object.values(categoryData).forEach(hash => {
      if (typeof hash === 'number') {
        hashes.add(hash);
      }
    });
  });
  
  return Array.from(hashes).sort((a, b) => a - b);
}

// Export the raw icons data for direct access if needed
export const ICONS = iconsData;
