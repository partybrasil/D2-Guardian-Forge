/**
 * Icon Component - D2-Guardian-Forge
 * 
 * Displays Destiny 2 icons from the local cache with automatic fallback.
 * All icons are sourced from data.destinysets.com CDN and cached locally
 * for 100% offline-first functionality.
 */

import { useState } from 'react';

export interface IconProps {
  /** Icon hash from icons.json manifest */
  hash: number;
  /** Icon size in pixels (default: 40) */
  size?: number;
  /** Alt text for accessibility */
  alt?: string;
  /** Custom fallback icon path (default: /icons/default.png) */
  fallback?: string;
  /** Additional CSS classes */
  className?: string;
  /** Callback when icon fails to load */
  onError?: () => void;
}

/**
 * Icon component for displaying Destiny 2 game assets
 * 
 * @example
 * ```tsx
 * <Icon hash={3941232607} size={48} alt="Bastion Aspect" />
 * ```
 */
export default function Icon({ 
  hash, 
  size = 40, 
  alt = '', 
  fallback,
  className = '',
  onError
}: IconProps) {
  const [hasError, setHasError] = useState(false);
  
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasError) {
      setHasError(true);
      e.currentTarget.src = fallback || `${import.meta.env.BASE_URL}icons/default.png`;
      onError?.();
    }
  };
  
  // Construct the icon path (respects the basename for GitHub Pages and dev mode)
  const iconPath = `${import.meta.env.BASE_URL}icons/${hash}.png`;
  
  return (
    <img
      src={iconPath}
      alt={alt}
      width={size}
      height={size}
      className={`icon ${className}`}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
}

/**
 * IconGrid - Display multiple icons in a grid layout
 */
export interface IconGridProps {
  icons: Array<{ hash: number; label?: string; onClick?: () => void }>;
  size?: number;
  columns?: number;
  gap?: number;
}

export function IconGrid({ icons, size = 40, columns = 4, gap = 8 }: IconGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {icons.map((icon, index) => (
        <div
          key={`${icon.hash}-${index}`}
          className="flex flex-col items-center gap-2"
          onClick={icon.onClick}
          style={{ cursor: icon.onClick ? 'pointer' : 'default' }}
        >
          <Icon hash={icon.hash} size={size} alt={icon.label || ''} />
          {icon.label && (
            <span className="text-xs text-gray-400 text-center">{icon.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
