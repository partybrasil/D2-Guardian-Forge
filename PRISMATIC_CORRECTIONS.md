# Correcciones de Subclase Prismatic - Basado en Destinypedia

## Fecha de Actualización
24 de Diciembre de 2025

## Fuente de Información
Toda la información ha sido verificada y corregida según [Destinypedia](https://www.destinypedia.com/), la fuente oficial de información de Destiny 2.

## Resumen de Cambios

### 1. Sistema de Filtrado Prismatic
**Problema Anterior**: La aplicación permitía seleccionar TODAS las habilidades de todas las subclases cuando se elegía Prismatic.

**Corrección**: Ahora Prismatic solo permite seleccionar habilidades específicamente curadas por Bungie para cada clase, según lo documentado en Destinypedia.

#### Archivo Creado: `src/data/prismaticAbilities.json`
Este archivo contiene las listas oficiales de habilidades disponibles para cada clase en Prismatic:

**Warlock Prismatic**:
- Supers: Song of Flame, Nova Bomb: Cataclysm, Stormtrance, Winter's Wrath, Needlestorm
- Granadas: Healing, Vortex, Storm, Coldsnap, Threadling
- Melees: Incinerator Snap, Pocket Singularity, Chain Lightning, Penumbral Blast, Arcane Needle
- Aspectos: Hellion, Feed the Void, Lightning Surge, Bleak Watcher, Weaver's Call

**Titan Prismatic**:
- Supers: Twilight Arsenal, Hammer of Sol, Thundercrash, Glacial Quake, Bladefury
- Granadas: Suppressor, Thermite, Pulse, Glacier, Shackle
- Melees: Shield Throw, Hammer Strike, Thunderclap, Shiver Strike, Frenzied Blade
- Aspectos: Unbreakable, Consecration, Knockout, Diamond Lance, Drengr's Lash

**Hunter Prismatic**:
- Supers: Shadowshot: Deadfall, Golden Gun: Marksman, Storm's Edge, Silence and Squall, Silkstrike
- Granadas: Magnetic, Swarm, Arcbolt, Duskfield, Grapple
- Melees: Snare Bomb, Knife Trick, Combination Blow, Withering Blade, Threaded Spike
- Aspectos: Stylish Executioner, Gunpowder Gamble, Ascension, Winter's Shroud, Threaded Specter

### 2. Granadas Faltantes Agregadas
Se agregaron **12 granadas** que faltaban en el juego pero están documentadas en Destinypedia:

**Arc**:
- Skip Grenade
- Flux Grenade
- Storm Grenade
- Lightning Grenade

**Solar**:
- Firebolt Grenade
- Thermite Grenade
- Tripmine Grenade
- Healing Grenade

**Void**:
- Axion Bolt
- Suppressor Grenade
- Void Spike Grenade
- Void Wall Grenade

### 3. Variantes de Supers
Se dividieron los supers genéricos en sus variantes oficiales según Destinypedia:

**Nova Bomb** → **Nova Bomb: Vortex** y **Nova Bomb: Cataclysm**
- Vortex: Crea singularidad que atrae y daña continuamente
- Cataclysm: Proyectil lento que busca y se fragmenta en rastreadores

**Golden Gun** → **Golden Gun: Deadshot** y **Golden Gun: Marksman**
- Deadshot: Disparo rápido, igniciones reembolsan balas
- Marksman: Precisión alta, sobrepenetración, genera orbes en críticos

**Shadowshot** → **Shadowshot: Deadfall** y **Shadowshot: Mobius Quiver**
- Deadfall: Amarras largas con debilitamiento y supresión prolongada
- Mobius Quiver: Hasta seis disparos rápidos que vuelven volátiles a los enemigos

### 4. Aspectos Faltantes Agregados
Se agregaron **7 aspectos** que faltaban para las subclases Prismatic:

1. **Hellion** (Solar Warlock) - 2 slots de fragmentos
2. **Unbreakable** (Void Titan) - 2 slots de fragmentos
3. **Ascension** (Arc Hunter) - 3 slots de fragmentos
4. **On the Prowl** (Void Hunter) - 2 slots de fragmentos
5. **Storm's Keep** (Arc Titan) - 3 slots de fragmentos
6. **Weavewalk** (Strand Warlock) - 2 slots de fragmentos
7. **Ionic Sentry** (Arc Warlock) - 3 slots de fragmentos

### 5. Actualización de BuildPlanner.tsx
Se actualizó la lógica de filtrado en `src/pages/BuildPlanner.tsx` para:
- Importar el nuevo archivo `prismaticAbilities.json`
- Usar listas curadas en lugar de permitir todas las habilidades
- Filtrar supers, granadas, melees y aspectos según las listas oficiales

## Impacto en la Experiencia del Usuario

### Antes
- Los jugadores podían crear builds Prismatic con combinaciones imposibles en el juego real
- Faltaban granadas oficiales del juego
- Algunos aspectos no estaban disponibles
- Los supers no tenían sus variantes específicas

### Después
- Las builds Prismatic ahora reflejan exactamente lo que es posible en Destiny 2
- Todas las granadas oficiales están disponibles
- Todos los aspectos Prismatic están incluidos
- Los supers muestran sus variantes específicas con descripciones precisas

## Próximos Pasos Recomendados

1. **Verificar Fragmentos Prismatic**: Asegurar que los fragmentos "Facet" estén correctamente implementados
2. **Validar Modificadores de Stats**: Verificar que todos los fragmentos tengan los modificadores correctos según Destinypedia
3. **Actualizar Iconos**: Asegurar que los nuevos items tengan iconos apropiados
4. **Testing de UI**: Probar la selección de habilidades Prismatic en la interfaz
5. **Documentación de Usuario**: Actualizar guías de usuario con las restricciones correctas de Prismatic

## Referencias
- [Destinypedia - Prismatic Warlock](https://www.destinypedia.com/Prismatic_Warlock)
- [Destinypedia - Prismatic Titan](https://www.destinypedia.com/Prismatic_Titan)
- [Destinypedia - Prismatic Hunter](https://www.destinypedia.com/Prismatic_Hunter)
- [Destinypedia - Warlock](https://www.destinypedia.com/Warlock)
- [Destinypedia - Titan](https://www.destinypedia.com/Titan_(class))
- [Destinypedia - Hunter](https://www.destinypedia.com/Hunter)
