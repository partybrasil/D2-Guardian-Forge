/**
 * Token Modal - D2-Guardian-Forge
 * 
 * Modal for entering and validating GitHub Personal Access Token
 */

import { useState } from 'react';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (token: string) => Promise<boolean>;
}

export default function TokenModal({ isOpen, onClose, onSave }: TokenModalProps) {
  const [token, setToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!token.trim()) {
      setError('Please enter a token');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const isValid = await onSave(token.trim());
      if (isValid) {
        // Success - close modal and reset
        setToken('');
        setError(null);
        onClose();
      } else {
        setError('Invalid token. Please check your token and try again.');
      }
    } catch {
      setError('Failed to validate token. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    if (!isValidating) {
      setToken('');
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Enter GitHub Token</h2>
          <p className="text-sm text-gray-400 mt-1">
            Required for automated PR creation
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-900/30 border border-red-700 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Token Input */}
          <div className="mb-4">
            <label htmlFor="token-input" className="block text-sm font-medium text-gray-300 mb-2">
              Personal Access Token
            </label>
            <input
              id="token-input"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-destiny-primary transition-colors"
              disabled={isValidating}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isValidating) {
                  handleSave();
                }
              }}
            />
          </div>

          {/* Instructions */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-xs text-gray-400">
            <p className="font-semibold text-destiny-primary mb-2">How to create a token:</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Go to <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-destiny-primary underline">GitHub Token Settings</a></li>
              <li>Click "Generate new token (classic)"</li>
              <li>Give it a name (e.g., "D2-Guardian-Forge")</li>
              <li>Select scope: <code className="bg-gray-800 px-1 rounded">repo</code></li>
              <li>Click "Generate token" at the bottom</li>
              <li>Copy the token and paste it above</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 flex gap-3 justify-end">
          <button
            onClick={handleClose}
            disabled={isValidating}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isValidating || !token.trim()}
            className="px-4 py-2 bg-destiny-primary hover:bg-destiny-primary/80 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValidating ? 'Validating...' : 'Save Token'}
          </button>
        </div>
      </div>
    </div>
  );
}
