# 🎮 D2-Guardian-Forge - DESTINY 2 EDGE OF FATE 2025 BUILD ELEMENTS

**Versión**: 1.0.0 | Post Edge of Fate (Confines del Destino)
**Fecha Actualización**: 18 Diciembre 2025
**Compatibilidad**: Kepler, Renegades, Armor 3.0 Final

---

## 📊 RESUMEN CAMBIOS PRINCIPALES

### Armor 3.0 (Edge of Fate)
- ✅ Stats cambian de nombres (Mobility→Weapons, Resilience→Health, Recovery→Class, etc)
- ✅ Stats ahora van de **0-200** (antes 0-100)
- ✅ **Cada punto cuenta** (antes incrementos de 10)
- ✅ Tier 2 bonuses (100-200) ofrecen bonuses secundarios sustanciales
- ✅ Nuevos arquetipos de armaduras (6 tipos)
- ✅ Set bonuses regresan (Tier 4, Tier 5 bonuses)

### Resilience y Mobility Fixed
- **Resilience**: Fixed a 100 para TODOS (30% damage resistance base)
- **Mobility**: Fixed a 30 (Titans/Warlocks), 40 (Hunters)
- Customizable vía mods (Enhanced Athletics leg mod)

---

## 🎯 ESTRUCTURA BUILD COMPLETA POR CLASE

### ESTRUCTURA UNIVERSAL
```
BUILD = {
  class: Warlock | Titan | Hunter
  subclass: Solar | Arc | Void | Stasis | Strand | Prismatic
  super: [Super ability]
  abilities: {
    grenade: [Grenade type]
    melee: [Melee ability]
    classAbility: [Class-specific ability]
  }
  movement: [Movement ability - linked to class]
  aspects: [Aspect 1, Aspect 2] (2 seleccionables)
  fragments: [Fragment 1-6] (5-6 dinámicos según aspectos)
  weapons: {
    kinetic: [Weapon]
    energy: [Weapon]
    power: [Weapon]
  }
  armor: {
    head: [Armor piece + archetype]
    hands: [Armor piece + archetype]
    chest: [Armor piece + archetype]
    legs: [Armor piece + archetype]
    classItem: [Armor piece + archetype]
  }
  mods: [Mod 1-5] (5 mod slots, arquetipos específicos)
  stats: {
    weapons: 0-200
    health: 0-200
    class: 0-200
    melee: 0-200
    grenade: 0-200
    super: 0-200
  }
  artifactPerks: [Perk 1, Perk 2, ...]
}
```

---

## 🧙 WARLOCK - HECHICERO

### SUPERS (6 Total: 1 por subclass + Prismatic)

#### Solar Subclass - Dawnblade (Portador del Amanecer)
**Super**: Well of Radiance
- Crea pozo de poder luminoso que otorga:
  - +25% daño a aliados dentro
  - Regeneración continua
  - Duración: 30 segundos
  - Uso: Support/DPS

**Alternative Super**: Phoenix Dive (Prismatic)
- Dive rápido con explosión solar
- Restaura salud
- Daño AoE menor

#### Arc Subclass - Stormcaller (Invocatormenta)
**Super**: Chaos Reach
- Rayo prolongado direccionable
- Duración: 8 segundos (controlable)
- Daño alto sostenido
- Uso: DPS puro

**Alternative Super**: Arc Soul (Prismatic)
- Familiar de arco que dispara a enemigos
- Regenerable con grenade/melee hits
- Soporte aéreo

#### Void Subclass - Voidwalker (Caminante del Vacío)
**Super**: Nova Bomb
- Esfera de vacío lanzada
- Explosion massive en impacto
- 2 modos: Cataclysm (tracking) / Vortex (vortex damaging)
- Daño inmediato alto

**Alternative Super**: Void Sentinel (Prismatic)
- Escudo de vacío que bloquea/devuelve daño
- Uso defensivo

#### Stasis Subclass - Shadebinder (Encadenador de Sombras)
**Super**: Winter's Wrath
- Rayo de hielo lanzado
- Congela enemigos múltiples
- AoE freezing en impacto
- Duración: 10 segundos

**Alternative Super**: Shatter Blast (Prismatic)
- Rompimiento de hielo
- Daño físico alto
- Knockback

#### Strand Subclass - Threadrunner (Corredor de Hebras)
**Super**: Needlestorm
- Lluvia de agujas de hebra
- Cubre zona amplia
- Cada aguja congela y daña
- Duración: 12 segundos

**Alternative Super**: Grapple (Prismatic)
- Gancho de hebra para movilidad
- Redeploy rápido

#### Prismatic Subclass
**Supers Disponibles**: Todos (seleccionar 1)
- Combina elementos de todas las subclases
- Supers más versátiles
- Mejor sinergia con mods

---

### ABILITIES - WARLOCK

#### GRENADES (Granadas) - 3 por Subclass

**SOLAR GRENADES**:
1. Solar Grenade - Zona de fuego prolongado
   - Daño continuo
   - Calienta enemigos
   - Duración: 8 seg

2. Fusion Grenade - Grenada adhesiva
   - Explosión en impacto o tiempo
   - Daño explosivo alto
   - Uso: Close-range burst

3. Swarm Grenade - Enjambre de granadas pequeñas
   - Multi-explosiones
   - Dispersa enemigos
   - Daño medio distribuido

**ARC GRENADES**:
1. Arcbolt Grenade - Rayo saltador
   - Salta entre enemigos
   - Cadena eléctrica
   - Máx 5 targets

2. Flashbang Grenade - Granada cegadora
   - Ceguera transitoria
   - Daño mínimo
   - Utilidad CC

3. Pulse Grenade - Explosión de pulsos
   - Múltiples explosiones en el tiempo
   - Radio medio
   - Daño acumulativo

**VOID GRENADES**:
1. Vortex Grenade - Remolino de vacío
   - Daño persistente en área
   - Atrae enemigos al centro
   - Duración: 10 seg

2. Scatter Grenade - Dispersión de proyectiles
   - Múltiples fragmentos
   - Cobertura amplia
   - Impacto bajo pero múltiple

3. Magnetic Grenade - Granada magnética
   - Se adhiere a enemigos/superficies
   - Explosión retrasada
   - Detonación remotable

