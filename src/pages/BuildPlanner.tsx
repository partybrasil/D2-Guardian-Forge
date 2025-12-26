import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Build, GuardianClass, Subclass, Stats, SubclassDefinition, AerialAbility, PassiveAbility, TranscendenceAbility, PrismaticAbilitiesData } from '../types';
import localforage from 'localforage';
import Icon from '../components/Icon';
import AbilitySelector from '../components/AbilitySelector';
import AspectSelector from '../components/AspectSelector';
import UnifiedSelector from '../components/UnifiedSelector';
import AutoSelectAbility from '../components/AutoSelectAbility';

// Import data
import supersData from '../data/supers.json';
import grenadesData from '../data/grenades.json';
import meleesData from '../data/melees.json';
import classAbilitiesData from '../data/classAbilities.json';
import movementAbilitiesData from '../data/movementAbilities.json';
import aspectsData from '../data/aspects.json';
import fragmentsData from '../data/fragments.json';
import subclassesData from '../data/subclasses.json';
import aerialsData from '../data/aerials.json';
import passivesData from '../data/passives.json';
import transcendenceData from '../data/transcendence.json';
import prismaticAbilitiesRaw from '../data/prismaticAbilities.json';

// Type the prismatic abilities data
const prismaticAbilitiesData = prismaticAbilitiesRaw as PrismaticAbilitiesData;

