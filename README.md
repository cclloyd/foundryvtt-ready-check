# Kineticist Enhancements for Pathfinder 1st Edition

This is a module for FoundryVTT that streamlines using the Kinetic Blast class feature of the Kineticist class in
Pathfinder 1.

# Features:
-

- Automatically apply burn
- Automatically detect feats/class features on your sheet
    - Requires the identifier to follow a specific standard
        - feat: `feat_camelCase` (Be wary of exceptions in the compendium, such as `feat_twoweaponFighting`)
        - class feature: `classFeat_camelCase`
- Support for various feats/class features right out of the box (more on request, just open an issue!)
- !NEW! Custom infusions/blasts/feats. See usage for more info.

# Screenshots

| Actor Config Screen                                                                      | HUD for selected Kineticist token                                                       |
|:-----------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------|
| ![Infusions Config Screenshot](docs/screenshots/infusions.png?raw=true 'HUD screenshot') | ![HUD Screenshot](docs/screenshots/hud.png?raw=true 'HUD screenshot')                   |
| Attack Screen                                                                            | Chat Card:                                                                              |
| ![Attack Screenshot](docs/screenshots/blastattack.png?raw=true 'Attack screenshot')      | ![Chat Card Screenshot](docs/screenshots/blastcard.png?raw=true 'Chat Card screenshot') |

# Installation

Install through the FoundryVTT admin interface.

Manifest URL:

- **Latest:** https://gitlab.com/api/v4/projects/29080072/packages/generic/permalink/latest/module.json
- **Specific Version:** https://gitlab.com/api/v4/projects/29080072/packages/generic/permalink/v1.x.x/module.json

# Usage

## Getting Started

- Select the kineticist's token, a menu should appear in the top left with 1 or 2 buttons.
- Select 'KE Config' to bring up the actor config menu. From here you can check off all the blasts/infusions/etc you
  have so that they will appear in the attack menu.
- Hit save to confirm your changes.
- Unselect then reselect your token. A new attack button should appear next to the config button.
- Using this menu you can build your attack then fire it off. It provides some guides to help you manage resources.

## Custom Abilities

There is support for adding custom blasts, infusions, utility talents, metakinesis, and feats.

To add a custom item:

- Create a compendium of type `Item`
- Go to settings > Configure Settings > Kineticist Enhancements for pf1e
- Choose the newly created compendium for the custom items.
- Go to add an item to the compendium of type `Feature` and subtype `Class Feature` or `Feat`.
- Open `Sheet` in the top right of the newly created item and choose `Kineticist Talent` for the sheet type.
- Fill out the talent as required. You will need to set a Name and ID for every talent. Other settings
  depend on the talent type, and most aren't required. For burn, if an integer is input, it can be used to
  automatically calculate your burn during the attack.
- Add a transform if additional functionality is required that isn't provided.
- Once you created and fill out a talent, it will be available to select in the actor config screen.

# Development

- Clone the repository
- Run `yarn install`
- To build:
    - Run `yarn build`
- To develop:
    - Create a folder named `dist` in the project root.
    - Create a symlink/shortcut from the `dist` folder to your foundry's module directory and name the linked folder
      `fvtt-ready-check`
        - Windows default: `%LocalAppData%\FoundryVTT\Data\modules`
        - Linux default: `~/.local/share/FoundryVTT/Data/modules`
        - Recommended: develop in a docker container, mount the `dist` volume to the above destination
    - Run `yarn watch` (this will watch the src directory for changes and automatically rebuild changes live)
    - Launch Foundry

## Prerequisites

In order to build this module, recent versions of `node` (>= 16) and `yarn/npm` are
required. If you don't have `yarn`, but have `npm`, just run `npm install -g yarn` to install `yarn`.