**STASIS GRENADES**:
1. Duskfield Grenade - Campo de hielo
   - Congela en área
   - Reduce velocidad salida
   - Duración: 6 seg

2. Coldsnap Grenade - Onda de hielo
   - Persigue enemigos
   - Congela automáticamente
   - Cadena menor

3. Glacier Grenade - Muro de hielo
   - Crea obstáculos
   - Protección temporal
   - Destrozo destructible

**STRAND GRENADES**:
1. Threadling Grenade - Cría de hebra
   - Threadlings atacan enemigos
   - Regeneran con daño
   - Duración: 15 seg

2. Shackle Grenade - Restricción de hebra
   - Congela movimiento
   - Conexión con aliados
   - Utilitario

3. Grapple Grenade (Alt) - Gancho de hebra
   - Movilidad mejorada
   - Redeploy rápido
   - Menos daño

**PRISMATIC GRENADES**:
- Acceso a 2+ de cualquier subclass
- Sinergia inter-elementos

#### MELEE ABILITIES (Habilidades Cuerpo a Cuerpo) - 3 por Subclass

**SOLAR MELEE**:
1. Celestial Fire - Proyectil de fuego
   - Golpe a distancia
   - Persigue enemigo
   - Daño medio-alto

2. Phoenix Dive - Buceo con fuego
   - Movilidad + Daño AoE
   - Restaura salud pequeño
   - Corto alcance

3. Flare Nova - Explosión solar
   - Impacto AoE
   - Calienta enemigos
   - Daño burst

**ARC MELEE**:
1. Ionic Trace - Rastro eléctrico
   - Rápido
   - Daño eléctrico
   - Genera munición

2. Chain Lightning - Cadena eléctrica
   - Múltiples enemigos
   - Daño distribuido
   - Corta duración

3. Arc Web - Malla eléctrica
   - Conexión entre enemigos
   - Daño amplificado
   - Radio pequeño

**VOID MELEE**:
1. Entropic Pull - Atracción de vacío
   - Tira enemigos
   - Restaura energía grenade
   - Medio alcance

2. Void Tendrils - Tentáculos de vacío
   - AoE en impacto
   - Oscurecer enemigos
   - Radio medio

3. Devour Strike - Golpe voraz
   - Restaura salud al golpear
   - Buff temporal
   - Muy útil sustain

**STASIS MELEE**:
1. Penumbral Blast - Onda de hielo
   - Congela enemigo golpeado
   - Velocidad alta
   - Rango corto

2. Glacial Spike - Púa de hielo
   - Proyectil congelador
   - Daño explosivo
   - Persigue enemigos

3. Shard Storm - Tormenta de cristales
   - AoE congelador
   - Múltiples cristales
   - Radio amplio

**STRAND MELEE**:
1. Grapple Melee - Agarre de hebra
   - Ganchos a distancia
   - Restaura energía
   - Herramienta de movilidad

2. Strand Strike - Golpe de hebra
   - Daño con proyectil
   - Conexión con aliados
   - Utilidad

3. Unraveling Rounds - Proyectiles desenredadores
   - Múltiples projectiles
   - Desmaya enemigos
   - Daño bajo

**PRISMATIC MELEE**:
- Combina elementos
- Sinergia total

#### CLASS ABILITY (Habilidad de Clase) - 1 por Warlock

**RIFT** (Grieta de Energía) - Única del Warlock

1. **Healing Rift** (Grieta Curativa)
   - Centro: +20% regeneración salud
   - Aliados: +40% regen salud
   - Duración: 10 seg
   - Cooldown: 40 seg (Base, mejora con Class stat)
   - **Tier 1 (0-100 Class)**: Base cooldown reduction
   - **Tier 2 (101-200 Class)**: +20% habilidad bonus + reducción adicional
   - **Uso**: Support, survivability

2. **Empowering Rift** (Grieta Potenciadora)
   - Centro: +20% daño armas
   - Aliados: +30% daño
   - Duración: 10 seg
   - **Uso**: DPS support, burst windows

3. **Ionic Rift** (Prismatic Alt)
   - Descarga eléctrica en impacto
   - Bonus minúsculo daño
   - Movilidad Warlock

#### MOVEMENT (Movimiento) - Especial Warlock

**GLIDE** (Planeo)
- Default para todos Warlocks
- 3 tipos:
  1. **Balanced Glide**: Velocidad media, control máximo
  2. **Strafe Glide**: Velocidad alta, control reducido
  3. **Burst Glide**: Velocidad máxima inicial, decelera
- Controlable con input
- Fixed mobility (40 Warlocks)

#### AERIAL ABILITIES (Habilidades Aéreas)

Warlocks NO tienen habilidades aéreas específicas adicionales fuera de:
- Glide + weapon usage
- Rift (si se lanza)
- Melee aereo

---

### ASPECTS - WARLOCK (2 seleccionables por Subclass)

#### SOLAR ASPECTS (Warlock)
1. **Balance of Power** (Equilibrio de Poder)
   - Golpe melee sin energía amplifica grenade
   - Golpe grenade amplifica melee siguiente
   - **Beneficio**: Ciclo energético mejor

2. **Knockout** (Golpe Noqueador)
   - Melee empodera: +20% daño armas siguiente
   - Duración: 10 seg
   - **Beneficio**: Burst windows

3. **Reverberation** (Reverberación)
   - Granadas finales: Daño aumentado
   - Explosión secundaria
   - **Beneficio**: Daño grenade alto

4. **Incinerator Snap** (Chasquido Incinerador)
   - Melee activa quemado en área
   - Sinergia grenade
   - **Beneficio**: AoE damage setup

**SELECT 2 de 4**

#### ARC ASPECTS (Warlock)
1. **Electrostatic Mind** (Mente Electroestática)
   - Matar con Arc energía: genera Arc Soul a aliado cercano
   - Persiste hasta death
   - **Beneficio**: Ally damage amplification

2. **Knockout** (Ya mencionado)
   - Melee empodera
   - **Aplicable a Arc**

3. **Graction** (Tracción Eléctrica) - NEW
   - Melee golpea: velocidad melee aumentada
   - Cadena eléctrica visible
   - **Beneficio**: Melee rushing

4. **Blinding Feedback** (Retroalimentación Cegadora)
   - Daño Arc tomado: siguiente grenade ciega
   - Daño reflectado
   - **Beneficio**: Defensive utility

