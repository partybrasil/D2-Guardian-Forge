/**
 * Icon Editor - D2-Guardian-Forge
 * 
 * Interface for uploading and replacing icon images
 */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { ICONS, type IconCategory } from '../utils/iconUtils';
import { 
  downloadIconChanges, 
  generatePRDescription, 
  generateCommitMessage 
} from '../utils/iconManager';

interface IconChange {
  category: string;
  name: string;
  oldPath: string;
  newFile: File;
  previewUrl: string;
}

export default function IconEditor() {
  const [selectedCategory, setSelectedCategory] = useState<string>('classes');
  const [iconChanges, setIconChanges] = useState<IconChange[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Get all categories except 'default'
  const categories = Object.keys(ICONS).filter(cat => cat !== 'default');
  
  // Get items for selected category
  const categoryItems = selectedCategory && ICONS[selectedCategory as IconCategory]
    ? Object.entries(ICONS[selectedCategory as IconCategory] as Record<string, number>)
    : [];

  const handleFileSelect = (category: string, name: string, oldPath: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('File size must be less than 2MB');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    // Check if this icon already has a pending change
    const existingIndex = iconChanges.findIndex(
      change => change.category === category && change.name === name
    );

    if (existingIndex >= 0) {
      // Update existing change
      const newChanges = [...iconChanges];
      // Revoke old preview URL
      URL.revokeObjectURL(newChanges[existingIndex].previewUrl);
      newChanges[existingIndex] = { category, name, oldPath, newFile: file, previewUrl };
      setIconChanges(newChanges);
    } else {
      // Add new change
      setIconChanges([...iconChanges, { category, name, oldPath, newFile: file, previewUrl }]);
    }

    setErrorMessage(null);
  };

  const removeChange = (category: string, name: string) => {
    const change = iconChanges.find(c => c.category === category && c.name === name);
    if (change) {
      URL.revokeObjectURL(change.previewUrl);
    }
    setIconChanges(iconChanges.filter(c => !(c.category === category && c.name === name)));
  };

  const hasChange = (category: string, name: string) => {
    return iconChanges.some(c => c.category === category && c.name === name);
  };

  const getPreviewUrl = (category: string, name: string) => {
    const change = iconChanges.find(c => c.category === category && c.name === name);
    return change?.previewUrl;
  };

  const handleSaveChanges = async () => {
    if (iconChanges.length === 0) {
      setErrorMessage('No changes to save');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Generate PR information
      const prDescription = generatePRDescription(iconChanges);
      const commitMessage = generateCommitMessage(iconChanges);
      
      // Download changes as JSON file for manual processing
      await downloadIconChanges(iconChanges);
      
      // Show instructions
      setSuccessMessage(
        `Downloaded icon changes file! Next steps:\n` +
        `1. The JSON file contains ${iconChanges.length} icon change(s)\n` +
        `2. To apply changes, run: node scripts/update-icons.js <downloaded-file>\n` +
        `3. The script will create a new branch and commit the changes\n` +
        `4. Create a PR on GitHub with the generated description\n\n` +
        `Alternatively, manually replace icons in public/icons/{category}/ folders.`
      );
      
      // Store PR description in console for easy access
      console.log('=== PR Description ===');
      console.log(prDescription);
      console.log('\n=== Commit Message ===');
      console.log(commitMessage);
      
      // Don't clear changes immediately - let user review
      
    } catch (error) {
      console.error('Error saving icon changes:', error);
      setErrorMessage(
        'Unable to download changes. Please try again or manually replace icons in the public/icons folder.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      iconChanges.forEach(change => URL.revokeObjectURL(change.previewUrl));
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/settings"
          className="text-destiny-primary hover:text-destiny-primary/80 mb-4 inline-block"
        >
          ← Back to Settings
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Icon Editor</h1>
        <p className="text-gray-400">
          Upload custom icons to replace placeholders. Changes will create a PR for review.
        </p>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-900/30 border border-green-700 rounded-lg p-4">
          <p className="text-green-400">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 bg-red-900/30 border border-red-700 rounded-lg p-4">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}

      {/* Pending Changes Summary */}
      {iconChanges.length > 0 && (
        <div className="mb-6 bg-destiny-primary/10 border border-destiny-primary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                {iconChanges.length} Pending Change{iconChanges.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-gray-400">
                Click "Save Changes" to create a PR with these icons
              </p>
            </div>
            <button
              onClick={() => {
                iconChanges.forEach(change => URL.revokeObjectURL(change.previewUrl));
                setIconChanges([]);
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Category Selector */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Select Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-destiny-primary text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category}
              {iconChanges.filter(c => c.category === category).length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white text-black rounded-full text-xs">
                  {iconChanges.filter(c => c.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Icon List */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {selectedCategory} Icons ({categoryItems.length})
        </h2>
        
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {categoryItems.map(([name]) => {
            const iconPath = `icons/${selectedCategory}/${name}.png`;
            const hasChangeFlag = hasChange(selectedCategory, name);
            const previewUrl = getPreviewUrl(selectedCategory, name);

            return (
              <div
                key={`${selectedCategory}-${name}`}
                className={`flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg ${
                  hasChangeFlag ? 'border-2 border-destiny-primary' : 'border border-gray-700'
                }`}
              >
                {/* Current Icon */}
                <div className="flex-shrink-0">
                  <div className="text-xs text-gray-400 mb-1">Current</div>
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                    <Icon category={selectedCategory} name={name} size={48} alt={name} />
                  </div>
                </div>

                {/* Arrow */}
                {hasChangeFlag && (
                  <>
                    <div className="flex-shrink-0 text-2xl text-destiny-primary">→</div>
                    
                    {/* New Icon Preview */}
                    <div className="flex-shrink-0">
                      <div className="text-xs text-gray-400 mb-1">New</div>
                      <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-destiny-primary">
                        <img
                          src={previewUrl}
                          alt={`New ${name}`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium mb-1 truncate">{name}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {iconPath}
                  </p>
                  {hasChangeFlag && (
                    <p className="text-xs text-destiny-primary mt-1">
                      Ready to upload
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex gap-2">
                  <input
                    ref={el => {
                      fileInputRefs.current[`${selectedCategory}-${name}`] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(selectedCategory, name, iconPath, e)}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRefs.current[`${selectedCategory}-${name}`]?.click()}
                    className="px-4 py-2 bg-destiny-primary hover:bg-destiny-primary/80 text-black font-medium rounded-lg transition-colors"
                  >
                    {hasChangeFlag ? 'Change' : 'Upload'}
                  </button>
                  {hasChangeFlag && (
                    <button
                      onClick={() => removeChange(selectedCategory, name)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      {iconChanges.length > 0 && (
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={handleSaveChanges}
            disabled={isProcessing}
            className="px-8 py-4 bg-destiny-primary hover:bg-destiny-primary/80 text-black font-bold text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Creating PR...' : `Save Changes (${iconChanges.length})`}
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3">How to Update Icons</h3>
        <div className="text-gray-400 space-y-2 text-sm">
          <p><strong className="text-white">Step 1:</strong> Select a category from the buttons above</p>
          <p><strong className="text-white">Step 2:</strong> Click "Upload" next to any icon you want to replace</p>
          <p><strong className="text-white">Step 3:</strong> Select a new image file (PNG recommended, max 2MB)</p>
          <p><strong className="text-white">Step 4:</strong> Review your changes (icons with pending changes are highlighted)</p>
          <p><strong className="text-white">Step 5:</strong> Click "Save Changes" to download the changes package</p>
          
          <div className="mt-4 p-4 bg-destiny-primary/10 border border-destiny-primary rounded-lg">
            <p className="text-destiny-primary font-semibold mb-2">After Downloading Changes:</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>A JSON file with your icon changes will be downloaded</li>
              <li>Run: <code className="bg-gray-900 px-2 py-0.5 rounded">node scripts/update-icons.js &lt;downloaded-file&gt;</code></li>
              <li>The script will create a new branch and commit your changes</li>
              <li>Create a Pull Request on GitHub for review</li>
            </ol>
          </div>
          
          <div className="mt-4 p-4 bg-gray-900/50 border border-gray-600 rounded-lg">
            <p className="text-gray-300 font-semibold mb-2">Manual Alternative:</p>
            <p>Place your new icons directly in <code className="bg-gray-900 px-1 rounded">public/icons/{`{category}/{name}.png`}</code></p>
            <p className="text-xs text-gray-500 mt-1">This bypasses the download step but requires direct repository access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
