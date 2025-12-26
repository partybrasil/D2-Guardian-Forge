/**
 * Settings Page - D2-Guardian-Forge
 * 
 * Central hub for app configuration and customization
 */

import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure your Guardian Forge experience</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Icon Management */}
        <Link
          to="/settings/icons"
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-destiny-primary transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎨</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-destiny-primary transition-colors">
                Icon Editor
              </h2>
              <p className="text-gray-400 mb-3">
                Customize icons for classes, subclasses, abilities, aspects, and fragments
              </p>
              <div className="flex items-center gap-2 text-sm text-destiny-primary">
                <span>Manage icons</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* App Preferences (Placeholder for future features) */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 opacity-50">
          <div className="flex items-start gap-4">
            <div className="text-4xl">⚙️</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">
                App Preferences
              </h2>
              <p className="text-gray-400 mb-3">
                General app settings and preferences
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management (Placeholder) */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 opacity-50">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💾</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">
                Data Management
              </h2>
              <p className="text-gray-400 mb-3">
                Import/export settings and build data
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings (Placeholder) */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 opacity-50">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎯</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">
                Display Settings
              </h2>
              <p className="text-gray-400 mb-3">
                Theme, layout, and visual preferences
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3">About Settings</h3>
        <div className="text-gray-400 space-y-2">
          <p>
            <strong className="text-white">Icon Editor:</strong> Upload custom icons to replace placeholders.
            Changes are committed to a new branch and a PR is created for review.
          </p>
          <p>
            <strong className="text-white">Data Privacy:</strong> All settings are stored locally.
            No data is sent to external servers.
          </p>
        </div>
      </div>
    </div>
  );
}