**SELECT 2 de 4**

#### VOID ASPECTS (Warlock)
1. **Child of the Old Gods** (Hijo de los Dioses Antiguos)
   - Rift crea familiar de vacío vigilante
   - Daña enemigos
   - **Beneficio**: Rift damage amplification

2. **Void Anchor** (Ancla de Vacío)
   - Melee Void: ancla enemigo en lugar
   - Reduced velocidad
   - **Beneficio**: Control de enemigos

3. **Obsidian Accelerator** (Acelerador de Obsidiana)
   - Voided enemies: movimiento reducido
   - Todos sufren reducción
   - **Beneficio**: Area denial

4. **Entropic Downdraft** (Corriente Descendente Entrópica)
   - Rift impulsa hacia arriba
   - Grenade mejorada
   - **Beneficio**: Verticality

**SELECT 2 de 4**

#### STASIS ASPECTS (Warlock)
1. **Bleak Watcher** (Vigilante Desolado)
   - Grenade Duskfield: crea turret congelador
   - Duración: 20 seg
   - **Beneficio**: Area denial turret

2. **Glacial Harvest** (Cosecha Glacial)
   - Congelados estallam: crean cristales
   - Regeneración lenta energía
   - **Beneficio**: Crowd control stacking

3. **Frostpulse** (Pulso de Hielo)
   - Melee Stasis: onda congeladora
   - Radio medio
   - **Beneficio**: Fast freeze

4. **Shattered Reality** (Realidad Fracturada)
   - Enemigos congelados destruyen cristales
   - Detonación extra
   - **Beneficio**: Damage multiplier

**SELECT 2 de 4**

#### STRAND ASPECTS (Warlock)
1. **Weavewalk** (Paseo de Hebra)
   - Golpe melee: teletransporte corto
   - Invulnerabilidad transitoria
   - **Beneficio**: Dodge mobility

2. **Threadling Swarm** (Enjambre de Hebra)
   - Grenade genera múltiples Threadlings
   - Ataque coordinado
   - **Beneficio**: Minion army

3. **Unraveling Rounds** (Proyectiles Desenredadores)
   - Armas desenredan enemigos
   - Desmaya temporal
   - **Beneficio**: Crowd control

4. **Strand Savant** (Sabio de Hebra)
   - Melee Strand: genera Threadling
   - Ataque automático
   - **Beneficio**: Companion generation

**SELECT 2 de 4**

#### PRISMATIC ASPECTS (Warlock)
- Acceso a 1 aspecto de cualquier subclass
- Combina sinergia total

---

### FRAGMENTS - WARLOCK (5-6 Dinámicos)

#### SOLAR FRAGMENTS (disponibles si Solar aspect seleccionado)

**Primary Fragments** (Siempre disponibles):
1. **Font of Might** (Fuente de Poder)
   - Super hit: +20% daño armas mismo elemento
   - Duración: 10 seg
   - **Tier**: Base buff

2. **Font of Retaliation** (Fuente de Represalia)
   - Daño tomado: +15% daño siguiente ataque
   - Stacking: Máx 3x
   - **Tier**: Defensive counter

3. **Solar Kindling** (Yesca Solar)
   - Quemados cerca: duración aumentada
   - Radio: 15m
   - **Tier**: Buff aura

4. **Restoration** (Restauración)
   - Habilidades de clase: +40% salud regen
   - Duración: 5 seg por hit
   - **Tier**: Sustain

5. **Crystalline Overload** (Sobrecarga Cristalina)
   - Daño crítico: Calienta enemigo
   - Stacking: Detonación en quemado
   - **Tier**: High damage

6. **Solar Detonation** (Detonación Solar)
   - Quemados explotan
   - +50% daño solo
   - **Tier**: Explosive damage

**SELECT 5-6 dinámicamente según aspectos**

#### ARC FRAGMENTS (disponibles si Arc aspect seleccionado)

1. **Arc Amplification** (Amplificación de Arco)
   - Arc damage: +25% velocidad recarga
   - Duración: 8 seg
   - **Tier**: Damage amplifier

2. **Feedback Loop** (Bucle de Retroalimentación)
   - Daño Arc tomado: super energy +10%
   - Cadena: máx 3 veces
   - **Tier**: Energy battery

3. **Arc Conductivity** (Conductividad de Arco)
   - Enemigos electrocutados: radius +100%
   - Daño transferencia
   - **Tier**: Spread damage

4. **Recharge Overload** (Sobrecarga de Recarga)
   - Energía de habilidad: generación +35%
   - Duración: 12 seg
   - **Tier**: High uptime

5. **Arc Ballistics** (Balística de Arco)
   - Armas: knockback mejorado
   - Control movilidad enemigos
   - **Tier**: Control

6. **Electrostatic Surge** (Onda Electroestática)
   - Melee Electrocuta: +30% siguiente daño
   - Duration: 6 seg
   - **Tier**: Burst window

**SELECT 5-6**

#### VOID FRAGMENTS (disponibles si Void aspect seleccionado)

1. **Void Detonation** (Detonación de Vacío)
   - Voided enemies: explosión en muerte
   - AoE radius: 20m
   - **Tier**: Explosive chains

2. **Void Resilience** (Resiliencia de Vacío)
   - Debuff enemies: -20% daño salida
   - Propagación: aliados cercanos
   - **Tier**: Defensive aura

3. **Shattered Reality** (Realidad Fracturada)
   - Melee destroy cover
   - Exposición enemigos
   - **Tier**: Tactical advantage

4. **Overshadow** (Ensombrecimiento)
   - Debuffed: -30% velocidad
   - Stacking: duración aumenta
   - **Tier**: Kiting

5. **Void Echo** (Eco de Vacío)
   - Damage Void: genera sombra secundaria
   - Duración: 8 seg
   - **Tier**: Damage multiplier

6. **Hunger** (Hambre)
   - Grenade hit: restaura 50% salud
   - Debuffed enemies: +30% restauración
   - **Tier**: Sustain

**SELECT 5-6**

#### STASIS FRAGMENTS (disponibles si Stasis aspect seleccionado)

1. **Frost Armor** (Armadura de Hielo)
   - Congelados cercanos: +30% reduction daño
   - Radiance: 25m
   - **Tier**: Defense

