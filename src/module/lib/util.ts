import { ns, shortNS } from '#ccrc/module/lib/config';
import type { KEModuleSettings } from '#ccrc/module/types/global';

// export type KEKeys = Extract<keyof ClientSettings.Values[typeof ns], string>;
export type KEKeys = 'customCompendium' | 'syntaxThemeLight' | 'syntaxThemeDark';

export const getSetting = <K extends KEKeys & keyof KEModuleSettings>(key: K): KEModuleSettings[K] => {
    // @ts-ignore
    return game.settings!.get(ns, key) as KEModuleSettings[K];
};

export const setSetting = (key: KEKeys, value: unknown) => {
    // @ts-ignore
    return game.settings!.set(ns, key, value);
};

export const getCoreMajorVersion = () => {
    if (game.version) return parseInt(game.version.split('.')[0]);
    return 13;
};

export const localize = (key: string) => {
    if (!game.i18n) return key;
    return game.i18n.localize(key);
};

export const useNamespace = (key: string, short = true) => {
    if (short) return `${shortNS}-${key}`;
    return `${ns}-${key}`;
};

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const enableDebug = () => {
    CONFIG.debug.hooks = true;
};
