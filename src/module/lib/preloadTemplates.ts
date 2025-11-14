import { ns } from './config.js';

export async function preloadTemplates() {
    const templatePaths: string[] = [
        'sidebar.hbs',
        'prompt.hbs',
        'create.hbs',
        'chat.hbs',
    ];
    return foundry.applications.handlebars.loadTemplates(templatePaths.map((t) => `modules/${ns}/templates/${t}`));
}
