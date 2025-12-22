import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HamburgerMenuProps {
  onDownloadBackup?: () => void;
  onRestoreBackup?: () => void;
}

export default function HamburgerMenu({ onDownloadBackup, onRestoreBackup }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleDownloadBackup = () => {
    onDownloadBackup?.();
    closeMenu();
  };

  const handleRestoreBackup = () => {
    onRestoreBackup?.();
    closeMenu();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg border-2 border-gray-700 hover:border-destiny-primary transition-all duration-300 flex flex-col items-center justify-center gap-1.5 group"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          onClick={closeMenu}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`absolute top-16 right-0 w-72 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-2xl transition-all duration-300 overflow-hidden ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="p-2">
          {/* Navigation Links */}
          <Link
            to="/"
            onClick={closeMenu}
            className={`block px-4 py-3 rounded-lg text-white hover:bg-gray-700 transition-colors ${
              location.pathname === '/' ? 'bg-destiny-primary/20 border-l-4 border-destiny-primary' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>

          <Link
            to="/planner"
            onClick={closeMenu}
            className={`block px-4 py-3 rounded-lg text-white hover:bg-gray-700 transition-colors ${
              location.pathname === '/planner' ? 'bg-destiny-primary/20 border-l-4 border-destiny-primary' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">⚔️</span>
              <span className="font-medium">Build Planner</span>
            </div>
          </Link>

          {/* Divider */}
          <div className="my-2 border-t border-gray-700" />

          {/* Action Buttons */}
          <button
            onClick={handleDownloadBackup}
            className="w-full px-4 py-3 rounded-lg text-white hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📥</span>
              <span className="font-medium">Download Backup</span>
            </div>
          </button>

          <button
            onClick={handleRestoreBackup}
            className="w-full px-4 py-3 rounded-lg text-white hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📤</span>
              <span className="font-medium">Restore Backup</span>
            </div>
          </button>

          {/* Divider */}
          <div className="my-2 border-t border-gray-700" />

          {/* Create New Build */}
          <Link
            to="/planner"
            onClick={closeMenu}
            className="block px-4 py-3 rounded-lg bg-destiny-primary hover:bg-destiny-primary/80 text-white font-bold transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">➕</span>
              <span>Create New Build</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