2. **Shattering Blows** (Golpes Quiebra)
   - Congelados rotos: +40% crit damage
   - Duración: 5 seg
   - **Tier**: Damage amplifier

3. **Crystalline Fracture** (Fractura Cristalina)
   - Grenada Stasis: cristales duplicados
   - Dispersión amplia
   - **Tier**: Area control

4. **Glacial Fortification** (Fortificación Glacial)
   - Aliados congelados: +50% resistencia
   - Transferencia daño
   - **Tier**: Ally protection

5. **Perpetual Chill** (Frío Perpetuo)
   - Congelados: duración +50%
   - Permanencia aumentada
   - **Tier**: Control duration

6. **Glacial Eruption** (Erupción Glacial)
   - Congelados caen: explosión cristal
   - Daño AoE: 30m
   - **Tier**: Explosive chains

**SELECT 5-6**

#### STRAND FRAGMENTS (disponibles si Strand aspect seleccionado)

1. **Threadling Spawn** (Generación de Hebra)
   - Melee Strand: cría 2 Threadlings
   - Independientes atacan
   - **Tier**: Minion generation

2. **Strand Fortitude** (Fortaleza de Hebra)
   - Threadlings cerca: +25% durabilidad
   - Buff aura: 20m
   - **Tier**: Companion protection

3. **Unraveling Connection** (Conexión Desenredadora)
   - Enemigos desenredados: aliados +20% daño
   - Propagación: 15m
   - **Tier**: Buff synergy

4. **Strand Echo** (Eco de Hebra)
   - Dañar enemigos: Threadling duplicado
   - Máx 5 Threadlings
   - **Tier**: Scaling minions

5. **Weavewalk Persistence** (Persistencia Paseo Hebra)
   - Teletransporte dura +3 seg invulnerabilidad
   - Reactivable
   - **Tier**: Mobility defense

6. **Strand Resilience** (Resiliencia de Hebra)
   - Conexión hebra: -40% daño recibido
   - Radio: 25m
   - **Tier**: Passive defense

**SELECT 5-6**

#### PRISMATIC FRAGMENTS (Todos)

Acceso a 1-2 de fragmentos de múltiples subclasses combinadas.

---

### ARMOR ARCHETYPES - WARLOCK + ARMOR 3.0

#### 6 ARQUETIPOS ARMOR (Edge of Fate)

**1. BOMBARDERO (Bombardier)** ✓
- **Primary Stat**: Weapons (hasta +30)
- **Secondary Stat**: Melee (hasta +25)
- **Tertiary Stat**: Random (hasta +20)
- **Beneficio Principal**: Reload + Weapon damage amplification
- **Beneficio Secundario**: Melee cooldown reduction
- **Uso Ideal**: Gunslinger builds, weapon-focused
- **Masterwork**: Añade stats en Grenade/Super/Class

**2. ESPECIALISTA (Specialist)** ✓
- **Primary Stat**: Class (hasta +30)
- **Secondary Stat**: Grenade (hasta +25)
- **Tertiary Stat**: Random (hasta +20)
- **Beneficio Principal**: Class ability regen máxima
- **Beneficio Secundario**: Grenade cooldown reducción
- **Uso Ideal**: Rift spam, ability-focused Warlock
- **Masterwork**: Health/Melee/Weapons stats

**3. EJEMPLAR (Exemplar)** ✓
- **Primary Stat**: Super (hasta +30)
- **Secondary Stat**: Health (hasta +25)
- **Tertiary Stat**: Random (hasta +20)
- **Beneficio Principal**: Super energy generation máxima
- **Beneficio Secundario**: Flinch resistance + shield capacity
- **Uso Ideal**: Super-spam builds, raid burst
- **Masterwork**: Grenade/Melee/Class stats

**4. CAMORRISTA (Brawler)** ✓
- **Primary Stat**: Melee (hasta +30)
- **Secondary Stat**: Grenade (hasta +25)
- **Tertiary Stat**: Random (hasta +20)
- **Beneficio Principal**: Melee ability regen máxima
- **Beneficio Secundario**: Grenade cooldown reducción
- **Uso Ideal**: Melee-focused builds, Warlock close-range
- **Masterwork**: Weapons/Health/Super/Class stats

**5. GRANÁDERO (Gunner)** ✓
- **Primary Stat**: Weapons (hasta +30)
- **Secondary Stat**: Grenade (hasta +25)
- **Tertiary Stat**: Random (hasta +20)
- **Beneficio Principal**: Weapon handling + Reload speed
- **Beneficio Secundario**: Grenade cooldown + damage
- **Uso Ideal**: Hybrid weapon/grenade builds
- **Masterwork**: Class/Melee/Health/Super stats

**6. GUARDIÁN (Stalwart)** ✓
- **Primary Stat**: Health (hasta +30)
- **Secondary Stat**: Class (hasta +25)
- **Tertiary Stat**: Random (hasta +20)
- **Beneficio Principal**: Flinch resistance máxima + Shield capacity
- **Beneficio Secundario**: Class ability regen
- **Uso Ideal**: Tank builds, survivability focus
- **Masterwork**: Weapons/Grenade/Melee/Super stats

#### STAT ALLOCATION STRATEGY

Total stats per armor piece: ~78-98 (depending on masterwork)
- Primary: ~30-35
- Secondary: ~25-30
- Tertiary: ~18-25
- Fixed: Resilience (100), Mobility (30 base for Warlocks)

**Full set (5 pieces) potential**:
- Weapons: ~160-175 max
- Health: ~160-175 max
- Class: ~160-175 max
- Melee: ~160-175 max
- Grenade: ~160-175 max
- Super: ~160-175 max

**Realistic optimized set** (avoiding waste):
- Total distributed: 600-700 stats
- Example: W170, H140, C100, M180, G190, S150 = 930 total (impossible)
- Realístico: W150, H120, C100, M160, G170, S100 = 800 total

---

### MODS WARLOCK - ARMOR 3.0 (5 SLOTS)

#### MOD SLOT DISTRIBUTION

Each armor piece: 10 energy slots (special: Tier 5 = 11 + 1 tuning slot)
- Head: 10 energy
- Hands: 10 energy
- Chest: 10 energy
- Legs: 10 energy (+ Enhanced Athletics leg mod)
- Class Item: 10 energy

