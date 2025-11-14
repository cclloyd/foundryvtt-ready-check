import { modLogger } from '#ccrc/module/lib/logger';
import { preloadTemplates } from '#ccrc/module/lib/preloadTemplates';
import { RCManager } from '#ccrc/module/lib/manager';

export const initModule = () => {
    modLogger.log('Initializing Ready Check');

    // Preload Handlebars templates
    preloadTemplates().then();

    game.readyCheck = new RCManager();

    // Add custom CSS to the document head programtically.  If we tried adding it as module css,
    // it would be scoped under `@layer modules` in the rendered css, preventing it from applying to the system panel.
    const extraStyle = document.createElement('style');
    extraStyle.textContent = `
    .ccrc-readycheck {
        flex: 0;
        font-size: 14px;
        line-height: 1;
        color: transparent;
        margin-right: 0.25rem;
    }
    .ccrc-ready {
        color: #1fbd1f !important;
    }
    .ccrc-notready::before {
        color: #e74c3c !important;
    }
    .ccrc-active {
        cursor: pointer;
        pointer-events: all;
    }
  `;
    document.head.appendChild(extraStyle);
};
