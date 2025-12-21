import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Build, GuardianClass, Subclass } from '../types';
import localforage from 'localforage';
import { calculateFinalStats, getFragmentStatSummary } from '../utils/statsCalculator';
import { downloadBuildsBackup, restoreBuildsFromBackup } from '../utils/backupManager';
import Icon from '../components/Icon';
import { getIconHash } from '../utils/iconUtils';

// Constants
const FRAGMENT_PREVIEW_LIMIT = 6;

export default function Dashboard() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [filterClass, setFilterClass] = useState<GuardianClass | ''>('');
  const [filterSubclass, setFilterSubclass] = useState<Subclass | ''>('');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBuilds();
  }, []);

  const loadBuilds = async () => {
    try {
      const keys = await localforage.keys();
      const buildKeys = keys.filter(key => key.startsWith('build_'));
      const loadedBuilds: Build[] = [];
      
      for (const key of buildKeys) {
        const build = await localforage.getItem<Build>(key);
        if (build) {
          loadedBuilds.push(build);
        }
      }
      
      setBuilds(loadedBuilds);
    } catch (error) {
      console.error('Error loading builds:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBuild = async (id: string) => {
    if (confirm('Are you sure you want to delete this build?')) {
      try {
        await localforage.removeItem(`build_${id}`);
        setBuilds(builds.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error deleting build:', error);
      }
    }
  };

  const handleBackupDownload = async () => {
    await downloadBuildsBackup();
  };

  const handleBackupRestore = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await restoreBuildsFromBackup(file);
      
      if (result.success > 0 || result.skipped > 0) {
        alert(
          `Backup restore completed!\n\n` +
          `✓ Successfully imported: ${result.success}\n` +
          `⊘ Skipped: ${result.skipped}\n` +
          `✗ Failed: ${result.failed}`
        );
        
        // Reload builds
        await loadBuilds();
      } else {
        alert(`No builds were imported. ${result.failed} failed.`);
      }
    } catch (error) {
      console.error('Error restoring backup:', error);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredBuilds = builds.filter(build => {
    if (filterClass && build.class !== filterClass) return false;
    if (filterSubclass && build.subclass !== filterSubclass) return false;
    return true;
  });

  const getSubclassColor = (subclass: Subclass) => {
    const colors = {
      Solar: 'text-destiny-solar',
      Arc: 'text-destiny-arc',
      Void: 'text-destiny-void',
      Stasis: 'text-destiny-stasis',
      Strand: 'text-destiny-strand',
      Prismatic: 'text-destiny-prismatic',
    };
    return colors[subclass];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading builds...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Builds</h1>
          <p className="text-gray-400">
            {filteredBuilds.length} {filteredBuilds.length === 1 ? 'build' : 'builds'} found
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleBackupDownload}
            className="btn-secondary"
            title="Download backup of all builds"
          >
            📥 Download Backup
          </button>
          <button
            onClick={handleBackupRestore}
            className="btn-secondary"
            title="Restore builds from backup file"
          >
            📤 Restore Backup
          </button>
          <Link
            to="/planner"
            className="btn-primary"
          >
            + Create New Build
          </Link>
        </div>
      </div>

      {/* Hidden file input for backup restore */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Filters */}
      <div className="card mb-6">
        <div className="space-y-4">
          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Filter by Class
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setFilterClass('')}
                className={`px-4 py-2 rounded border-2 transition-colors ${
                  filterClass === ''
                    ? 'border-destiny-primary bg-destiny-primary/10 text-white'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                All Classes
              </button>
              {(['Warlock', 'Titan', 'Hunter'] as GuardianClass[]).map((className) => (
                <button
                  key={className}
                  onClick={() => setFilterClass(className)}
                  className={`flex items-center gap-2 px-3 py-2 rounded border-2 transition-colors ${
                    filterClass === className
                      ? 'border-destiny-primary bg-destiny-primary/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <Icon hash={getIconHash('classes', className)} size={24} alt={className} />
                  <span className="text-white font-medium">{className}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subclass Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Filter by Subclass
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterSubclass('')}
                className={`px-4 py-2 rounded border-2 transition-colors ${
                  filterSubclass === ''
                    ? 'border-destiny-primary bg-destiny-primary/10 text-white'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
              >
                All Subclasses
              </button>
              {(['Solar', 'Arc', 'Void', 'Stasis', 'Strand', 'Prismatic'] as Subclass[]).map((subclass) => {
                return (
                  <button
                    key={subclass}
                    onClick={() => setFilterSubclass(subclass)}
                    className={`flex items-center gap-2 px-3 py-2 rounded border-2 transition-colors ${
                      filterSubclass === subclass
                        ? 'border-destiny-primary bg-destiny-primary/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <span className={`font-medium ${getSubclassColor(subclass)}`}>
                      {subclass}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Builds Grid */}
      {filteredBuilds.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400 text-lg mb-4">
            {builds.length === 0 
              ? "No builds created yet. Start by creating your first build!"
              : "No builds match your filters."}
          </p>
          {builds.length === 0 && (
            <Link to="/planner" className="btn-primary">
              Create Your First Build
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuilds.map(build => {
            // Calculate final stats with fragment modifiers
            const finalStats = calculateFinalStats(build.stats, build.fragments);
            const statSummary = getFragmentStatSummary(build.fragments);
            const hasFragmentModifiers = statSummary.gains > 0 || statSummary.losses > 0;
            
            return (
              <div key={build.id} className="card hover:border-destiny-primary border-2 border-transparent transition-colors">
                {/* Header with Class and Subclass Icons */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Icon 
                      hash={getIconHash('classes', build.class)} 
                      size={48} 
                      alt={build.class}
                      className="flex-shrink-0" 
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{build.name}</h3>
                      <div className="flex items-center gap-2">
                        <Icon 
                          hash={getIconHash('subclasses', `${build.subclass.toLowerCase()}_${build.class.toLowerCase()}`)} 
                          size={24} 
                          alt={build.subclass}
                        />
                        <span className="text-sm text-gray-400">{build.class}</span>
                        <span className={`text-sm ${getSubclassColor(build.subclass)}`}>
                          {build.subclass}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteBuild(build.id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete build"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Abilities with Icons */}
                <div className="space-y-3 mb-4">
                  {build.super && (
                    <div className="flex items-center gap-2">
                      <Icon hash={getIconHash('supers', build.super)} size={32} alt={build.super} />
                      <div className="flex-1">
                        <div className="text-xs text-gray-400">Super</div>
                        <div className="text-sm text-white font-medium">{build.super}</div>
                      </div>
                    </div>
                  )}
                  {build.abilities.grenade && (
                    <div className="flex items-center gap-2">
                      <Icon hash={getIconHash('grenades', build.abilities.grenade)} size={32} alt={build.abilities.grenade} />
                      <div className="flex-1">
                        <div className="text-xs text-gray-400">Grenade</div>
                        <div className="text-sm text-white font-medium">{build.abilities.grenade}</div>
                      </div>
                    </div>
                  )}
                  {build.abilities.melee && (
                    <div className="flex items-center gap-2">
                      <Icon hash={getIconHash('melees', build.abilities.melee)} size={32} alt={build.abilities.melee} />
                      <div className="flex-1">
                        <div className="text-xs text-gray-400">Melee</div>
                        <div className="text-sm text-white font-medium">{build.abilities.melee}</div>
                      </div>
                    </div>
                  )}
                  {build.abilities.classAbility && (
                    <div className="flex items-center gap-2">
                      <Icon hash={getIconHash('classAbilities', build.abilities.classAbility)} size={32} alt={build.abilities.classAbility} />
                      <div className="flex-1">
                        <div className="text-xs text-gray-400">Class Ability</div>
                        <div className="text-sm text-white font-medium">{build.abilities.classAbility}</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Aspects Preview */}
                  {build.aspects && build.aspects.length > 0 && (
                    <div className="pt-2 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-2">Aspects ({build.aspects.length}/2)</div>
                      <div className="flex gap-2">
                        {build.aspects.map(aspect => (
                          <Icon 
                            key={aspect}
                            hash={getIconHash('aspects', aspect)} 
                            size={28} 
                            alt={aspect}
                            className="opacity-80"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Fragments Preview */}
                  {build.fragments && build.fragments.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-400 mb-2">Fragments ({build.fragments.length})</div>
                      <div className="flex flex-wrap gap-1">
                        {build.fragments.slice(0, FRAGMENT_PREVIEW_LIMIT).map(fragment => (
                          <Icon 
                            key={fragment}
                            hash={getIconHash('fragments', fragment)} 
                            size={24} 
                            alt={fragment}
                            className="opacity-70"
                          />
                        ))}
                        {build.fragments.length > FRAGMENT_PREVIEW_LIMIT && (
                          <div className="flex items-center justify-center w-6 h-6 text-xs text-gray-500">
                            +{build.fragments.length - FRAGMENT_PREVIEW_LIMIT}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Stats Display with Fragment Modifiers */}
                <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Final Stats</span>
                      {hasFragmentModifiers && (
                        <div className="flex gap-2 text-xs">
                          {statSummary.gains > 0 && (
                            <span className="text-green-400">+{statSummary.gains}</span>
                          )}
                          {statSummary.losses > 0 && (
                            <span className="text-red-400">-{statSummary.losses}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {Object.entries(finalStats).map(([stat, value]) => {
                        const baseStat = build.stats[stat as keyof typeof build.stats];
                        const modifier = statSummary.modifiers[stat as keyof typeof statSummary.modifiers];
                        const hasModifier = modifier !== 0;
                        
                        return (
                          <div key={stat} className="text-center">
                            <div className="text-xs text-gray-400 uppercase">{stat.substring(0, 3)}</div>
                            <div className={`font-bold ${
                              hasModifier 
                                ? (modifier > 0 ? 'text-green-400' : 'text-red-400')
                                : 'text-white'
                            }`}>
                              {value}
                            </div>
                            {hasModifier && (
                              <div className="text-xs text-gray-500">
                                ({baseStat}{modifier > 0 ? '+' : ''}{modifier})
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/planner?id=${build.id}`}
                    className="btn-secondary flex-1 text-center"
                  >
                    Edit
                  </Link>
                  <button className="btn-secondary flex-1">
                    Export
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
