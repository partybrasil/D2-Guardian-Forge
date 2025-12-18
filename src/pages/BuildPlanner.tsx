import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Build, GuardianClass, Subclass, Stats } from '../types';
import localforage from 'localforage';

// Import data
import supersData from '../data/supers.json';
import grenadesData from '../data/grenades.json';
import meleesData from '../data/melees.json';
import classAbilitiesData from '../data/classAbilities.json';
import aspectsData from '../data/aspects.json';
import fragmentsData from '../data/fragments.json';

export default function BuildPlanner() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const buildId = searchParams.get('id');

  // Form state
  const [buildName, setBuildName] = useState('New Build');
  const [selectedClass, setSelectedClass] = useState<GuardianClass>('Warlock');
  const [selectedSubclass, setSelectedSubclass] = useState<Subclass>('Solar');
  const [selectedSuper, setSelectedSuper] = useState('');
  const [selectedGrenade, setSelectedGrenade] = useState('');
  const [selectedMelee, setSelectedMelee] = useState('');
  const [selectedClassAbility, setSelectedClassAbility] = useState('');
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [selectedFragments, setSelectedFragments] = useState<string[]>([]);
  
  const [stats, setStats] = useState<Stats>({
    weapons: 100,
    health: 100,
    class: 100,
    melee: 100,
    grenade: 100,
    super: 100,
  });

  const [saving, setSaving] = useState(false);
  const [createdTimestamp, setCreatedTimestamp] = useState<string | null>(null);

  useEffect(() => {
    if (buildId) {
      loadBuild(buildId);
    }
  }, [buildId]);

  const loadBuild = async (id: string) => {
    try {
      const build = await localforage.getItem<Build>(`build_${id}`);
      if (build) {
        setBuildName(build.name);
        setSelectedClass(build.class);
        setSelectedSubclass(build.subclass);
        setSelectedSuper(build.super);
        setSelectedGrenade(build.abilities.grenade);
        setSelectedMelee(build.abilities.melee);
        setSelectedClassAbility(build.abilities.classAbility);
        setSelectedAspects(build.aspects);
        setSelectedFragments(build.fragments);
        setStats(build.stats);
        setCreatedTimestamp(build.timestamps?.created || null);
      }
    } catch (error) {
      console.error('Error loading build:', error);
    }
  };

  const saveBuild = async () => {
    setSaving(true);
    try {
      const id = buildId || `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      
      const build: Build = {
        id,
        name: buildName,
        class: selectedClass,
        subclass: selectedSubclass,
        super: selectedSuper,
        abilities: {
          grenade: selectedGrenade,
          melee: selectedMelee,
          classAbility: selectedClassAbility,
        },
        aspects: selectedAspects,
        fragments: selectedFragments,
        weapons: {
          kinetic: { name: '', type: '' },
          energy: { name: '', type: '' },
          power: { name: '', type: '' },
        },
        armor: {
          head: { name: 'Helmet', archetype: 'Bombardero', masterwork: false },
          hands: { name: 'Gauntlets', archetype: 'Especialista', masterwork: false },
          chest: { name: 'Chest', archetype: 'Ejemplar', masterwork: false },
          legs: { name: 'Legs', archetype: 'Camorrista', masterwork: false },
          classItem: { name: 'Class Item', archetype: 'Guardián', masterwork: false },
        },
        stats,
        mods: [],
        version: '1.0.0-EdgeOfFate',
        timestamps: {
          created: createdTimestamp || new Date().toISOString(),
          updated: new Date().toISOString(),
        },
      };

      await localforage.setItem(`build_${id}`, build);
      alert('Build saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving build:', error);
      alert('Error saving build. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Filter data based on selections
  const availableSupers = supersData.filter(s => 
    s.class === selectedClass && s.subclass === selectedSubclass
  );
  
  const availableGrenades = grenadesData.filter(g => 
    g.element === selectedSubclass
  );
  
  const availableMelees = meleesData.filter(m => 
    m.element === selectedSubclass
  );
  
  const availableClassAbilities = classAbilitiesData.filter(a => 
    a.class === selectedClass
  );

  const availableAspects = aspectsData.filter(a => 
    a.subclass === selectedSubclass && (!a.class || a.class === selectedClass)
  );

  const availableFragments = fragmentsData.filter(f => 
    f.subclass === selectedSubclass
  );

  const handleAspectToggle = (aspectName: string) => {
    if (selectedAspects.includes(aspectName)) {
      setSelectedAspects(selectedAspects.filter(a => a !== aspectName));
    } else if (selectedAspects.length < 2) {
      setSelectedAspects([...selectedAspects, aspectName]);
    }
  };

  const handleFragmentToggle = (fragmentName: string) => {
    if (selectedFragments.includes(fragmentName)) {
      setSelectedFragments(selectedFragments.filter(f => f !== fragmentName));
    } else if (selectedFragments.length < 6) {
      setSelectedFragments([...selectedFragments, fragmentName]);
    }
  };

  const updateStat = (stat: keyof Stats, value: number) => {
    setStats({ ...stats, [stat]: Math.min(200, Math.max(0, value)) });
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Build Planner</h1>
        <p className="text-gray-400">Create and customize your Guardian build</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Build Name */}
          <div className="card">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Build Name
            </label>
            <input
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              className="input-field"
              placeholder="Enter build name..."
            />
          </div>

          {/* Class & Subclass Selection */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Class & Subclass</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Guardian Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value as GuardianClass);
                    setSelectedSuper('');
                    setSelectedClassAbility('');
                  }}
                  className="input-field"
                >
                  <option value="Warlock">Warlock</option>
                  <option value="Titan">Titan</option>
                  <option value="Hunter">Hunter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subclass
                </label>
                <select
                  value={selectedSubclass}
                  onChange={(e) => {
                    setSelectedSubclass(e.target.value as Subclass);
                    setSelectedSuper('');
                    setSelectedGrenade('');
                    setSelectedMelee('');
                    setSelectedAspects([]);
                    setSelectedFragments([]);
                  }}
                  className="input-field"
                >
                  <option value="Solar">Solar</option>
                  <option value="Arc">Arc</option>
                  <option value="Void">Void</option>
                  <option value="Stasis">Stasis</option>
                  <option value="Strand">Strand</option>
                  <option value="Prismatic">Prismatic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Abilities Selection */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Abilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Super
                </label>
                <select
                  value={selectedSuper}
                  onChange={(e) => setSelectedSuper(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Super...</option>
                  {availableSupers.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grenade
                </label>
                <select
                  value={selectedGrenade}
                  onChange={(e) => setSelectedGrenade(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Grenade...</option>
                  {availableGrenades.map(g => (
                    <option key={g.name} value={g.name}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Melee
                </label>
                <select
                  value={selectedMelee}
                  onChange={(e) => setSelectedMelee(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Melee...</option>
                  {availableMelees.map(m => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class Ability
                </label>
                <select
                  value={selectedClassAbility}
                  onChange={(e) => setSelectedClassAbility(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Class Ability...</option>
                  {availableClassAbilities.map(a => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Aspects */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-2">
              Aspects <span className="text-sm text-gray-400">({selectedAspects.length}/2)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableAspects.map(aspect => (
                <button
                  key={aspect.name}
                  onClick={() => handleAspectToggle(aspect.name)}
                  className={`p-3 rounded border-2 text-left transition-colors ${
                    selectedAspects.includes(aspect.name)
                      ? 'border-destiny-primary bg-destiny-primary/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="font-bold text-white">{aspect.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{aspect.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fragments */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-2">
              Fragments <span className="text-sm text-gray-400">({selectedFragments.length}/6)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableFragments.map(fragment => (
                <button
                  key={fragment.name}
                  onClick={() => handleFragmentToggle(fragment.name)}
                  className={`p-3 rounded border-2 text-left transition-colors ${
                    selectedFragments.includes(fragment.name)
                      ? 'border-destiny-primary bg-destiny-primary/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="font-bold text-white">{fragment.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{fragment.effect}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Stats (0-200)</h2>
            <div className="space-y-4">
              {Object.entries(stats).map(([statName, value]) => (
                <div key={statName}>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-300 capitalize">
                      {statName}
                    </label>
                    <span className="text-sm font-bold text-white">{value}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={value}
                    onChange={(e) => updateStat(statName as keyof Stats, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-destiny-primary"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Stats:</span>
                <span className="text-white font-bold">
                  {Object.values(stats).reduce((sum, val) => sum + val, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={saveBuild}
              disabled={saving || !buildName || !selectedSuper}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Build'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Summary Panel - 1/3 width */}
        <div className="space-y-6">
          <div className="card sticky top-4">
            <h2 className="text-xl font-bold text-white mb-4">Build Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-400">Build Name</div>
                <div className="text-white font-bold">{buildName}</div>
              </div>
              
              <div>
                <div className="text-gray-400">Class</div>
                <div className="text-white">{selectedClass}</div>
              </div>
              
              <div>
                <div className="text-gray-400">Subclass</div>
                <div className={getSubclassColor(selectedSubclass)}>{selectedSubclass}</div>
              </div>
              
              {selectedSuper && (
                <div>
                  <div className="text-gray-400">Super</div>
                  <div className="text-white">{selectedSuper}</div>
                </div>
              )}
              
              {selectedAspects.length > 0 && (
                <div>
                  <div className="text-gray-400">Aspects</div>
                  <div className="text-white space-y-1">
                    {selectedAspects.map(a => (
                      <div key={a}>• {a}</div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedFragments.length > 0 && (
                <div>
                  <div className="text-gray-400">Fragments</div>
                  <div className="text-white space-y-1">
                    {selectedFragments.map(f => (
                      <div key={f}>• {f}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-gray-700">
                <div className="text-gray-400 mb-2">Stats Distribution</div>
                <div className="space-y-1">
                  {Object.entries(stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="text-gray-300 capitalize text-xs">{stat}</span>
                      <span className="text-white font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