**Total per full build**: 50 energy for mods

#### MOD TYPES & BENEFITS

**WEAPON MODS** (2-3 slots típico)
- Font of Might: Super → +20% same element damage (10 energy)
- Rampage Spec: Weapons → +10% reload on kills (5 energy)
- Kill Tracker: Tracking kills (3 energy)
- **Prohibido**: Stacking 2 Font of Might (redundant)

**ABILITY MODS** (2-3 slots típico)
- Hands-On: Melee hit → +40% weapon damage next (5 energy)
- Elemental Time Dilation: Ability effect +20% duration (10 energy)
- Recharge Overload: Ability energy +35% generation (10 energy)
- **Prohibido**: Stacking Recharge Overload 2x (overcap)

**CLASS ABILITY MODS** (1-2 slots)
- Well of Life: Ally in Rift → +50% healing (8 energy)
- Widows Well: Damage in Rift → +15% output (8 energy)
- **Prohibido**: Both Well mods (redundant)

**DEFENSIVE MODS** (1-2 slots)
- Resilience Mod: +5 Health stat (5 energy)
- Recuperation: Orbs of Power → Restoration effect (8 energy)
- Barrier: +20% reduction damage (10 energy)
- **Prohibido**: Stacking 2+ Barrier mods

**MOBILITY/UTILITY MODS** (0-1 slots)
- Enhanced Athletics: Leg mod → +10 Mobility (5 energy)
- Bountiful Harvest: Drops → better ammo (5 energy)

**MOD SET PROHIBITIONS**:
1. ❌ 2x Font of Might (energy duplication issue)
2. ❌ 2x Recharge Overload (overcap ability energy)
3. ❌ 2x Well of Life (redundant healing)
4. ❌ 3x Barrier (stacking cap 2 only)
5. ❌ Font of Might + Element Conversion (conflicting triggers)
6. ❌ Mobility mod + Class ability mod (conflicting resources)
7. ❌ 3+ stat tuning mods (limited slots)

---

## 🤖 TITAN - TITÁN

### SUPERS (6 Total)

#### Solar Subclass - Sentinel (Centinela)
**Super**: Sentinel Shield
- Escudo plasma solar
- Golpea con daño AoE
- Bloquea daño incoming
- Duración: 25 seg
- **Uso**: Defense/DPS hybrid

#### Arc Subclass - Sentinel (Centinela)
**Super**: Sentinel Strike
- Rayo eléctrico en golpe
- Cadena a múltiples enemies
- Daño burst alto
- Duración: 12 seg
- **Uso**: Crowd control

#### Void Subclass - Sentinel (Centinela)
**Super**: Sentinel Void
- Escudo vacío versátil
- Absorbe daño
- Deja trampas
- Duración: 20 seg
- **Uso**: Trap setup

#### Stasis Subclass - Behemoth (Leviatán)
**Super**: Glacial Quake
- Salta congelador
- Congela área amplia
- Daño sostenido
- Duración: 15 seg
- **Uso**: Area denial

#### Strand Subclass - Behemoth (Leviatán)
**Super**: Strand Grenade Throw
- Lanza múltiples granadas hebra
- Genera Threadlings
- AoE amplia
- **Uso**: Minion generation

#### Prismatic Subclass
**Supers**: Todos (seleccionar 1)

---

### ABILITIES - TITAN

#### GRENADES - 3 por Subclass

**SOLAR**: Thermite, Incendiary, Flashbang
**ARC**: Arcbolt, Pulse, Shock
**VOID**: Vortex, Magnetic, Suppressor
**STASIS**: Duskfield, Coldsnap, Glacier
**STRAND**: Threadling, Shackle, Grapple

#### MELEE - 3 por Subclass

**SOLAR**: Seismic Strike, Ballistic Slam, Sun Strike
**ARC**: Jolt Strike, Chain Lightning, Arc Web
**VOID**: Void Strike, Nova Lance, Void Bomb
**STASIS**: Penumbral Blast, Glacial Spike, Shard Storm
**STRAND**: Grapple Melee, Strand Strike, Unraveling Rounds

#### CLASS ABILITY - Barrier (Barrera)

1. **Towering Barricade** (Barrera Elevada)
   - Escudo alto inmóvil
   - Protección total frontal
   - Regenera lentamente
   - Duración: 10 seg
   - **Uso**: Long-range cover

2. **Rally Barricade** (Barrera de Concentración)
   - Escudo bajo con ventana disparo
   - +20% weapon damage through
   - Recarga rápida
   - Duración: 8 seg
   - **Uso**: Offensive support

3. **Towering + Weapon Amp** (Prismatic)
   - Combo barrera + daño
   - Híbrido defensivo/ofensivo
   - **Uso**: Versatility

#### MOVEMENT - Strafe/Lift

**LIFT** (Impulso)
- Default Titan
- 3 tipos:
  1. **Balanced Lift**: Control máximo
  2. **Strafe Lift**: Velocidad horizontal
  3. **High Lift**: Altura vertical
- Controlable

---

### ASPECTS - TITAN (2 seleccionables)

Same 24 aspects como Warlock pero aplicados a Titan abilities/playstyle

**SOLAR ASPECTS FOR TITAN**:
- Knockout, Balance of Power, Reverberation, Incinerator Snap

**ARC ASPECTS FOR TITAN**:
- Electrostatic Mind, Knockout, Graction, Blinding Feedback

**VOID ASPECTS FOR TITAN**:
- Child of the Old Gods, Void Anchor, Obsidian Accelerator, Entropic Downdraft

**STASIS ASPECTS FOR TITAN**:
- Bleak Watcher, Glacial Harvest, Frostpulse, Shattered Reality

**STRAND ASPECTS FOR TITAN**:
- Weavewalk, Threadling Swarm, Unraveling Rounds, Strand Savant

---

### FRAGMENTS - TITAN (5-6 Dinámicos)

Same 30+ fragments like Warlock, used identically.

---

### ARMOR ARCHETYPES - TITAN

Same 6 arquetipos:
1. **Bombardero**: Weapons primary
2. **Especialista**: Class primary
3. **Ejemplar**: Super primary
4. **Camorrista**: Melee primary
5. **Granádero**: Weapons + Grenade
6. **Guardián**: Health primary

---

