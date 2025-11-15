import { modLogger } from '#ccrc/module/lib/logger';

export const renderPlayers = (app: any, html: HTMLElement, data: any) => {
    modLogger.log('renderPlayers', app, html, data);
    // Resolve container as jQuery for querying
    const $root = (window as any).$ ? (window as any).$(html) : null;
    if (!$root) return;

    // Iterate all players in both active and inactive lists
    const $players = $root.find('#players-active li.player');

    modLogger.log('renderPlayers rc ', game.readyCheck, $players.length);
    $players.each((_: any, li: HTMLElement) => {
        const $li = (window as any).$(li);
        const userId = $li.data('userId');
        if (!userId) return;
        if (game.users!.get(userId)!.isGM) return;
        const icon = document.createElement('i');
        icon.classList.add('ccrc-readycheck', 'fa-solid', 'fas');
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

        console.log('renderPlayers', `marking for ${userId}`);
        if (game.readyCheck.initialized && game.readyCheck.active) {
            if (game.readyCheck.readyStatus[userId]) game.readyCheck.handleMarkReady({ noSave: true, userId, elem: icon });
            else game.readyCheck.handleMarkUnready({ noSave: true, userId, elem: icon });
        }

        li.appendChild(icon);
        modLogger.log('renderPlayers icon', userId, icon);
    });
};
