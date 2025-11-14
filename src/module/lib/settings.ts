import { modLogger } from '#ccrc/module/lib/logger';

export function registerSettings() {
    console.log('fvtt-ready-check | Registering settings');
    if (!game.settings) {
        modLogger.warn('Game settings not initialized yet.  Skipping module setting initialization.');
        return;
    }
    //
    // const syntaxThemeChoices: Record<string, string> = {};
    // for (const key in syntaxThemes) syntaxThemeChoices[key] = syntaxThemes[key].name;
    // game.settings.register(ns, 'syntaxThemeLight', {
    //     name: localize('ke.pf1.settings.label.syntaxThemeLight'),
    //     hint: localize('ke.pf1.settings.hint.syntaxThemeLight'),
    //     scope: 'client',
    //     config: true,
    //     type: String,
    //     choices: syntaxThemeChoices,
    //     default: syntaxThemes['github'].id,
    // });
    // game.settings.register(ns, 'syntaxThemeDark', {
    //     name: localize('ke.pf1.settings.label.syntaxThemeDark'),
    //     hint: localize('ke.pf1.settings.hint.syntaxThemeDark'),
    //     scope: 'client',
    //     config: true,
    //     type: String,
    //     choices: syntaxThemeChoices,
    //     default: syntaxThemes['github-dark'].id,
    // });
    //
    // const worldCompendiumChoices: Record<string, string> = {};
    // try {
    //     for (const pack of game.packs as any) {
    //         const meta = pack?.metadata ?? {};
    //         if (meta.packageType === 'world') {
    //             const key: string = pack.collection ?? `${meta.package}.${meta.name}`;
    //             const label: string = meta.label ?? key;
    //             worldCompendiumChoices[key] = label;
    //         }
    //     }
    //     game.settings.register(ns, 'customCompendium', {
    //         name: localize('ke.pf1.settings.label.customCompendium'),
    //         hint: localize('ke.pf1.settings.hint.customCompendium'),
    //         scope: 'world',
    //         config: true,
    //         type: String,
    //         choices: worldCompendiumChoices,
    //         default: Object.keys(worldCompendiumChoices)[0] ?? '',
    //     });
    // } catch (e) {
    //     logger.error('Unable to enable custom talent compendiums: ', e);
    // }
}
