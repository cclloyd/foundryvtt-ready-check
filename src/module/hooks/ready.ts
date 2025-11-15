import { modLogger } from '#ccrc/module/lib/logger';
import { registerSettings } from '#ccrc/module/lib/settings';
import { localize } from '#ccrc/module/lib/util';

export const ready = () => {
    modLogger.log(localize('ke.pf1.log.ready'));

    // Register custom module settings
    registerSettings();

    game.readyCheck.init();
};
