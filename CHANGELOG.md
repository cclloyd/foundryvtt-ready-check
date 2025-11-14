# 3.0

## Major Update

This completely changes the way Wild Talents are handled.  They are now stored natively as items in compendiums instead of in the game settings.

- Updated interfaces for Actor Config and Blast Attack
- Added `Kineticist Talent` Item sheet type, and a compendium full of vanilla and 3pp talents.
- Removed custom talent settings.  They are now just items in compendiums with the `Kineticist Talent` sheet chosen.
- Added help windows for custom talents and transform functions
- Greatly reduced final module size
- Improved the handling of transform functions.  Simplified input arguments and added helper functions.
- Improved syntax highlighting.  Separate themes for light and dark.

## BREAKING CHANGES

- All custom talents will be incompatible.  You should take note of any talents you have saved and recreate them in a compendium after updating.

# 2.0

- New interfaces utilizing the ApplicationV2 API
- Changed the way custom talents are stored.  You may need to remake some.
- Merged custom talents into one application
- Dark mode support
- More English localization
- Added syntax highlighting for transforms (option to disable in settings)
- Added option to keep blast window open when rolling

# 1.6

- Project now uses Typescript
- Improved dev flow
- Added localization (English only)

# 1.5

- Added support for Foundry v13.347
- Dropped support for Foundry v11 and below
- Fixed console logs
- Fixed buttons, now always appear in Token controls.

# 1.4

- Support for Foundry v12.343 and pf1 11.8
- Moved buttons to token controls. Always visible but require a single token to work.
- Made the actor config page a bit more intuitive to use, and easier to add custom features.
- Improved logging
- Changed some utiilties to be bundled utiilty talents.
- Improved stability, speed.
- Dev: Improved build watch speed dramatically

# 1.1

## Breaking changes

The Kineticist class has been changed within the PF1 system module.  Calculations will break unless the identifier for the class features on your page are fixed.  This means either appending the prefix `classFeat_` to all the features, and all references, or delete and readd the Kineticist class from your sheet on the Features tab.  (Be sure to note how much health you have, then when readding the class, re-add as RAW and you can manually set its level back to previous, along with your health.)

## Changes
- Removed hidden dependency on Token Action HUD PF1 module
- New attack card is much more feature rich and automatically updates values.
- Fixed several issues related to displaying damage
- Ability to automaticlaly apply burn
- Added ability to automatically support certain Kineticist related features/feats as long as they follow the naming convention for their identifier
  - feat: `feat_camelCase` (Be wary of exceptions in the compendium, such as `feat_twoweaponFighting`)
  - class feature: `classFeat_camelCase`
- Added support for the following class features:
  - Infusion Specialization
  - Supercharge
  - Composite specialization
  - Utility Talents:
    - Flash step
  - Metakinesis:
    - Twice
    - Quicken
- Added support for the following feats:
  - Kinetic Acceleration
  - Accelerated Gathering
  - Mythic Supercharge
  - Mythic Gather Power
  - Mythic Haste/Mythic Celerity



# 1.0.1 - The official Release

Marks the official release of the module on Foundry's repository
