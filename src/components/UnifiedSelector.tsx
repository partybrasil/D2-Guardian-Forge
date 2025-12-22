/**
 * UnifiedSelector Component - D2-Guardian-Forge
 * 
 * A centered selector interface for Class, Subclass, and Super selections.
 * Displays currently selected item with an icon and opens a modal to change selection.
 */

import { useState, useEffect } from 'react';
import Icon from './Icon';
import { getIconHash } from '../utils/iconUtils';
import type { IconCategory } from '../utils/iconUtils';

export interface UnifiedOption {
  name: string;
  element?: string;
  description?: string;
  type?: string;
  class?: string;
  subclass?: string;
  [key: string]: any;
}

export interface UnifiedSelectorProps {
  label: string;
  iconCategory: IconCategory;
  selectedValue: string;
  options: UnifiedOption[];
  onSelect: (value: string) => void;
  getSubclassColor?: (element: string) => string;
  iconKey?: string; // Optional custom key for icon hash lookup
}

export default function UnifiedSelector({
  label,
  iconCategory,
  selectedValue,
  options,
  onSelect,
  getSubclassColor,
  iconKey,
}: UnifiedSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.name === selectedValue);

  const handleSelect = (value: string) => {
    onSelect(value);
    // Don't close the modal automatically - let user close via X or clicking outside
  };

  // Add keyboard support for Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Get the icon hash - use iconKey if provided
  const getOptionIconHash = (option: UnifiedOption) => {
    if (iconKey && option.iconKey) {
      // Use the iconKey property from the option if it exists
      return getIconHash(iconCategory, option.iconKey);
    } else if (iconKey) {
      // Fall back to using the iconKey parameter as a property name
      return getIconHash(iconCategory, option[iconKey] || option.name);
    }
    return getIconHash(iconCategory, option.name);
  };

  return (
    <>
      {/* Centered Selection Display */}
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
          {label}
        </label>
        <button
          onClick={() => setIsOpen(true)}
          className={`relative p-4 rounded-lg border-2 transition-colors ${
            selectedValue
              ? 'border-destiny-primary bg-destiny-primary/10'
              : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
          }`}
          title={`Select ${label}`}
        >
          {selectedValue && selectedOption ? (
            <div className="flex flex-col items-center gap-2">
              <Icon 
                hash={getOptionIconHash(selectedOption)} 
                size={64} 
                alt={selectedOption.name} 
              />
              <div className="text-center">
                <div className={`font-semibold ${
                  selectedOption.element && getSubclassColor 
                    ? getSubclassColor(selectedOption.element) 
                    : 'text-white'
                }`}>
                  {selectedOption.name}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-600 text-2xl">
                ?
              </div>
            </div>
          )}
        </button>
        {selectedValue && (
          <span className="text-xs text-destiny-primary mt-2">✓ Selected</span>
        )}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
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
                aria-label="Close modal"
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
                    hash={getOptionIconHash(option)} 
                    size={48} 
                    alt={option.name} 
                  />
                  <span className="mt-2 text-xs text-center text-white leading-tight">
                    {option.name}
                  </span>
                  {option.element && getSubclassColor && (
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
                    hash={getOptionIconHash(selectedOption)} 
                    size={48} 
                    alt={selectedOption.name} 
                    className="flex-shrink-0" 
                  />
                  <div>
                    <h4 className="font-bold text-white">{selectedOption.name}</h4>
                    {selectedOption.description && (
                      <p className="text-xs text-gray-400 mt-1">{selectedOption.description}</p>
                    )}
                    {selectedOption.type && (
                      <p className="text-xs text-gray-300 mt-2">
                        <span className="text-destiny-primary">Type:</span> {selectedOption.type}
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
