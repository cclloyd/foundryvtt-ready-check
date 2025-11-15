import { baseClass, ns } from '#ccrc/module/lib/config';
import { localize, useNamespace } from '#ccrc/module/lib/util';

const { ApplicationV2, HandlebarsApplicationMixin, DialogV2 } = foundry.applications.api;

export class ApplicationNewCheck extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(options?: foundry.applications.api.ApplicationV2.RenderOptions, config?: any) {
        // @ts-ignore
        super(options);
    }

    static PARTS = {
        root: {
            template: `modules/${ns}/templates/create.hbs`,
            scrollable: [''],
        },
    };

    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        id: useNamespace('create'),
        tag: 'form',
        form: {
            handler: this.#onSubmit,
            closeOnSubmit: true,
        },
        window: {
            icon: 'fas fa-list-check',
            title: 'New Ready Check',
            contentClasses: [baseClass],
            resizable: false,
            minimizable: true,
        },
        actions: {
            closeApp: this.prototype.closeApp,
            endCheck: this.prototype.endCheck,
        },
    } as foundry.applications.api.ApplicationV2.DefaultOptions;

    static async #onSubmit(event: Event, form: any, rawFormData: FormDataExtended) {
        event.preventDefault();
        const formData = rawFormData.object as Record<string, string>;
        game.readyCheck.start(formData);
    }

    async endCheck(event: Event, form: any, rawFormData: FormDataExtended) {
        event.preventDefault();
        game.readyCheck.end();
        this.close();
    }

    closeApp(event: Event) {
        event.preventDefault();
        this.close();
    }

    get title() {
        return `${localize(this.options.window.title)}`;
    }

    formatDifference = (ms: number | undefined) => {
        if (!ms) return undefined;
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        let seconds: number | string = Math.floor((ms % (1000 * 60)) / 1000);
        if (seconds < 6) seconds = Number((ms % (1000 * 60)) / 1000).toFixed(1);

        let result = '';
        if (hours) result += `${hours}h`;
        if (minutes) result += `${minutes}m`;
        if (seconds) result += `${seconds}s`;
        return result;
    };

    async _prepareContext(options: foundry.applications.api.ApplicationV2.RenderOptions) {
        const previous = game.readyCheck.previousStarted;
        const difference = previous ? Math.abs(previous.getTime() - new Date().getTime()) : undefined;
        return {
            ns: ns,
            combat: game.combat,
            previous: previous?.toLocaleTimeString('en-US', { hour12: false }),
            difference: this.formatDifference(difference),
            rc: game.readyCheck,
            roundStarted: game.readyCheck.roundStarted,
            formData: game.readyCheck.formData,
            trackRounds: game.readyCheck.formData?.['track-rounds'] ? 'checked' : '',
            includeGMs: game.readyCheck.formData?.['include-gms'] ? 'checked' : '',
        } as unknown as Promise<foundry.applications.api.ApplicationV2.RenderContext>;
    }
}