### MODS - TITAN (5 SLOTS)

Same mod system as Warlock.

---

## 🏹 HUNTER - CAZADOR

### SUPERS (6 Total)

#### Solar Subclass - Gunslinger (Pistolero)
**Super**: Golden Gun
- 6 disparos de fuego solar
- Daño crítico ALTO
- Precision kill → refund bullet
- Duración: 12 seg
- **Uso**: Sniper role, precision

#### Arc Subclass - Arcstrider (Esgrimidor de Arco)
**Super**: Arcstaff
- Lanza arco eléctrico
- Golpes rápidos
- Daño cadena
- Duración: 20 seg
- **Uso**: Melee rush, AoE

#### Void Subclass - Nightstalker (Acechador Nocturno)
**Super**: Shadowshot
- Flecha de sombra
- Debuffs enemies (all daño -30%)
- Tethers múltiples enemigos
- Duración: 30 seg
- **Uso**: Support, debuff

#### Stasis Subclass - Revenant (Aparición)
**Super**: Stasis Revolver
- Revólver congelador
- Precisión congeladora rápida
- AoE en impacto
- Duración: 12 seg
- **Uso**: Freeze control

#### Strand Subclass - Threadrunner (Corredor Hebra)
**Super**: Threadling Net
- Red de Threadlings
- Genera múltiples minions
- Persiguen enemigos
- Duración: 20 seg
- **Uso**: Minion army

#### Prismatic Subclass
**Supers**: Todos (select 1)

---

### ABILITIES - HUNTER

#### GRENADES - 3 por Subclass

Same as Warlock/Titan (Solar, Arc, Void, Stasis, Strand options)

#### MELEE - 3 por Subclass

Same as Warlock/Titan

#### CLASS ABILITY - Dodge (Esquiva)

1. **Marksman's Dodge** (Esquiva de Tirador)
   - Esquiva lateral
   - Recarga arma primaria
   - Duración: Instant
   - Cooldown: 9 seg base
   - **Uso**: Weapon sustain

2. **Acrobat's Dodge** (Esquiva de Acróbata)
   - Esquiva rotativa
   - Restaura energía grenade
   - Duración: Instant
   - **Uso**: Ability uptime

3. **Evasion Dodge** (Prismatic Alt)
   - Esquiva + invisibilidad transitoria
   - Buffs temporarios
   - **Uso**: Defensive evasion

#### MOVEMENT - Double Jump / Glide Variants

**JUMP** (Salto)
- Default Hunter
- 3 tipos:
  1. **High Jump**: Altura máxima
  2. **Strafe Jump**: Control horizontal
  3. **Triple Jump**: 3 saltos encadenados (alt)
- Fixed Mobility: 40 base (Hunters)

---

### ASPECTS - HUNTER (2 seleccionables)

Same as Titan/Warlock, adapted to Hunter abilities.

---

### FRAGMENTS - HUNTER (5-6 Dinámicos)

Same 30+ fragments, used identically.

---

### ARMOR ARCHETYPES - HUNTER

Same 6 arquetipos like Titans/Warlocks.

---

### MODS - HUNTER (5 SLOTS)

Same mod system.

---

## 📊 NEW STATS SYSTEM - ARMOR 3.0 EDGE OF FATE

### STAT OVERHAUL

#### OLD → NEW CONVERSION
```
Mobility       → Weapons
Resilience     → Health
Recovery       → Class
Strength       → Melee
Discipline     → Grenade
Intellect      → Super
```

#### AUTO-CONVERSION
All existing armor automatically converts 1:1
- Mobility 100 → Weapons 100
- Resilience 100 → Health 100
- etc.

---

### DETAILED STAT BREAKDOWN

#### 1. **WEAPONS** (was Mobility)
**Range**: 0-200
**Fixed Base**: 
- Titans/Warlocks: 30
- Hunters: 40

**Tier 1 (0-100)**:
- Reload speed: 0-10%
- Handling: 0-10%
- Weapon damage (primary/special): 0-10% PvE
- Weapon damage vs Guardians: 0-3% PvP

**Tier 2 (101-200 Bonus)**:
- Reload speed +10% ADDITIONAL (total 20%)
- Handling +10% ADDITIONAL (total 20%)
- Weapon damage (primary/special): +15% PvE ADDITIONAL (total 25%)
- Weapon damage (heavy): +10% PvE ADDITIONAL (total 20%)
- Weapon damage vs Guardians: +6% ADDITIONAL (total 9% PvP)
- Ammo brick chance: +100% (double ammo drops)

**PER POINT CALCULATION**:
- Each point adds: 0.1% reload, 0.05% handling
- At 100: 10% reload, 5% handling
- At 200: 20% reload, 10% handling

**Build Usage**:
- Weapon-focused builds: Prioritize 140+
- Hybrid builds: Aim for 100-120
- Ability builds: Can ignore (30 fixed)

---

#### 2. **HEALTH** (was Resilience)
**Range**: 0-200
**Fixed Base**: 100 for ALL (mandatory 30% PvE damage resistance)

**Tier 1 (0-100)**:
- Flinch resistance: 0-10%
- Orbs of Power HP restoration: 0-70 HP per orb
- Shield stability (PvE)

**Tier 2 (101-200 Bonus)**:
- Flinch resistance +10% ADDITIONAL (total 20%)
- Shield capacity (PvE): +20 HP ADDITIONAL
- Shield recharge speed: +45% ADDITIONAL (massive buff)

**PER POINT CALCULATION**:
- Each point adds: 0.1% flinch, 0.7 HP from orbs
- At 100: 10% flinch, 70 HP orbs
- At 150: 15% flinch, 105 HP orbs + shield bonuses

**Build Usage**:
- Endgame solo: Prioritize 100-120 minimum
- Raids: 80-100 sufficient
- PvP: 80-100 (less critical)
- Tanky builds: 140-180

---

#### 3. **CLASS** (was Recovery)
**Range**: 0-200
**Fixed Base**: ~60 equivalent (baseline regen)

**Tier 1 (0-100)**:
- Class ability cooldown: 0-40 sec reduction (Rift/Barricade/Dodge)
- Class ability effect duration: +5-15% extension
- Activation speed

