/**
 * AutoSelectAbility Component - D2-Guardian-Forge
 * 
 * A non-interactive display component that shows abilities automatically
 * selected based on equipped aspects. Cannot be clicked or manually changed.
 */

import { useState } from 'react';
import Icon from './Icon';
import { getIconHash } from '../utils/iconUtils';
import type { IconCategory } from '../utils/iconUtils';

export interface AutoSelectAbilityProps {
  label: string;
  iconCategory: IconCategory;
  selectedValue: string;
  selectedDetails?: {
    description?: string;
    activation?: string;
    usage?: string;
    effect?: string;
    type?: string;
    interaction?: string;
    element?: string;
    aspectRequired?: string;
    cooldown?: string;
    duration?: string;
    buffs?: string;
  };
  getSubclassColor?: (element: string) => string;
  isEmpty?: boolean; // If true, shows empty state even if selectedValue exists
}

export default function AutoSelectAbility({
  label,
  iconCategory,
  selectedValue,
  selectedDetails,
  getSubclassColor,
  isEmpty = false,
}: AutoSelectAbilityProps) {
  const [showDetails, setShowDetails] = useState(false);

  const displayEmpty = isEmpty || !selectedValue;

  return (
    <>
      {/* Non-Interactive Display */}
      <div className="flex flex-col items-center">
        <div
          className={`relative p-3 rounded-lg border-2 ${
            displayEmpty
              ? 'border-gray-700 bg-gray-800/20 cursor-not-allowed'
              : 'border-destiny-primary/50 bg-destiny-primary/5 cursor-pointer hover:border-destiny-primary'
          }`}
          onClick={() => !displayEmpty && setShowDetails(true)}
          title={displayEmpty ? 'Auto-selected by aspects' : `View ${label} details`}
        >
          {displayEmpty ? (
            <div className="w-12 h-12 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-700 text-sm">
                ?
              </div>
            </div>
          ) : (
            <>
              <Icon 
                hash={getIconHash(iconCategory, selectedValue)} 
                size={48} 
                alt={selectedValue} 
              />
              {/* Auto-selected indicator */}
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destiny-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </>
          )}
        </div>
        <span className="mt-2 text-xs text-gray-400 text-center">
          {label}
        </span>
        {!displayEmpty && (
          <span className="text-xs text-destiny-primary/70 mt-0.5 italic">Auto</span>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedDetails && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-gray-900 rounded-lg border-2 border-destiny-primary/50 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <Icon 
                  hash={getIconHash(iconCategory, selectedValue)} 
                  size={64} 
                  alt={selectedValue}
                  className="flex-shrink-0"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {selectedValue}
                  </h3>
                  {selectedDetails.element && getSubclassColor && (
                    <span className={`text-sm ${getSubclassColor(selectedDetails.element)}`}>
                      {selectedDetails.element}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none ml-4"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {selectedDetails.aspectRequired && (
              <div className="mb-3 p-3 rounded-lg bg-destiny-primary/10 border border-destiny-primary/30">
                <div className="text-xs text-destiny-primary font-semibold">
                  AUTO-SELECTED BY ASPECT
                </div>
                <div className="text-sm text-white mt-1">
                  {selectedDetails.aspectRequired}
                </div>
              </div>
            )}

            {selectedDetails.description && (
              <div className="mb-4">
                <p className="text-sm text-gray-300">{selectedDetails.description}</p>
              </div>
            )}

            {selectedDetails.effect && (
              <div className="mb-3">
                <div className="text-xs text-destiny-primary font-semibold mb-1">EFFECT</div>
                <p className="text-sm text-gray-300">{selectedDetails.effect}</p>
              </div>
            )}

            {selectedDetails.activation && (
              <div className="mb-3">
                <div className="text-xs text-destiny-primary font-semibold mb-1">ACTIVATION</div>
                <p className="text-sm text-gray-300">{selectedDetails.activation}</p>
              </div>
            )}

            {selectedDetails.usage && (
              <div className="mb-3">
                <div className="text-xs text-destiny-primary font-semibold mb-1">USAGE TIPS</div>
                <p className="text-sm text-gray-300">{selectedDetails.usage}</p>
              </div>
            )}

            {selectedDetails.interaction && (
              <div className="mb-3 p-3 rounded-lg bg-yellow-900/20 border border-yellow-600/30">
                <div className="text-xs text-yellow-400 font-semibold mb-1">
                  ⚠️ REQUIRES INTERACTION
                </div>
                <p className="text-sm text-gray-300">{selectedDetails.interaction}</p>
              </div>
            )}

            {selectedDetails.cooldown && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 font-semibold mb-1">COOLDOWN</div>
                <p className="text-sm text-gray-400">{selectedDetails.cooldown}</p>
              </div>
            )}

            {selectedDetails.duration && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 font-semibold mb-1">DURATION</div>
                <p className="text-sm text-gray-400">{selectedDetails.duration}</p>
              </div>
            )}

            {selectedDetails.buffs && (
              <div className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-600/30">
                <div className="text-xs text-green-400 font-semibold mb-1">
                  ⚡ TRANSCENDENCE BUFFS
                </div>
                <p className="text-sm text-gray-300">{selectedDetails.buffs}</p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowDetails(false)}
                className="w-full btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
