/**
 * AspectSelector Component - D2-Guardian-Forge
 * 
 * A specialized selector for aspects with support for exactly 2 slots.
 * Each slot displays an empty icon placeholder that opens a modal when clicked.
 */

import { useState } from 'react';
import Icon from './Icon';
import { getIconHash } from '../utils/iconUtils';

export interface AspectData {
  name: string;
  subclass: string;
  class?: string;
  description: string;
  fragmentSlots: number;
}

export interface AspectSelectorProps {
  slotIndex: number;
  selectedAspects: string[];
  availableAspects: AspectData[];
  onToggle: (aspectName: string) => void;
  getSubclassColor: (element: string) => string;
}

export default function AspectSelector({
  slotIndex,
  selectedAspects,
  availableAspects,
  onToggle,
  getSubclassColor,
}: AspectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedAspectName = selectedAspects[slotIndex];
  const selectedAspect = availableAspects.find(a => a.name === selectedAspectName);

  const handleSelect = (aspectName: string) => {
    onToggle(aspectName);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAspectName) {
      onToggle(selectedAspectName);
    }
  };

  return (
    <>
      {/* Empty Icon Selector Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsOpen(true)}
          className={`relative p-3 rounded-lg border-2 transition-colors ${
            selectedAspectName
              ? 'border-destiny-primary bg-destiny-primary/10'
              : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
          }`}
          title={`Select Aspect ${slotIndex + 1}`}
        >
          {selectedAspectName && selectedAspect ? (
            <>
              <Icon 
                hash={getIconHash('aspects', selectedAspect.name)} 
                size={56} 
                alt={selectedAspect.name} 
              />
              {/* Clear button */}
              <button
                onClick={handleClear}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs flex items-center justify-center"
                title="Clear selection"
              >
                ×
              </button>
            </>
          ) : (
            <div className="w-14 h-14 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-600 text-2xl">
                +
              </div>
            </div>
          )}
        </button>
        <span className="mt-2 text-xs text-gray-400 text-center">
          Aspect {slotIndex + 1}
        </span>
        {selectedAspectName && selectedAspect && (
          <>
            <span className="text-xs text-destiny-primary mt-1">✓</span>
            <span className="text-xs text-gray-500 mt-1">
              {selectedAspect.fragmentSlots} slots
            </span>
          </>
        )}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-gray-900 rounded-lg border-2 border-gray-700 p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                Select Aspect {slotIndex + 1}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Select up to 2 aspects to customize your subclass
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableAspects.map((aspect) => {
                const isSelected = selectedAspects.includes(aspect.name);
                const isOtherSlotSelected = selectedAspects.includes(aspect.name) && 
                  selectedAspects[slotIndex] !== aspect.name;
                const canSelect = !isOtherSlotSelected;

                return (
                  <button
                    key={aspect.name}
                    onClick={() => canSelect && handleSelect(aspect.name)}
                    disabled={!canSelect}
                    className={`p-3 rounded border-2 text-left transition-colors ${
                      isSelected
                        ? 'border-destiny-primary bg-destiny-primary/10'
                        : canSelect
                        ? 'border-gray-600 hover:border-gray-500'
                        : 'border-gray-700 bg-gray-800/30 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Icon 
                        hash={getIconHash('aspects', aspect.name)} 
                        size={48} 
                        alt={aspect.name} 
                        className="flex-shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white">{aspect.name}</div>
                        <div className="flex gap-1 mt-1">
                          <span className={`text-xs px-1.5 py-0.5 rounded ${getSubclassColor(aspect.subclass)} bg-gray-800/80`}>
                            {aspect.subclass}
                          </span>
                          {aspect.class && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">
                              {aspect.class}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded flex-shrink-0">
                        {aspect.fragmentSlots} {aspect.fragmentSlots === 1 ? 'slot' : 'slots'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{aspect.description}</div>
                    {isOtherSlotSelected && (
                      <div className="mt-2 text-xs text-yellow-400">
                        Already equipped in other slot
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Show currently selected aspects summary */}
            {selectedAspects.length > 0 && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="text-sm font-semibold text-gray-300 mb-2">Currently Equipped:</div>
                <div className="space-y-2">
                  {selectedAspects.map((aspectName, idx) => {
                    const aspect = availableAspects.find(a => a.name === aspectName);
                    if (!aspect) return null;
                    return (
                      <div key={aspectName} className="text-xs">
                        <span className="text-gray-500">Slot {idx + 1}:</span>
                        <span className="text-destiny-primary font-semibold ml-2">{aspect.name}</span>
                        <span className="text-gray-500 ml-2">({aspect.fragmentSlots} fragment {aspect.fragmentSlots === 1 ? 'slot' : 'slots'})</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Total Fragment Slots: {selectedAspects.reduce((sum, name) => {
                    const aspect = availableAspects.find(a => a.name === name);
                    return sum + (aspect?.fragmentSlots || 0);
                  }, 0)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
