import { ns } from '#ccrc/module/lib/config';
import { modLogger } from '#ccrc/module/lib/logger';
import { ApplicationCheckPrompt } from '#ccrc/module/applications/ApplicationCheckPrompt';
import { ApplicationNewCheck } from '#ccrc/module/applications/ApplicationNewCheck';

interface StartOptions {
    notify?: boolean;
}

export class RCManager {
    identifier = `module.${ns}`;
    initialized = false;
    timeStarted?: Date;
    formData: any;
    isCombat = false;
    roundStarted?: number;
    readyStatus: Record<string, boolean> = {};
    previousStarted?: Date = undefined;
    previousStatus: Record<string, boolean> = {};
    previousRound?: number;
    previousFormData?: any;
    previousCombat?: boolean;

    constructor() {}

    init() {
        this.registerSocketHandlers();
        this.initialized = true;
    }

    emit(type: string, payload: any) {
        return game.socket!.emit(this.identifier, { type, payload });
    }

    registerSocketHandlers() {
        modLogger.log('Registering Ready Check socket handlers');
        game.socket!.on(this.identifier, this.handleSocket);
    }

    handleSocket({ type, payload }: any) {
        modLogger.log('handleSocket', type, payload);
        switch (type) {
            case 'START':
                game.readyCheck.handleStart(payload);
                break;
            case 'READY':
                game.readyCheck.handleMarkReady(payload);
                break;
            case 'UNREADY':
                game.readyCheck.handleMarkUnready(payload);
                break;
            default:
                throw new Error('unknown type');
        }
    }

    start(formData: any = {}, options: StartOptions = {}) {
        this.emit('START', { formData });
        this.handleStart({ formData, options });
    }

    handleStart(payload: any = {}) {
        const newStatus: Record<string, boolean> = {};
        const { formData, options } = payload;

        game.users!.forEach((player) => {
            if (player.isGM) return;
            newStatus[player.id] = false;
            const elem = $(`#players-active i[data-user-id="${player.id}"]`);
            elem.removeClass('ccrc-ready fa-check fa-xmark').addClass('ccrc-notready fa-xmark');
        });

        this.timeStarted = new Date();
        this.previousRound = this.roundStarted;
        this.previousStatus = this.readyStatus;
        this.previousStarted = this.timeStarted;
        this.previousFormData = this.formData;
        this.previousCombat = this.isCombat;
        this.formData = formData;
        this.readyStatus = newStatus;
        if (game.combat) {
            this.isCombat = true;
            this.roundStarted = game.combat.round;
        } else if (formData['track-rounds']) {
            this.isCombat = false;
            if (this.roundStarted === undefined || formData['reset-rounds']) this.roundStarted = 0;
            else {
                if (this.previousCombat) {
                    this.roundStarted = 0;
                    this.previousCombat = false;
                }
                this.roundStarted++;
            }
        } else {
            this.isCombat = false;
            this.roundStarted = undefined;
        }
        modLogger.log('asdf', this);

        const userElem = $(`#players-active i[data-user-id="${game.user!._id}"]`);
        if (formData['show-prompt'] && userElem.length > 0) {
            const userPrompt = new ApplicationCheckPrompt();
            userPrompt.render({ force: true });
        } else {
            if (options?.notify === false) return;
            ui.notifications!.success('Ready check started.');
        }
    }

    markReady(userId: string) {
        this.emit('READY', { userId });
        this.handleMarkReady({ userId });
    }

    handleMarkReady(payload: any) {
        const { userId } = payload;
        this.readyStatus[userId] = true;
        const elem = $(`#players-active i[data-user-id="${userId}"]`);
        elem.removeClass('ccrc-notready fa-xmark').addClass('ccrc-ready fa-check');
    }

    markUnready(userId: string) {
        this.emit('UNREADY', { userId });
        this.handleMarkUnready({ userId });
    }

    handleMarkUnready(payload: any) {
        const { userId } = payload;
        this.readyStatus[userId] = false;
        const elem = $(`#players-active i[data-user-id="${userId}"]`);
        elem.removeClass('ccrc-ready fa-check').addClass('ccrc-notready fa-xmark');
    }

    openCreate() {
        const readyCheck = new ApplicationNewCheck();
        readyCheck.render({ force: true });
    }
}
