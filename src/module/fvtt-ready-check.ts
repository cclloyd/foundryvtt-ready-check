import { initModule } from '#ccrc/module/hooks/init';
import { ready } from '#ccrc/module/hooks/ready';
import { renderChatInput } from '#ccrc/module/hooks/renderChatInput';
import { combatRound } from '#ccrc/module/hooks/combatRound';
import { modLogger } from '#ccrc/module/lib/logger';

// Initialize module
Hooks.once('init', initModule);
// Hooks.once('i18nInit', initLocalization);
Hooks.once('ready', ready);

// @ts-ignore
Hooks.on('renderChatInput', renderChatInput);
// @ts-ignore
Hooks.on('combatRound', combatRound);

// TODO: Add userConnected hook to add to current ready check

// Insert checkmarks here
Hooks.on('renderPlayers', async (app: any, html: HTMLElement, data: any) => {
    // players are found at `data.active` as an array of Users
    modLogger.log('renderPlayers', app, html, data);

    // Resolve container as jQuery for querying
    const $root = (window as any).$ ? (window as any).$(html) : null;
    if (!$root) return;

    // Iterate all players in both active and inactive lists
    const $players = $root.find('#players-active li.player');

    $players.each((_: any, li: HTMLElement) => {
        const $li = (window as any).$(li);
        const userId = $li.data('userId');
        if (!userId) return;
        if (game.users!.get(userId)!.isGM) return;

        const icon = document.createElement('i');
        icon.classList.add('ccrc-readycheck', 'fa-solid');
        icon.dataset.userId = userId;

        if (userId === game.user!.id || game.user!.isGM) {
            icon.classList.add('ccrc-active');
            icon.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const uid = (event.currentTarget as HTMLElement).dataset.userId;
                if (game.readyCheck.readyStatus[uid]) game.readyCheck.markUnready(uid);
                else game.readyCheck.markReady(uid);
            });
        }

        li.appendChild(icon);
    });
});
