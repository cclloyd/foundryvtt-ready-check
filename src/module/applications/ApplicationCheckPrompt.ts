import { baseClass, ns } from '#ccrc/module/lib/config';
import { localize, useNamespace } from '#ccrc/module/lib/util';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ApplicationCheckPrompt extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(options?: foundry.applications.api.ApplicationV2.RenderOptions, config?: any) {
        // @ts-ignore
        super(options);
    }

    static PARTS = {
        root: {
            template: `modules/${ns}/templates/prompt.hbs`,
        },
    };

    // TODO: Ensure when a user joins the state updates properly for new and joining user (currently, I think that if they have nothing set, itll mark them as not ready (unsaved) if one is active)

    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        id: useNamespace('prompt'),
        tag: 'form',
        form: {
            handler: this.#onSubmit,
            closeOnSubmit: true,
        },
        position: {
            width: 400,
        },
        window: {
            icon: 'fas fa-check-double',
            title: 'Ready Check',
            contentClasses: [baseClass],
            resizable: false,
            minimizable: true,
        },
        actions: {
            notReady: this.prototype.notReady,
        },
    } as foundry.applications.api.ApplicationV2.DefaultOptions;

    static async #onSubmit(event: Event, form: any, rawFormData: FormDataExtended) {
        event.preventDefault();
        game.readyCheck.markReady(game.user!._id);
    }

    notReady(event: Event) {
        event.preventDefault();
        game.readyCheck.markUnready(game.user!._id);
        this.close();
    }

    get title() {
        return `${localize(this.options.window.title)}`;
    }

    async _prepareContext(options: foundry.applications.api.ApplicationV2.RenderOptions) {
        return {
            ns: ns,
        } as unknown as Promise<foundry.applications.api.ApplicationV2.RenderContext>;
    }
}