export default function BuildPlanner() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const buildId = searchParams.get('id');

  // Form state
  const [buildName, setBuildName] = useState('New Build');
  const [selectedClass, setSelectedClass] = useState<GuardianClass | ''>('');
  const [selectedSubclass, setSelectedSubclass] = useState<Subclass | ''>('');
  const [selectedSuper, setSelectedSuper] = useState('');
  const [selectedGrenade, setSelectedGrenade] = useState('');
  const [selectedMelee, setSelectedMelee] = useState('');
  const [selectedClassAbility, setSelectedClassAbility] = useState('');
  const [selectedMovement, setSelectedMovement] = useState('');
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [selectedFragments, setSelectedFragments] = useState<string[]>([]);
  
  // Extra Abilities state (auto-selected)
  const [selectedAerial, setSelectedAerial] = useState('');
  const [selectedPassive1, setSelectedPassive1] = useState('');
  const [selectedPassive2, setSelectedPassive2] = useState('');
  const [selectedTranscendenceMelee, setSelectedTranscendenceMelee] = useState('');
  const [selectedTranscendenceGrenade, setSelectedTranscendenceGrenade] = useState('');
  
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

  // Auto-select extra abilities based on aspects
  useEffect(() => {
    const aerials = aerialsData as AerialAbility[];
    const passives = passivesData as PassiveAbility[];
    
    // Find aerial ability from selected aspects
    const aerial = aerials.find(a => 
      selectedAspects.includes(a.aspectRequired) && a.class === selectedClass
    );
    setSelectedAerial(aerial?.name || '');
    
    // Find passive abilities from selected aspects, preserving aspect selection order
    const aspectPassives = selectedAspects
      .map(aspectName =>
        passives.find(p => p.aspectRequired === aspectName && p.class === selectedClass)
      )
      .filter((p): p is PassiveAbility => Boolean(p));
    
    setSelectedPassive1(aspectPassives[0]?.name || '');
    setSelectedPassive2(aspectPassives[1]?.name || '');
  }, [selectedAspects, selectedClass]);

  // Auto-select transcendence abilities for Prismatic subclass
  useEffect(() => {
    if (selectedSubclass === 'Prismatic') {
      const transcendence = transcendenceData as TranscendenceAbility[];
      
      const melee = transcendence.find(t => 
        t.class === selectedClass && t.type === 'melee'
      );
      const grenade = transcendence.find(t => 
        t.class === selectedClass && t.type === 'grenade'
      );
      
      setSelectedTranscendenceMelee(melee?.name || '');
      setSelectedTranscendenceGrenade(grenade?.name || '');
    } else {
      setSelectedTranscendenceMelee('');
      setSelectedTranscendenceGrenade('');
    }
  }, [selectedSubclass, selectedClass]);

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
        setSelectedMovement(build.abilities.movement || '');
        setSelectedAspects(build.aspects);
        setSelectedFragments(build.fragments);
        setStats(build.stats);
        setGameplayLoop(build.gameplayLoop || '');
        setBuildDetails(build.buildDetails || '');
        setCreatedTimestamp(build.timestamps?.created || null);
        
        // Note: Extra abilities are auto-calculated from aspects via useEffect,
        // so we don't need to manually load them here. They will be recalculated
        // based on the current aspect definitions.
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
        class: selectedClass as GuardianClass,
        subclass: selectedSubclass as Subclass,
        super: selectedSuper,
        abilities: {
          grenade: selectedGrenade,
          melee: selectedMelee,
          classAbility: selectedClassAbility,
          movement: selectedMovement,
        },
        extraAbilities: {
          aerial: selectedAerial,
          passive1: selectedPassive1,
          passive2: selectedPassive2,
          transcendenceMelee: selectedTranscendenceMelee,
          transcendenceGrenade: selectedTranscendenceGrenade,
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
  // Prismatic has access to specific curated supers per class from prismaticAbilities.json
  const availableSupers = supersData.filter(s => {
    if (!selectedClass || !selectedSubclass) return false;
    if (selectedSubclass === 'Prismatic') {
      const classData = prismaticAbilitiesData[selectedClass as GuardianClass];
      return s.class === selectedClass && classData?.supers.includes(s.name);
    }
    return s.class === selectedClass && s.subclass === selectedSubclass;
  });
  
  // Grenades - Prismatic has access to specific grenades per class from prismaticAbilities.json
  const availableGrenades = grenadesData.filter(g => {
    if (!selectedClass || !selectedSubclass) return false;
    if (selectedSubclass === 'Prismatic') {
      const classData = prismaticAbilitiesData[selectedClass as GuardianClass];
      return classData?.grenades.includes(g.name);
    }
    return g.element === selectedSubclass;
  });
  
  // Melees are class-specific - Prismatic has access to specific melees per class
  const availableMelees = meleesData.filter(m => {
    if (!selectedClass || !selectedSubclass) return false;
    const matchesClass = !m.class || m.class === selectedClass;
    if (selectedSubclass === 'Prismatic') {
      const classData = prismaticAbilitiesData[selectedClass as GuardianClass];
      return matchesClass && classData?.melees.includes(m.name);
    }
    return matchesClass && m.element === selectedSubclass;
  });
  
  // Class abilities - filter by class and element (if specified)
  // Phoenix Dive is only available for Solar and Prismatic Warlocks
  const availableClassAbilities = classAbilitiesData.filter(a => {
    if (!selectedClass) return false;
    if (a.class !== selectedClass) return false;
    
    // If ability has element requirement, check if it matches
    if (a.element) {
      if (!selectedSubclass) return false;
      if (selectedSubclass === 'Prismatic') {
        // Prismatic can use element-specific abilities that are explicitly marked as Prismatic-compatible
        // Currently: Phoenix Dive (Solar) is available to Prismatic Warlock
        return true;
      }
      return a.element === selectedSubclass;
    }
    
    // Abilities without element requirement are always available
    return true;
  });

  // Movement abilities - filter by class
  const availableMovementAbilities = movementAbilitiesData.filter(m => {
    if (!selectedClass) return false;
    if (m.class !== selectedClass) return false;
    
    // If movement ability has element requirement (like Blink, Icarus Dash, Thruster), check if it matches
    if (m.element) {
      if (!selectedSubclass) return false;
      if (selectedSubclass === 'Prismatic') {
        // Note: In current Destiny 2 mechanics, Prismatic may not have access to all element-specific movements
        // This behavior should be validated against actual game mechanics
        // For now, allowing all element-specific movements for Prismatic
        return true;
      }
      return m.element === selectedSubclass;
    }
    
    // Movement abilities without element requirement are always available
    return true;
  });

  // Aspects are class-specific - Prismatic has access to specific aspects per class
  const availableAspects = aspectsData.filter(a => {
    if (!selectedClass || !selectedSubclass) return false;
    const matchesClass = !a.class || a.class === selectedClass;
    if (selectedSubclass === 'Prismatic') {
      const classData = prismaticAbilitiesData[selectedClass as GuardianClass];
      return matchesClass && classData?.aspects.includes(a.name);
    }
    return a.subclass === selectedSubclass && matchesClass;
  });

  // Fragments - Prismatic has special facets plus access to other fragments
  // Prismatic can use fragments from Light, Dark, and Prismatic elements
  const availableFragments = fragmentsData.filter(f => {
    if (!selectedSubclass) return false;
    return selectedSubclass === 'Prismatic' 
      ? ['Solar', 'Arc', 'Void', 'Stasis', 'Strand', 'Prismatic'].includes(f.subclass)
      : f.subclass === selectedSubclass;
  });

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

  // Memoize extra abilities details lookups for performance
  const selectedAerialDetails = useMemo(() => {
    return selectedAerial
      ? (aerialsData as AerialAbility[]).find(a => a.name === selectedAerial)
      : undefined;
  }, [selectedAerial]);

  const selectedPassive1Details = useMemo(() => {
    return selectedPassive1
      ? (passivesData as PassiveAbility[]).find(p => p.name === selectedPassive1)
      : undefined;
  }, [selectedPassive1]);

  const selectedPassive2Details = useMemo(() => {
    return selectedPassive2
      ? (passivesData as PassiveAbility[]).find(p => p.name === selectedPassive2)
      : undefined;
  }, [selectedPassive2]);

  const selectedTranscendenceMeleeDetails = useMemo(() => {
    return selectedTranscendenceMelee
      ? (transcendenceData as TranscendenceAbility[]).find(t => t.name === selectedTranscendenceMelee)
      : undefined;
  }, [selectedTranscendenceMelee]);

  const selectedTranscendenceGrenadeDetails = useMemo(() => {
    return selectedTranscendenceGrenade
      ? (transcendenceData as TranscendenceAbility[]).find(t => t.name === selectedTranscendenceGrenade)
      : undefined;
  }, [selectedTranscendenceGrenade]);

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
            <h2 className="text-xl font-bold text-white mb-6 text-center">Class & Subclass</h2>
            
            {/* Centered Unified Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Class Selection */}
              <UnifiedSelector
                label="Guardian Class"
                iconCategory="classes"
                selectedValue={selectedClass}
                options={(['Warlock', 'Titan', 'Hunter'] as GuardianClass[]).map(c => ({ name: c }))}
                onSelect={(value) => {
                  setSelectedClass(value as GuardianClass);
                  // Clear all dependent selections when class changes
                  setSelectedSubclass('');
                  setSelectedSuper('');
                  setSelectedGrenade('');
                  setSelectedMelee('');
                  setSelectedClassAbility('');
                  setSelectedMovement('');
                  setSelectedAspects([]);
                  setSelectedFragments([]);
                }}
              />
              
              {/* Subclass Selection */}
              <UnifiedSelector
                label="Subclass"
                iconCategory="subclasses"
                selectedValue={selectedSubclass}
                options={(['Solar', 'Arc', 'Void', 'Stasis', 'Strand', 'Prismatic'] as Subclass[]).map(s => ({
                  name: s,
                  element: s,
                  iconKey: selectedClass ? `${s.toLowerCase()}_${selectedClass.toLowerCase()}` : ''
                }))}
                iconKey="iconKey" // Property name in each option object that contains the icon lookup key
                onSelect={(value) => {
                  setSelectedSubclass(value as Subclass);
                  setSelectedSuper('');
                  setSelectedGrenade('');
                  setSelectedMelee('');
                  setSelectedClassAbility('');
                  setSelectedMovement('');
                  setSelectedAspects([]);
                  setSelectedFragments([]);
                }}
                getSubclassColor={getSubclassColor}
              />
              
              {/* Super Selection */}
              <UnifiedSelector
                label="Super Ability"
                iconCategory="supers"
                selectedValue={selectedSuper}
                options={availableSupers}
                onSelect={setSelectedSuper}
                getSubclassColor={getSubclassColor}
              />
            </div>

            {/* Info Panel: Class, Subclass, and Super */}
            <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-4">
              {/* Class Info */}
              {selectedClass && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {selectedClass}
                  </h3>
                  <p className="text-sm text-gray-300">Guardian Class</p>
                </div>
              )}

              {/* Subclass Info */}
              {currentSubclassInfo && (
                <div className={selectedClass ? "pt-4 border-t border-gray-700" : ""}>
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

              {/* Super Info */}
              {selectedSuperInfo && (
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-start gap-3">
                    <Icon category="supers" name={selectedSuperInfo.name} size={48} alt={selectedSuperInfo.name} className="flex-shrink-0" />
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
            </div>
          </div>

          {/* Abilities Selection */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Abilities</h2>
            
            {/* Compact Ability Selectors */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Choose Your Abilities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
                <AbilitySelector
                  label="Grenade"
                  iconCategory="grenades"
                  selectedValue={selectedGrenade}
                  options={availableGrenades}
                  onSelect={setSelectedGrenade}
                  getSubclassColor={getSubclassColor}
                />
                <AbilitySelector
                  label="Melee"
                  iconCategory="melees"
                  selectedValue={selectedMelee}
                  options={availableMelees}
                  onSelect={setSelectedMelee}
                  getSubclassColor={getSubclassColor}
                />
                <AbilitySelector
                  label="Class Ability"
                  iconCategory="classAbilities"
                  selectedValue={selectedClassAbility}
                  options={availableClassAbilities}
                  onSelect={setSelectedClassAbility}
                  getSubclassColor={getSubclassColor}
                />
                <AbilitySelector
                  label="Jump/Movement"
                  iconCategory="classAbilities"
                  selectedValue={selectedMovement}
                  options={availableMovementAbilities}
                  onSelect={setSelectedMovement}
                  getSubclassColor={getSubclassColor}
                />
              </div>
            </div>

            {/* Selected Abilities Info Panel */}
            {(selectedGrenade || selectedMelee || selectedClassAbility || selectedMovement) && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-3">
                {selectedGrenade && (() => {
                  const grenadeInfo = availableGrenades.find(g => g.name === selectedGrenade);
                  return grenadeInfo && (
                    <div key="grenade">
                      <div className="flex items-start gap-3">
                        <Icon category="grenades" name={grenadeInfo.name} size={40} alt={grenadeInfo.name} className="flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white text-sm">{grenadeInfo.name}</h4>
                              <p className="text-xs text-gray-400 mt-1">{grenadeInfo.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                              <span className={`text-xs ${getSubclassColor(grenadeInfo.element || '')}`}>
                                {grenadeInfo.element}
                              </span>
                              {grenadeInfo.mechanic && (
                                <div className="text-xs text-gray-500">{grenadeInfo.mechanic}</div>
                              )}
                            </div>
                          </div>
                          {grenadeInfo.effect && (
                            <div className="mt-1 text-xs text-gray-300">
                              <span className="text-destiny-primary">Effect:</span> {grenadeInfo.effect}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {selectedMelee && (() => {
                  const meleeInfo = availableMelees.find(m => m.name === selectedMelee);
                  return meleeInfo && (
                    <div key="melee" className="pt-3 border-t border-gray-700">
                      <div className="flex items-start gap-3">
                        <Icon category="melees" name={meleeInfo.name} size={40} alt={meleeInfo.name} className="flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white text-sm">{meleeInfo.name}</h4>
                              <p className="text-xs text-gray-400 mt-1">{meleeInfo.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                              <span className={`text-xs ${getSubclassColor(meleeInfo.element || '')}`}>
                                {meleeInfo.element}
                              </span>
                              {meleeInfo.type && (
                                <div className="text-xs text-gray-500">{meleeInfo.type}</div>
                              )}
                            </div>
                          </div>
                          {meleeInfo.effect && (
                            <div className="mt-1 text-xs text-gray-300">
                              <span className="text-destiny-primary">Effect:</span> {meleeInfo.effect}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {selectedClassAbility && (() => {
                  const classAbilityInfo = availableClassAbilities.find(c => c.name === selectedClassAbility);
                  return classAbilityInfo && (
                    <div key="classAbility" className="pt-3 border-t border-gray-700">
                      <div className="flex items-start gap-3">
                        <Icon category="classAbilities" name={classAbilityInfo.name} size={40} alt={classAbilityInfo.name} className="flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white text-sm">{classAbilityInfo.name}</h4>
                              <p className="text-xs text-gray-400 mt-1">{classAbilityInfo.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                              {classAbilityInfo.type && (
                                <div className="text-xs text-gray-500">{classAbilityInfo.type}</div>
                              )}
                              {classAbilityInfo.cooldown && (
                                <div className="text-xs text-gray-500">{classAbilityInfo.cooldown}</div>
                              )}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-gray-300">
                            {classAbilityInfo.primaryEffect && (
                              <div><span className="text-destiny-primary">Primary:</span> {classAbilityInfo.primaryEffect}</div>
                            )}
                            {classAbilityInfo.secondaryEffect && (
                              <div><span className="text-destiny-primary">Secondary:</span> {classAbilityInfo.secondaryEffect}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {selectedMovement && (() => {
                  const movementInfo = availableMovementAbilities.find(m => m.name === selectedMovement);
                  return movementInfo && (
                    <div key="movement" className="pt-3 border-t border-gray-700">
                      <div className="flex items-start gap-3">
                        <Icon category="classAbilities" name={movementInfo.name} size={40} alt={movementInfo.name} className="flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white text-sm">{movementInfo.name}</h4>
                              <p className="text-xs text-gray-400 mt-1">{movementInfo.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                              {movementInfo.type && (
                                <div className="text-xs text-gray-500">{movementInfo.type}</div>
                              )}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-gray-300">
                            {movementInfo.primaryEffect && (
                              <div><span className="text-destiny-primary">Primary:</span> {movementInfo.primaryEffect}</div>
                            )}
                            {movementInfo.secondaryEffect && (
                              <div><span className="text-destiny-primary">Secondary:</span> {movementInfo.secondaryEffect}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Extra Abilities Section */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-2">Extra Abilities</h2>
            <p className="text-xs text-gray-400 mb-4">
              Auto-selected based on equipped aspects and subclass
            </p>
            
            {/* Top Row: Aerials, Passive 1, Passive 2 */}
            <div className="grid grid-cols-3 gap-4 justify-items-center mb-6">
              <AutoSelectAbility
                label="Aerial"
                iconCategory="classAbilities"
                selectedValue={selectedAerial}
                selectedDetails={selectedAerialDetails}
                getSubclassColor={getSubclassColor}
                isEmpty={!selectedAerial}
              />
              <AutoSelectAbility
                label="Passive 1"
                iconCategory="aspects"
                selectedValue={selectedPassive1}
                selectedDetails={selectedPassive1Details}
                getSubclassColor={getSubclassColor}
                isEmpty={!selectedPassive1}
              />
              <AutoSelectAbility
                label="Passive 2"
                iconCategory="aspects"
                selectedValue={selectedPassive2}
                selectedDetails={selectedPassive2Details}
                getSubclassColor={getSubclassColor}
                isEmpty={!selectedPassive2}
              />
            </div>

            {/* Bottom Row: Transcendence Abilities (centered) */}
            {selectedSubclass === 'Prismatic' && (
              <div>
                <div className="text-xs text-destiny-prismatic font-semibold mb-2 text-center">
                  ⚡ TRANSCENDENCE MODE
                </div>
                <div className="grid grid-cols-2 gap-4 justify-items-center max-w-md mx-auto">
                  <AutoSelectAbility
                    label="Prismatic Melee"
                    iconCategory="melees"
                    selectedValue={selectedTranscendenceMelee}
                    selectedDetails={selectedTranscendenceMeleeDetails}
                    getSubclassColor={getSubclassColor}
                    isEmpty={!selectedTranscendenceMelee}
                  />
                  <AutoSelectAbility
                    label="Prismatic Grenade"
                    iconCategory="grenades"
                    selectedValue={selectedTranscendenceGrenade}
                    selectedDetails={selectedTranscendenceGrenadeDetails}
                    getSubclassColor={getSubclassColor}
                    isEmpty={!selectedTranscendenceGrenade}
                  />
                </div>
              </div>
            )}

            {/* Selected Extra Abilities Info Panel */}
            {(selectedAerial || selectedPassive1 || selectedPassive2 || selectedTranscendenceMelee || selectedTranscendenceGrenade) && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-3">
                <div className="text-sm font-semibold text-destiny-primary mb-2">Equipped Extra Abilities:</div>
                
                {selectedAerialDetails && (
                  <div key="aerial">
                    <div className="flex items-start gap-3">
                      <Icon category="classAbilities" name={selectedAerialDetails.name} size={40} alt={selectedAerialDetails.name} className="flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-sm">{selectedAerialDetails.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{selectedAerialDetails.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <span className="text-xs text-gray-500">Aerial</span>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-300">
                          {selectedAerialDetails.activation && (
                            <div><span className="text-destiny-primary">Activation:</span> {selectedAerialDetails.activation}</div>
                          )}
                          {selectedAerialDetails.usage && (
                            <div><span className="text-destiny-primary">Usage:</span> {selectedAerialDetails.usage}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPassive1Details && (
                  <div key="passive1" className={selectedAerialDetails ? "pt-3 border-t border-gray-700" : ""}>
                    <div className="flex items-start gap-3">
                      <Icon category="aspects" name={selectedPassive1Details.name} size={40} alt={selectedPassive1Details.name} className="flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-sm">{selectedPassive1Details.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{selectedPassive1Details.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <span className="text-xs text-gray-500">Passive 1</span>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-300">
                          {selectedPassive1Details.effect && (
                            <div><span className="text-destiny-primary">Effect:</span> {selectedPassive1Details.effect}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPassive2Details && (
                  <div key="passive2" className={(selectedAerialDetails || selectedPassive1Details) ? "pt-3 border-t border-gray-700" : ""}>
                    <div className="flex items-start gap-3">
                      <Icon category="aspects" name={selectedPassive2Details.name} size={40} alt={selectedPassive2Details.name} className="flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-sm">{selectedPassive2Details.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{selectedPassive2Details.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <span className="text-xs text-gray-500">Passive 2</span>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-300">
                          {selectedPassive2Details.effect && (
                            <div><span className="text-destiny-primary">Effect:</span> {selectedPassive2Details.effect}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTranscendenceMeleeDetails && (
                  <div key="transcendenceMelee" className={(selectedAerialDetails || selectedPassive1Details || selectedPassive2Details) ? "pt-3 border-t border-gray-700" : ""}>
                    <div className="flex items-start gap-3">
                      <Icon category="melees" name={selectedTranscendenceMeleeDetails.name} size={40} alt={selectedTranscendenceMeleeDetails.name} className="flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-sm">{selectedTranscendenceMeleeDetails.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{selectedTranscendenceMeleeDetails.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <span className="text-xs text-destiny-prismatic">Transcendence Melee</span>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-300">
                          {selectedTranscendenceMeleeDetails.buffs && (
                            <div><span className="text-destiny-primary">Buffs:</span> {selectedTranscendenceMeleeDetails.buffs}</div>
                          )}
                          {selectedTranscendenceMeleeDetails.activation && (
                            <div><span className="text-destiny-primary">Activation:</span> {selectedTranscendenceMeleeDetails.activation}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTranscendenceGrenadeDetails && (
                  <div key="transcendenceGrenade" className={(selectedAerialDetails || selectedPassive1Details || selectedPassive2Details || selectedTranscendenceMeleeDetails) ? "pt-3 border-t border-gray-700" : ""}>
                    <div className="flex items-start gap-3">
                      <Icon category="grenades" name={selectedTranscendenceGrenadeDetails.name} size={40} alt={selectedTranscendenceGrenadeDetails.name} className="flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-sm">{selectedTranscendenceGrenadeDetails.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{selectedTranscendenceGrenadeDetails.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <span className="text-xs text-destiny-prismatic">Transcendence Grenade</span>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-300">
                          {selectedTranscendenceGrenadeDetails.buffs && (
                            <div><span className="text-destiny-primary">Buffs:</span> {selectedTranscendenceGrenadeDetails.buffs}</div>
                          )}
                          {selectedTranscendenceGrenadeDetails.activation && (
                            <div><span className="text-destiny-primary">Activation:</span> {selectedTranscendenceGrenadeDetails.activation}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400">
                    <div className="font-semibold text-destiny-primary mb-1">About Extra Abilities:</div>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li><strong>Aerials:</strong> Movement abilities activated in air or while sliding, unlocked by specific aspects</li>
                      <li><strong>Passives:</strong> Automatic effects provided by aspects (some require interaction)</li>
                      {selectedSubclass === 'Prismatic' && (
                        <li><strong>Transcendence:</strong> Prismatic-only enhanced abilities during Transcendence mode (~30s + kills)</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Aspects */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-2">
              Aspects <span className="text-sm text-gray-400">({selectedAspects.length}/2)</span>
            </h2>
            <p className="text-xs text-gray-400 mb-3">Select up to 2 aspects to customize your subclass</p>
            
            {/* Compact Aspect Selectors */}
            <div className="grid grid-cols-2 gap-4 justify-items-center mb-4">
              <AspectSelector
                slotIndex={0}
                selectedAspects={selectedAspects}
                availableAspects={availableAspects}
                onToggle={handleAspectToggle}
                getSubclassColor={getSubclassColor}
              />
              <AspectSelector
                slotIndex={1}
                selectedAspects={selectedAspects}
                availableAspects={availableAspects}
                onToggle={handleAspectToggle}
                getSubclassColor={getSubclassColor}
              />
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
                    <Icon category="fragments" name={fragment.name} size={32} alt={fragment.name} className="flex-shrink-0" />
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
              disabled={saving || !buildName || !selectedClass || !selectedSubclass || !selectedSuper}
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
              
              {selectedClass && (
                <div>
                  <div className="text-gray-400">Class</div>
                  <div className="text-white">{selectedClass}</div>
                </div>
              )}
              
              {selectedSubclass && (
                <div>
                  <div className="text-gray-400">Subclass</div>
                  <div className={getSubclassColor(selectedSubclass)}>{selectedSubclass}</div>
                </div>
              )}
              
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
