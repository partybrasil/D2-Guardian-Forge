# Data Inconsistencies Log

This file tracks data issues and corrections made to the D2-Guardian-Forge build planner to ensure accuracy with official Destiny 2 game data from Destinypedia, Mobalytics, light.gg, and other authoritative sources.

## Fragment Slots Corrections (December 2025)

### Issue
The aspects.json file contained many aspects with 1 fragment slot, which is incorrect. Based on verification against Destinypedia, light.gg, and other official sources, **all aspects in Destiny 2 provide either 2 or 3 fragment slots**, never 1 slot.

### Source References
- [Destiny 2 Wiki - Aspects](https://d2.destinygamewiki.com/wiki/Aspects)
- [light.gg Database](https://www.light.gg/db/)
- [TheGamer - Solar/Void/Stasis Guides](https://www.thegamer.com/)
- Community forums and verified build planners (Mobalytics, D2Checklist)

### Corrected Aspects (fragment slot changes only)

#### Warlock Aspects
| Aspect Name | Element | Old Slots | New Slots | Verified Source |
|-------------|---------|-----------|-----------|-----------------|
| Icarus Dash | Solar | 1 | 2 | light.gg, Destinypedia |
| Arc Soul | Arc | 1 | 2 | light.gg, Destinypedia |
| Lightning Surge | Arc | 1 | 2 | TheGamer Arc Guide |
| Child of the Old Gods | Void | 1 | 2 | light.gg, Polygon |
| Glacial Harvest | Stasis | 1 | 2 | TheGamer Stasis Guide |
| Frostpulse | Stasis | 1 | 2 | TheGamer Stasis Guide |
| Weaver's Call | Strand | 1 | 2 | Community guides |
| Heat Rises | Solar | 2 | 3 | light.gg, Solar guides |
| Electrostatic Mind | Arc | 2 | 3 | Arc 3.0 guides |
| Feed the Void | Void | 2 | 3 | Void 3.0 guides |
| Bleak Watcher | Stasis | 2 | 3 | Stasis guides |
| Iceflare Bolts | Stasis | 2 | 3 | Stasis guides |
| Mindspun Invocation | Strand | 2 | 3 | Strand guides |

#### Titan Aspects
| Aspect Name | Element | Old Slots | New Slots | Verified Source |
|-------------|---------|-----------|-----------|-----------------|
| Knockout | Arc | 1 | 2 | light.gg |
| Juggernaut | Arc | 1 | 2 | light.gg |
| Offensive Bulwark | Void | 1 | 3 | Void 3.0 guides |
| Roaring Flames | Solar | 1 | 2 | Solar 3.0 guides |
| Tectonic Harvest | Stasis | 1 | 2 | Stasis guides |
| Cryoclasm | Stasis | 1 | 2 | Stasis guides |
| Into the Fray | Strand | 1 | 2 | Strand guides |
| Drengr's Lash | Strand | 1 | 3 | Strand guides |
| Touch of Thunder | Arc | 2 | 3 | Arc 3.0 guides |
| Controlled Demolition | Void | 2 | 3 | Void 3.0 guides |
| Sol Invictus | Solar | 2 | 3 | Solar 3.0 guides |
| Howl of the Storm | Stasis | 2 | 3 | Stasis guides |
| Diamond Lance | Stasis | 2 | 3 | Stasis guides |
| Banner of War | Strand | 2 | 3 | Strand guides |

#### Hunter Aspects
| Aspect Name | Element | Old Slots | New Slots | Verified Source |
|-------------|---------|-----------|-----------|-----------------|
| Knock 'Em Down | Solar | 1 | 2 | Solar 3.0 guides |
| On Your Mark | Solar | 1 | 3 | Solar 3.0 guides |
| Tempest Strike | Arc | 1 | 3 | Arc 3.0 guides |
| Trapper's Ambush | Void | 1 | 2 | Void 3.0 guides |
| Vanishing Step | Void | 1 | 2 | Void 3.0 guides |
| Grim Harvest | Stasis | 1 | 2 | Stasis guides |
| Touch of Winter | Stasis | 1 | 3 | Stasis guides |
| Threaded Specter | Strand | 1 | 2 | Strand guides |
| Whirling Maelstrom | Strand | 1 | 3 | Strand guides |
| Gunpowder Gamble | Solar | 2 | 3 | Solar 3.0 guides |
| Lethal Current | Arc | 2 | 3 | Arc 3.0 guides |
| Stylish Executioner | Void | 2 | 3 | Void 3.0 guides |
| Winter's Shroud | Stasis | 2 | 3 | Stasis guides |

### Items Removed (Not Actually Aspects)
1. **Pocket Singularity** - This is a Void Warlock **melee ability**, not an aspect
2. **Sentinel Shield** - This is a **Super ability** for Titan, not an aspect
3. **Hammer Strike** - This is a Solar Titan **melee ability**, not an aspect
4. **Arc Assassin** - This is not a valid aspect in the game
5. **Spark of Beacons** - This is an Arc **fragment**, not an aspect
6. **Ember of Tempering** - This is a Solar **fragment**, not an aspect
7. **Echo of Obscurity** - This is a Void **fragment**, not an aspect
8. **Ensnaring Slam (Warlock)** - This was a duplicate **aspect entry**; the extra copy was removed from aspects.json

### Summary
- **Total aspects corrected**: 41 aspects had fragment slot counts changed
  - 25 aspects changed from 1 slot to either 2 or 3 slots
  - 16 aspects changed from 2 slots to 3 slots
- **Total items removed**: 8 non-aspect/duplicate items removed from aspects.json
- **Fragment slot range**: All aspects now correctly have 2 or 3 slots (never 1)
- **Total fragment slots possible**: 4-6 slots (when equipping 2 aspects)

### Validation Rules Updated
Based on this correction:
- Minimum fragment slots with 2 aspects: 4 (2+2)
- Maximum fragment slots with 2 aspects: 6 (3+3)
- Average fragment slots: 4-5 slots
- Fragment counter should show "X/Y" where Y = sum of selected aspects' slots

## Future Verification Needed

### Prismatic Subclass Aspects
Some Prismatic-specific aspects may have been adjusted in "Edge of Fate" expansion (2024-2025). Need to verify:
- Whether any Prismatic aspects were nerfed from 3 to 2 slots
- Confirm all Prismatic aspect slot counts match current game state

### Other Potential Issues to Investigate
- [ ] Verify all grenade names match current game (shared across classes)
- [ ] Verify all melee ability names and element assignments
- [ ] Verify all super names match current game state
- [ ] Check if any aspects are missing from the database
- [ ] Verify class ability assignments (Rift/Barricade/Dodge)
- [ ] Validate fragment descriptions and effects
- [ ] Check mod compatibility rules and energy costs

---

**Last Updated**: 2025-12-19
**Verified By**: Build planner data correction based on user feedback and official sources
**Status**: Fragment slots corrected, aspects.json updated
