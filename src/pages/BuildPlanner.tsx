import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Build, GuardianClass, Subclass, Stats, SubclassDefinition } from '../types';
import localforage from 'localforage';
import Icon from '../components/Icon';
import { getIconHash } from '../utils/iconUtils';

// Import data
import supersData from '../data/supers.json';
import grenadesData from '../data/grenades.json';
import meleesData from '../data/melees.json';
import classAbilitiesData from '../data/classAbilities.json';
import aspectsData from '../data/aspects.json';
import fragmentsData from '../data/fragments.json';
import subclassesData from '../data/subclasses.json';

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
    weapons: 0,
    health: 0,
    class: 0,
    melee: 0,
    grenade: 0,
    super: 0,
  });

  const [gameplayLoop, setGameplayLoop] = useState('');
  const [buildDetails, setBuildDetails] = useState('');

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
        setGameplayLoop(build.gameplayLoop || '');
        setBuildDetails(build.buildDetails || '');
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
        gameplayLoop,
        buildDetails,
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
  // Prismatic has access to all supers for the class
  const availableSupers = supersData.filter(s => 
    selectedSubclass === 'Prismatic'
      ? s.class === selectedClass
      : s.class === selectedClass && s.subclass === selectedSubclass
  );
  
  // Grenades are shared across all classes but filtered by element
  // Prismatic has access to grenades from all subclasses (Light and Dark)
  const availableGrenades = grenadesData.filter(g => 
    selectedSubclass === 'Prismatic' 
      ? ['Solar', 'Arc', 'Void', 'Stasis', 'Strand'].includes(g.element)
      : g.element === selectedSubclass
  );
  
  // Melees are class-specific - filter by both class and element
  // Prismatic has access to melees from all subclasses for the selected class
  const availableMelees = meleesData.filter(m => {
    const matchesClass = !m.class || m.class === selectedClass;
    if (selectedSubclass === 'Prismatic') {
      return matchesClass && ['Solar', 'Arc', 'Void', 'Stasis', 'Strand'].includes(m.element);
    }
    return matchesClass && m.element === selectedSubclass;
  });
  
  const availableClassAbilities = classAbilitiesData.filter(a => 
    a.class === selectedClass
  );

  // Aspects are class-specific - filter by both class and subclass
  // Prismatic has access to aspects from all Light and Dark subclasses for the selected class
  const availableAspects = aspectsData.filter(a => {
    const matchesClass = !a.class || a.class === selectedClass;
    if (selectedSubclass === 'Prismatic') {
      return matchesClass && ['Solar', 'Arc', 'Void', 'Stasis', 'Strand'].includes(a.subclass);
    }
    return a.subclass === selectedSubclass && matchesClass;
  });

  // Fragments - Prismatic has special facets plus access to other fragments
  // Prismatic can use fragments from Light, Dark, and Prismatic elements
  const availableFragments = fragmentsData.filter(f => 
    selectedSubclass === 'Prismatic' 
      ? ['Solar', 'Arc', 'Void', 'Stasis', 'Strand', 'Prismatic'].includes(f.subclass)
      : f.subclass === selectedSubclass
  );

  // Get selected aspect details (needed before calculating slots)
  const selectedAspectDetails = aspectsData.filter(a => selectedAspects.includes(a.name));

  // Calculate available fragment slots from selected aspects
  const totalFragmentSlots = selectedAspectDetails.reduce((sum, a) => sum + a.fragmentSlots, 0);
  const maxFragments = totalFragmentSlots;

  const handleAspectToggle = (aspectName: string) => {
    if (selectedAspects.includes(aspectName)) {
      // Prepare to remove aspect
      const newAspects = selectedAspects.filter(a => a !== aspectName);

      // Calculate new fragment slots
      const newAspectsDetails = aspectsData.filter(a => newAspects.includes(a.name));
      const newTotalSlots = newAspectsDetails.reduce((sum, a) => sum + a.fragmentSlots, 0);

      // Remove excess fragments if needed
      if (selectedFragments.length > newTotalSlots) {
        const removedCount = selectedFragments.length - newTotalSlots;
        if (!confirm(`Removing this aspect will reduce your fragment slots. ${removedCount} fragment(s) will be removed. Continue?`)) {
          return; // User canceled; do not remove aspect or fragments
        }
        setSelectedFragments(selectedFragments.slice(0, newTotalSlots));
      }

      // Apply aspect removal after handling fragment changes / confirmation
      setSelectedAspects(newAspects);
    } else if (selectedAspects.length < 2) {
      setSelectedAspects([...selectedAspects, aspectName]);
    } else {
      alert('You can only equip 2 aspects. Remove one first.');
    }
  };

  const handleFragmentToggle = (fragmentName: string) => {
    if (selectedFragments.includes(fragmentName)) {
      setSelectedFragments(selectedFragments.filter(f => f !== fragmentName));
    } else if (selectedFragments.length < maxFragments) {
      setSelectedFragments([...selectedFragments, fragmentName]);
    } else {
      alert(`You can only equip ${maxFragments} fragments based on your selected aspects.`);
    }
  };

  const updateStat = (stat: keyof Stats, value: number) => {
    setStats({ ...stats, [stat]: Math.min(200, Math.max(0, value)) });
  };

  const getSubclassColor = (subclass: string) => {
    const colors: Record<string, string> = {
      Solar: 'text-destiny-solar',
      Arc: 'text-destiny-arc',
      Void: 'text-destiny-void',
      Stasis: 'text-destiny-stasis',
      Strand: 'text-destiny-strand',
      Prismatic: 'text-destiny-prismatic',
    };
    return colors[subclass] || 'text-gray-400';
  };

  // Get current subclass details
  const currentSubclassInfo = (subclassesData as SubclassDefinition[]).find(
    sub => sub.class === selectedClass && sub.element === selectedSubclass
  );

  // Get selected super details
  const selectedSuperInfo = supersData.find(s => s.name === selectedSuper);

  // Calculate fragment stat modifiers with memoization
  const fragmentStatModifiers = useMemo(() => {
    const selectedFragmentDetails = fragmentsData.filter(f => selectedFragments.includes(f.name));
    const totalModifiers: Stats = {
      weapons: 0,
      health: 0,
      class: 0,
      melee: 0,
      grenade: 0,
      super: 0,
    };

    selectedFragmentDetails.forEach(fragment => {
      if (fragment.statModifiers) {
        Object.entries(fragment.statModifiers).forEach(([stat, value]) => {
          totalModifiers[stat as keyof Stats] += value;
        });
      }
    });

    return totalModifiers;
  }, [selectedFragments]);

  // Calculate total gains and losses
  const { totalGains, totalLosses } = useMemo(() => {
    const gains = Object.values(fragmentStatModifiers).filter(v => v > 0).reduce((sum, v) => sum + v, 0);
    const losses = Object.values(fragmentStatModifiers).filter(v => v < 0).reduce((sum, v) => sum + v, 0);
    return { totalGains: gains, totalLosses: losses };
  }, [fragmentStatModifiers]);

  // Calculate final stats (base + fragment modifiers)
  const finalStats = useMemo(() => {
    const result: Stats = {
      weapons: stats.weapons + fragmentStatModifiers.weapons,
      health: stats.health + fragmentStatModifiers.health,
      class: stats.class + fragmentStatModifiers.class,
      melee: stats.melee + fragmentStatModifiers.melee,
      grenade: stats.grenade + fragmentStatModifiers.grenade,
      super: stats.super + fragmentStatModifiers.super,
    };
    return result;
  }, [stats, fragmentStatModifiers]);

  // Get fragments that affect each stat
  const getFragmentsAffectingStat = (statName: keyof Stats) => {
    const selectedFragmentDetails = fragmentsData.filter(f => selectedFragments.includes(f.name));
    return selectedFragmentDetails.filter(f => 
      f.statModifiers && f.statModifiers[statName] !== undefined
    ).map(f => ({
      name: f.name,
      modifier: f.statModifiers![statName]!
    }));
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
            
            {/* Class Selection with Icons */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Guardian Class
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Warlock', 'Titan', 'Hunter'] as GuardianClass[]).map((className) => (
                  <button
                    key={className}
                    onClick={() => {
                      setSelectedClass(className);
                      setSelectedSuper('');
                      setSelectedClassAbility('');
                    }}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                      selectedClass === className
                        ? 'border-destiny-primary bg-destiny-primary/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <Icon hash={getIconHash('classes', className)} size={48} alt={className} />
                    <span className="mt-2 font-semibold text-white">{className}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subclass Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Subclass
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {(['Solar', 'Arc', 'Void', 'Stasis', 'Strand', 'Prismatic'] as Subclass[]).map((subclass) => {
                  const subclassKey = `${subclass.toLowerCase()}_${selectedClass.toLowerCase()}`;
                  return (
                    <button
                      key={subclass}
                      onClick={() => {
                        setSelectedSubclass(subclass);
                        setSelectedSuper('');
                        setSelectedGrenade('');
                        setSelectedMelee('');
                        setSelectedAspects([]);
                        setSelectedFragments([]);
                      }}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                        selectedSubclass === subclass
                          ? 'border-destiny-primary bg-destiny-primary/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <Icon 
                        hash={getIconHash('subclasses', subclassKey)} 
                        size={40} 
                        alt={subclass} 
                      />
                      <span className={`mt-2 text-xs font-semibold ${getSubclassColor(subclass)}`}>
                        {subclass}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subclass Info Panel */}
            {currentSubclassInfo && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <h3 className={`text-lg font-bold mb-2 ${getSubclassColor(selectedSubclass)}`}>
                  {currentSubclassInfo.name}
                </h3>
                <p className="text-sm text-gray-300 mb-3">{currentSubclassInfo.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-400 font-semibold mb-1">Available Supers:</div>
                    <ul className="text-gray-300 space-y-1">
                      {currentSubclassInfo.supers.map(s => (
                        <li key={s} className="flex items-start">
                          <span className="text-destiny-primary mr-2">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 font-semibold mb-1">Playstyle:</div>
                    <p className="text-gray-300">{currentSubclassInfo.playstyle}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-gray-400 font-semibold mb-1">Key Features:</div>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {currentSubclassInfo.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-destiny-primary mr-2">→</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3">
                  <div className="text-gray-400 font-semibold mb-1">Recommended Synergies:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {currentSubclassInfo.synergies.map((syn, idx) => (
                      <span key={idx} className="px-2 py-1 bg-destiny-primary/20 text-destiny-primary rounded text-xs">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Abilities Selection */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Abilities</h2>
            
            {/* Show selected super details */}
            {selectedSuperInfo && (
              <div className="mb-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="flex items-start gap-3">
                  <Icon hash={getIconHash('supers', selectedSuperInfo.name)} size={48} alt={selectedSuperInfo.name} className="flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white">{selectedSuperInfo.name}</h4>
                        <p className="text-xs text-gray-400 mt-1">{selectedSuperInfo.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-xs text-gray-400">Type:</span>
                        <div className="text-destiny-primary text-sm font-semibold">{selectedSuperInfo.type}</div>
                        <span className="text-xs text-gray-500">{selectedSuperInfo.duration}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-300">
                      <span className="text-destiny-primary">★</span> {selectedSuperInfo.keyBenefit}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Super Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Super {selectedSuper && <span className="text-destiny-primary">✓</span>}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {availableSupers.map(s => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSuper(s.name)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      selectedSuper === s.name
                        ? 'border-destiny-primary bg-destiny-primary/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    title={s.description}
                  >
                    <Icon hash={getIconHash('supers', s.name)} size={40} alt={s.name} />
                    <span className="mt-2 text-xs text-center text-white font-medium leading-tight">
                      {s.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grenade Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Grenade {selectedGrenade && <span className="text-destiny-primary">✓</span>}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {availableGrenades.map(g => (
                  <button
                    key={g.name}
                    onClick={() => setSelectedGrenade(g.name)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      selectedGrenade === g.name
                        ? 'border-destiny-primary bg-destiny-primary/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    title={g.description}
                  >
                    <Icon hash={getIconHash('grenades', g.name)} size={36} alt={g.name} />
                    <span className="mt-2 text-xs text-center text-white leading-tight">
                      {g.name.replace(' Grenade', '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Melee Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Melee {selectedMelee && <span className="text-destiny-primary">✓</span>}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {availableMelees.map(m => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMelee(m.name)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      selectedMelee === m.name
                        ? 'border-destiny-primary bg-destiny-primary/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    title={m.description}
                  >
                    <Icon hash={getIconHash('melees', m.name)} size={36} alt={m.name} />
                    <span className="mt-2 text-xs text-center text-white leading-tight">
                      {m.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Class Ability Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Class Ability {selectedClassAbility && <span className="text-destiny-primary">✓</span>}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableClassAbilities.map(a => (
                  <button
                    key={a.name}
                    onClick={() => setSelectedClassAbility(a.name)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                      selectedClassAbility === a.name
                        ? 'border-destiny-primary bg-destiny-primary/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    title={a.description}
                  >
                    <Icon hash={getIconHash('classAbilities', a.name)} size={40} alt={a.name} />
                    <span className="mt-2 text-xs text-center text-white font-medium">
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Aspects */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-2">
              Aspects <span className="text-sm text-gray-400">({selectedAspects.length}/2)</span>
            </h2>
            <p className="text-xs text-gray-400 mb-3">Select up to 2 aspects to customize your subclass</p>
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
                  <div className="flex items-start gap-3 mb-2">
                    <Icon hash={getIconHash('aspects', aspect.name)} size={40} alt={aspect.name} className="flex-shrink-0" />
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
                </button>
              ))}
            </div>
            
            {/* Show selected aspects details */}
            {selectedAspectDetails.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="text-sm font-semibold text-gray-300 mb-2">Selected Aspects Details:</div>
                <div className="space-y-2">
                  {selectedAspectDetails.map(aspect => (
                    <div key={aspect.name} className="text-xs">
                      <span className="text-destiny-primary font-semibold">{aspect.name}:</span>
                      <span className="text-gray-400 ml-2">{aspect.description}</span>
                      <span className="text-gray-500 ml-2">({aspect.fragmentSlots} fragment {aspect.fragmentSlots === 1 ? 'slot' : 'slots'})</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Total Fragment Slots Available: {totalFragmentSlots}
                </div>
              </div>
            )}
          </div>

          {/* Fragments */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-2">
              Fragments <span className="text-sm text-gray-400">({selectedFragments.length}/{maxFragments})</span>
            </h2>
            {totalFragmentSlots === 0 && (
              <p className="text-xs text-yellow-400 mb-3">
                ⚠️ Select aspects first to unlock fragment slots
              </p>
            )}
            {totalFragmentSlots > 0 && (
              <p className="text-xs text-gray-400 mb-3">
                Available slots: {maxFragments} (from selected aspects)
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableFragments.map(fragment => (
                <button
                  key={fragment.name}
                  onClick={() => handleFragmentToggle(fragment.name)}
                  disabled={totalFragmentSlots === 0}
                  className={`p-3 rounded border-2 text-left transition-colors ${
                    totalFragmentSlots === 0
                      ? 'border-gray-700 bg-gray-800/30 cursor-not-allowed opacity-50'
                      : selectedFragments.includes(fragment.name)
                      ? 'border-destiny-primary bg-destiny-primary/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon hash={getIconHash('fragments', fragment.name)} size={32} alt={fragment.name} className="flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-white">{fragment.name}</div>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${getSubclassColor(fragment.subclass)} bg-gray-800/80 flex-shrink-0 ml-2`}>
                          {fragment.subclass}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{fragment.effect}</div>
                      {fragment.statModifiers && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {Object.entries(fragment.statModifiers).map(([stat, value]) => (
                            <span
                              key={stat}
                              className={`text-xs px-1.5 py-0.5 rounded ${
                                value > 0 
                                  ? 'bg-green-900/30 text-green-400' 
                                  : 'bg-red-900/30 text-red-400'
                              }`}
                            >
                              {value > 0 ? '+' : ''}{value} {stat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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

          {/* Gameplay Loop & Build Details */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Build Notes</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gameplay Loop
                </label>
                <textarea
                  value={gameplayLoop}
                  onChange={(e) => setGameplayLoop(e.target.value)}
                  className="input-field min-h-[100px] resize-y"
                  placeholder="Describe your gameplay loop and rotation..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Build Details / Notes
                </label>
                <textarea
                  value={buildDetails}
                  onChange={(e) => setBuildDetails(e.target.value)}
                  className="input-field min-h-[120px] resize-y"
                  placeholder="Add build details, synergies, tips, or any other notes..."
                />
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

              {selectedFragments.length > 0 && Object.values(fragmentStatModifiers).some(v => v !== 0) && (
                <div className="pt-3 border-t border-gray-700">
                  <div className="text-gray-400 mb-2">Fragment Stat Modifiers</div>
                  <div className="space-y-1">
                    {Object.entries(fragmentStatModifiers).map(([stat, value]) => {
                      if (value === 0) return null;
                      return (
                        <div key={stat} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize text-xs">{stat}</span>
                          <span className={`text-xs font-bold ${
                            value > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {value > 0 ? '+' : ''}{value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-700/50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Total Gains:</span>
                      <span className="text-green-400 font-bold">
                        +{totalGains}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Total Losses:</span>
                      <span className="text-red-400 font-bold">
                        {Math.abs(totalLosses)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-gray-700">
                <div className="text-gray-400 mb-2">Stats Distribution</div>
                <div className="space-y-2">
                  {Object.entries(stats).map(([stat]) => {
                    const statName = stat as keyof Stats;
                    const modifierValue = fragmentStatModifiers[statName];
                    const finalValue = finalStats[statName];
                    const affectingFragments = getFragmentsAffectingStat(statName);
                    
                    return (
                      <div key={stat} className="text-xs">
                        <div className="flex justify-between items-start">
                          <span className="text-gray-300 capitalize font-medium">{stat}:</span>
                          <div className="text-right">
                            <span className={`font-mono font-bold ${
                              modifierValue !== 0 
                                ? (modifierValue > 0 ? 'text-green-400' : 'text-red-400')
                                : 'text-white'
                            }`}>
                              {finalValue}
                            </span>
                            {modifierValue !== 0 && (
                              <span className="text-gray-500 ml-1">
                                ({modifierValue > 0 ? '+' : ''}{modifierValue})
                              </span>
                            )}
                          </div>
                        </div>
                        {affectingFragments.length > 0 && (
                          <div className="ml-2 mt-1 space-y-0.5">
                            {affectingFragments.map(frag => (
                              <div key={frag.name} className="text-gray-500 italic">
                                • {frag.modifier > 0 ? '+' : ''}{frag.modifier} • {frag.name} [Cause: FRAGMENT]
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-700/50">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Total Stats (Final):</span>
                    <span className="text-white font-bold">
                      {Object.values(finalStats).reduce((sum, val) => sum + val, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
