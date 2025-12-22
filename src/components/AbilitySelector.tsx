/**
 * AbilitySelector Component - D2-Guardian-Forge
 * 
 * A clean selector interface that displays an empty icon placeholder.
 * Clicking opens a modal overlay with a grid of available options.
 */

import { useState } from 'react';
import Icon from './Icon';
import { getIconHash } from '../utils/iconUtils';
import type { IconCategory } from '../utils/iconUtils';

export interface AbilityOption {
  name: string;
  element?: string;
  description?: string;
  [key: string]: any;
}

export interface AbilitySelectorProps {
  label: string;
  iconCategory: IconCategory;
  selectedValue: string;
  options: AbilityOption[];
  onSelect: (value: string) => void;
  getSubclassColor: (element: string) => string;
}

export default function AbilitySelector({
  label,
  iconCategory,
  selectedValue,
  options,
  onSelect,
  getSubclassColor,
}: AbilitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.name === selectedValue);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect('');
  };

  return (
    <>
      {/* Empty Icon Selector Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsOpen(true)}
          className={`relative p-3 rounded-lg border-2 transition-colors ${
            selectedValue
              ? 'border-destiny-primary bg-destiny-primary/10'
              : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
          }`}
          title={`Select ${label}`}
        >
          {selectedValue && selectedOption ? (
            <>
              <Icon 
                hash={getIconHash(iconCategory, selectedOption.name)} 
                size={48} 
                alt={selectedOption.name} 
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
            <div className="w-12 h-12 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-600 text-xl">
                +
              </div>
            </div>
          )}
        </button>
        <span className="mt-2 text-xs text-gray-400 text-center">
          {label}
        </span>
        {selectedValue && (
          <span className="text-xs text-destiny-primary mt-1">✓</span>
        )}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-gray-900 rounded-lg border-2 border-gray-700 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                Select {label}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {options.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleSelect(option.name)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                    selectedValue === option.name
                      ? 'border-destiny-primary bg-destiny-primary/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  title={option.description}
                >
                  <Icon 
                    hash={getIconHash(iconCategory, option.name)} 
                    size={48} 
                    alt={option.name} 
                  />
                  <span className="mt-2 text-xs text-center text-white leading-tight">
                    {option.name.replace(' Grenade', '')}
                  </span>
                  {option.element && (
                    <span className={`mt-1 text-xs ${getSubclassColor(option.element)}`}>
                      {option.element}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Show selected option details */}
            {selectedOption && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="flex items-start gap-3">
                  <Icon 
                    hash={getIconHash(iconCategory, selectedOption.name)} 
                    size={48} 
                    alt={selectedOption.name} 
                    className="flex-shrink-0" 
                  />
                  <div>
                    <h4 className="font-bold text-white">{selectedOption.name}</h4>
                    {selectedOption.description && (
                      <p className="text-xs text-gray-400 mt-1">{selectedOption.description}</p>
                    )}
                    {selectedOption.effect && (
                      <p className="text-xs text-gray-300 mt-2">
                        <span className="text-destiny-primary">Effect:</span> {selectedOption.effect}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