**Tier 2 (101-200 Bonus)**:
- Class ability cooldown: +20% REDUCTION (total 60% reduction)
- Class ability damage/shield bonus: +20% AMPLIFICATION
- Effect radius: +15% expansion
- Recharge rate: +45% FASTER

**PER POINT CALCULATION**:
- Each point adds: ~0.4 sec cooldown reduction
- At 100: ~40 sec reduction (from base ~50-60)
- At 200: ~80 sec reduction (incredibly fast recharge)

**Build Usage**:
- Rifts (Warlock): Prioritize 100-150 for uptime
- Barricades (Titan): 80-100 for tactical spacing
- Dodges (Hunter): 60-100 for rhythm
- Support builds: 140+

---

#### 4. **MELEE** (was Strength)
**Range**: 0-200
**Fixed Base**: 0 (customizable)

**Tier 1 (0-100)**:
- Melee ability cooldown: 0-30 sec reduction
- Melee energy gain sources: +10% external energy
- Melee damage (powered): 0-30% increase
- Melee damage (unpowered): 0-15% increase

**Tier 2 (101-200 Bonus)**:
- Melee cooldown: +20% REDUCTION (total 50%)
- Melee damage (powered): +20% ADDITIONAL (total 50%)
- Melee damage (unpowered): +15% ADDITIONAL (total 30%)
- Energy regeneration: +45% FASTER
- Melee range: +10% extension

**PER POINT CALCULATION**:
- Each point adds: 0.3 sec cooldown reduction, 0.3% damage
- At 100: ~30 sec reduction, 30% damage
- At 200: ~60 sec reduction, 60% damage

**Build Usage**:
- Melee-focused: 160-200 ESSENTIAL
- Hybrid (grenade + melee): 120-160
- Weapon-focused: 60-100
- Never: <40 (waste)

---

#### 5. **GRENADE** (was Discipline)
**Range**: 0-200
**Fixed Base**: 0 (customizable)

**Tier 1 (0-100)**:
- Grenade cooldown: 0-40 sec reduction
- Grenade energy gain sources: +20% external
- Grenade damage: 0-65% increase (HUGE)
- Grenade effect radius: +10% expansion

**Tier 2 (101-200 Bonus)**:
- Grenade cooldown: +30% REDUCTION (total 70%)
- Grenade damage: +20% ADDITIONAL (total 85% PvE)
- Extra charge slot: +1 grenade stored (2nd grenade!)
- Effect persistence: +50% duration extension
- Deployment speed: +35% faster throw

**PER POINT CALCULATION**:
- Each point adds: 0.4 sec cooldown, 0.65% damage
- At 100: ~40 sec reduction, 65% damage
- At 150: ~60 sec reduction, 97% damage (nearly double)
- At 200: ~70 sec reduction, 2 grenades stored!

**Build Usage**:
- Grenade-spam: 180-200 ESSENTIAL (extra charge!)
- Hybrid builds: 120-160
- Grenade-secondary: 80-120
- Weapon-primary: <60 ok

---

#### 6. **SUPER** (was Intellect)
**Range**: 0-200
**Fixed Base**: 0 (customizable)

**Tier 1 (0-100)**:
- Super energy gain from damage: +40% increase
- Super energy from external sources: +20% boost
- Super ability damage: 0-45% increase
- Super charge speed: +30% faster overall

**Tier 2 (101-200 Bonus)**:
- Super energy gain: +30% ADDITIONAL (total 70%)
- Super damage: +10% ADDITIONAL (total 55%)
- Refund energy on kills: +25% chance
- Duration extension: +20% longer super window
- Cooldown reduction: -15 sec (massive!)

**PER POINT CALCULATION**:
- Each point adds: 0.4% energy gain, 0.45% damage
- At 100: 40% energy gain, 45% damage
- At 150: 70% energy gain, 68% damage
- At 200: 100% energy gain, 95% damage (extreme cycling)

**Build Usage**:
- Super-spam rushdown: 150-200 ESSENTIAL
- Raid DPS windows: 120-160
- Endgame solo: 80-120
- Weapon-primary: <80 ok

---

### STAT PRIORITY GUIDELINES (by playstyle)

#### PvE Strikes/Story
**Priority Order**: Grenade > Super > Melee > Class > Health > Weapons
- Build: G100, S100, M80, C70, H80, W60

#### PvE Dungeons (Solo Challenge)
**Priority Order**: Health > Melee > Class > Grenade > Super > Weapons
- Build: H140, M120, C100, G100, S100, W60

#### PvE Raids (Endgame)
**Priority Order**: Super > Grenade > Melee > Weapons > Class > Health
- Build: S160, G150, M100, W100, C80, H60

#### PvE Nightfalls (Master/Legend)
**Priority Order**: Health > Super > Grenade > Class > Weapons > Melee
- Build: H130, S120, G110, C80, W70, M60

#### PvP Crucible
**Priority Order**: Weapons > Health > Super > Grenade > Melee > Class
- Build: W150, H100, S90, G80, M70, C60

#### PvP Trials
**Priority Order**: Weapons > Super > Health > Melee > Class > Grenade
- Build: W160, S110, H100, M80, C70, G70

#### PvP Gambit (Mixed)
**Priority Order**: Weapons > Grenade > Super > Health > Melee > Class
- Build: W130, G130, S120, H80, M70, C60

---

### STAT CAP RECOMMENDATIONS

**Softcap (efficient diminishing return)**:
- Per stat: 100 (get all tier 1 benefits)
- Full set target: 600 total stats (~100 per stat)

**Hardcap (maximum practical)**:
- Per stat: 180-190 (tier 2 benefits maximize)
- Full set: 900-1000 total stats

**Impossible (theoretical maximum)**:
- All 6 stats at 200 = 1200 total
- Reality: ~800-900 achievable with perfect rolls + masterwork

---

### STAT BREAKPOINTS FOR ABILITIES

**Grenade Uptime Breakpoints**:
- 40: 1 grenade every ~45 sec (baseline)
- 100: 1 grenade every ~5 sec (viable spam)
- 150: 1 grenade every ~2 sec (continuous)
- 200: 2nd grenade slot unlocked!

**Melee Uptime Breakpoints**:
- 40: 1 melee every ~20 sec
- 100: 1 melee every ~5 sec
- 150: 1 melee every ~2 sec
- 200: Nearly permanent uptime

