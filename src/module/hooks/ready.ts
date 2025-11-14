import { modLogger } from '#ccrc/module/lib/logger';
import { registerSettings } from '#ccrc/module/lib/settings';
import { localize } from '#ccrc/module/lib/util';
import { RCManager } from '#ccrc/module/lib/manager';
import { ns } from '#ccrc/module/lib/config';
import { ApplicationNewCheck } from '#ccrc/module/applications/ApplicationNewCheck';
import { ApplicationCheckPrompt } from '#ccrc/module/applications/ApplicationCheckPrompt';

export const ready = () => {
    modLogger.log(localize('ke.pf1.log.ready'));

    // Register custom module settings
    registerSettings();

    game.readyCheck.init();
};
