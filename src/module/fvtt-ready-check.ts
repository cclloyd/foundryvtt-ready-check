import { initModule } from '#ccrc/module/hooks/init';
import { ready } from '#ccrc/module/hooks/ready';
import { renderChatInput } from '#ccrc/module/hooks/renderChatInput';
import { combatRound } from '#ccrc/module/hooks/combatRound';
import { renderPlayers } from '#ccrc/module/hooks/renderPlayers';

// Initialize module
Hooks.once('init', initModule);
// Hooks.once('i18nInit', initLocalization);
Hooks.once('ready', ready);

// @ts-ignore
Hooks.on('renderChatInput', renderChatInput);
// @ts-ignore
Hooks.on('combatRound', combatRound);

Hooks.on('renderPlayers', renderPlayers);