**Super Charge Breakpoints**:
- 40: 1 super per 4 min (baseline)
- 100: 1 super per 2 min (frequent)
- 150: 1 super per 60 sec (very frequent)
- 200: 1 super per 30 sec (spam chain)

---

## 🔗 ARCHETYPE COMBINATIONS & MOD SYNERGIES

### RECOMMENDED COMBINATIONS

#### Grenade Spam Build
```
Armor Archetypes:
- Head: Bombardero (Weapons)
- Hands: Camorrista (Melee)
- Chest: Especialista (Class)
- Legs: Granádero (Grenade) ← PRIMARY
- Class Item: Guardián (Health)

Stats Target: G190, M140, S100, W100, H80, C60
Mods: Font of Might, Recharge Overload, Hands-On, Elemental Time Dilation, Recuperation
Aspects: Knockout, Balance of Power
Fragments: Persistence, Font of Power, Recharge Overload, Hands-On, Ballistic Slam
```

#### Melee Rush Build
```
Armor Archetypes:
- Head: Ejemplar (Super)
- Hands: Camorrista (Melee) ← PRIMARY
- Chest: Bombardero (Weapons)
- Legs: Granádero (Grenade)
- Class Item: Guardián (Health)

Stats Target: M190, G140, W130, S120, H90, C60
Mods: Hands-On, Knockout, Melee Wellmaker, Restoration x2, Recuperation
Aspects: Balance of Power, Knockou
Fragments: Hands-On, Knockout, Persistent

#### Super Spam Build
```
Armor Archetypes:
- Head: Ejemplar (Super) ← PRIMARY
- Hands: Especialista (Class)
- Chest: Bombardero (Weapons)
- Legs: Granádero (Grenade)
- Class Item: Guardián (Health)

Stats Target: S180, C130, G120, W100, H90, M70
Mods: Font of Might, Recharge Overload, Well of Life, Widows Well, Recuperation
Aspects: (varies per subclass)
Fragments: Font of Power, Font of Might, Recharge Overload
```

#### Tank Support Build
```
Armor Archetypes:
- Head: Guardián (Health) ← PRIMARY
- Hands: Especialista (Class)
- Chest: Guardián (Health)
- Legs: Guardián (Health)
- Class Item: Ejemplar (Super)

Stats Target: H180, C140, S100, G90, W80, M70
Mods: Well of Life, Widows Well, Barrier, Recuperation, Font of Might
Aspects: (defensive)
Fragments: (protection-focused)
```

---

### MOD RESTRICTION TABLE

| Mod A | Mod B | Can Stack? | Reason |
|-------|-------|-----------|--------|
| Font of Might | Font of Might | ❌ NO | Energy duplication |
| Recharge Overload | Recharge Overload | ❌ NO | Overcap ability energy |
| Well of Life | Widows Well | ⚠️ MAYBE | Different triggers, monitor stacking |
| Barrier | Barrier | ⚠️ MAYBE | Max 2 stacks (not 3+) |
| Hands-On | Knockout | ✅ YES | Different buff types |
| Elemental Time Dilation | Melee Wellmaker | ✅ YES | Separate mechanics |
| Recuperation | Any heal mod | ✅ YES | Stacking beneficial |

---

## 📋 BUILD PLANNER DATA STRUCTURE

```json
{
  "version": "1.0.0-EdgeOfFate",
  "build": {
    "id": "uuid",
    "name": "Build Name",
    "class": "Warlock|Titan|Hunter",
    "subclass": "Solar|Arc|Void|Stasis|Strand|Prismatic",
    "super": "Super Name",
    "abilities": {
      "grenade": "Grenade Name",
      "melee": "Melee Name",
      "classAbility": "Rift|Barricade|Dodge",
      "movement": "Glide|Lift|Jump"
    },
    "aspects": [
      "Aspect 1",
      "Aspect 2"
    ],
    "fragments": [
      "Fragment 1",
      "Fragment 2",
      "Fragment 3",
      "Fragment 4",
      "Fragment 5"
    ],
    "weapons": {
      "kinetic": "Weapon Name",
      "energy": "Weapon Name",
      "power": "Weapon Name"
    },
    "armor": {
      "head": {
        "name": "Armor Name",
        "archetype": "Bombardero|Especialista|Ejemplar|Camorrista|Granádero|Guardián",
        "masterwork": true|false
      },
      "hands": { ... },
      "chest": { ... },
      "legs": { ... },
      "classItem": { ... }
    },
    "stats": {
      "weapons": 0-200,
      "health": 0-200,
      "class": 0-200,
      "melee": 0-200,
      "grenade": 0-200,
      "super": 0-200,
      "total": 0-1200
    },
    "mods": [
      {
        "slot": 1,
        "name": "Mod Name",
        "energy": 5-10,
        "type": "Weapon|Ability|Defense|Utility"
      },
      ...
    ],
    "artifactPerks": [
      "Perk 1",
      "Perk 2"
    ],
    "gameplayLoop": "Description of playstyle (max 2000 chars)",
    "buildDetails": "In-depth synergies and combos (max 10000 chars)",
    "strengths": [
      "Strength 1",
      "Strength 2"
    ],
    "weaknesses": [
      "Weakness 1",
      "Weakness 2"
    ],
    "createdAt": "2025-12-18T00:00:00Z",
    "updatedAt": "2025-12-18T00:00:00Z",
    "contentType": "post-EdgeOfFate-final",
    "armorVersion": "3.0",
    "compatibility": "Dec 2025+"
  }
}
```

---

## ✅ VERIFICACIÓN COMPLETA

**INFORMACIÓN ACTUALIZADA A**:
- ✅ Edge of Fate (Confines del Destino)
- ✅ Kepler & Renegades seasons
- ✅ Armor 3.0 Final Version
- ✅ New Stats System (0-200)
- ✅ 6 Armor Archetypes
- ✅ All Abilities per Class
- ✅ All Aspects & Fragments
- ✅ Current Meta (Dec 2025)

**NO INCLUYE (Obsoleto)**:
- ❌ Mobility/Resilience/Recovery (old names)
- ❌ Old stat caps (0-100)
- ❌ Pre-Armor 3.0 systems
- ❌ Deprecated mods/abilities

---

**D2-Guardian-Forge v1.0.0** | Edge of Fate Compatible | December 2025
