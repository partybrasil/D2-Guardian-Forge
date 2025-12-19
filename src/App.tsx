import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import BuildPlanner from './pages/BuildPlanner';
import { getAllIconHashes } from './utils/iconUtils';
import './App.css';

function App() {
  // Preload critical icons on app mount
  useEffect(() => {
    const preloadIcons = () => {
      // Get all icon hashes from manifest
      const iconHashes = getAllIconHashes();
      
      // Preload only the most critical icons (first 50) to avoid overwhelming the browser
      const criticalIcons = iconHashes.slice(0, 50);
      
      criticalIcons.forEach((hash) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `/D2-Guardian-Forge/icons/${hash}.png`;
        document.head.appendChild(link);
      });
    };
    
    // Delay preload slightly to not block initial render
    const timeoutId = setTimeout(preloadIcons, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Router basename="/D2-Guardian-Forge">
      <div className="min-h-screen bg-destiny-bg">
        {/* Navigation */}
        <nav className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-destiny-primary">
                  D2 Guardian Forge
                </h1>
                <span className="ml-3 text-sm text-gray-400">v1.0.0 - Edge of Fate</span>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-destiny-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/planner"
                  className="text-gray-300 hover:text-destiny-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Build Planner
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<BuildPlanner />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-400 text-sm">
              <p>D2-Guardian-Forge - Your builds, your privacy, your control</p>
              <p className="mt-1">100% Local • No APIs • No Data Collection</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

