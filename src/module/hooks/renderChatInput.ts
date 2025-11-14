import { ApplicationNewCheck } from '#ccrc/module/applications/ApplicationNewCheck';

export const renderChatInput = (app: any, elem: HTMLElement) => {
    const html = $(elem['#chat-controls']); // wrap
    const container = html.find('.control-buttons').first();

    if (!container.length) return;

    const id = 'chat-ready-check';
    if (container.find(`#${id}`).length) return;

    const btn = $(
        `<button type="button" id="${id}" class="ui-control icon fa-solid fa-check-double" data-tooltip="" aria-label="New Ready Check" data-action="newReadyCheck" style=""></button>`,
    );

    btn.on('click', (ev) => {
        ev.preventDefault();
        game.readyCheck.openCreate();
    });

    container.prepend(btn);
};
