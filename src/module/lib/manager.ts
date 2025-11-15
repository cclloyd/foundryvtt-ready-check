import { ns } from '#ccrc/module/lib/config';
import { modLogger } from '#ccrc/module/lib/logger';
import { ApplicationCheckPrompt } from '#ccrc/module/applications/ApplicationCheckPrompt';
import { ApplicationNewCheck } from '#ccrc/module/applications/ApplicationNewCheck';

interface StartOptions {
    notify?: boolean;
    save?: boolean;
}

export class RCManager {
    identifier = `module.${ns}`;
    active = false;
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
        // Update local cache from saved state
        this.active = game.scenes!.active?.getFlag(ns, 'readyCheck') === true;
        if (this.active) {
            game.users!.forEach((user) => {
                const isReady = game.scenes!.active!.getFlag(ns, `readyCheckStatus.${user.id}`) === true;
                if (isReady) this.handleMarkReady({ userId: user.id, save: false });
                else this.handleMarkUnready({ userId: user.id, save: false });
            });
        }
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
            case 'END':
                game.readyCheck.handleEnd(payload);
                break;
            default:
                throw new Error('unknown type');
        }
    }

    end(noSave = false) {
        if (!game.scenes!.active) {
            ui.notifications!.error('No active scene found. Ensure a scene is active and try again.');
            return;
        }
        this.emit('END', {});
        this.handleEnd({ noSave });
    }

    handleEnd(payload: any = { noSave: false }) {
        const { noSave } = payload;

        // Only save from active GM session
        if (!noSave && game.user!.isActiveGM) {
            game.scenes!.active!.unsetFlag(ns, 'readyCheck');
            game.scenes!.active!.unsetFlag(ns, 'readyCheckStatus');
        }
        this.active = false;
        this.previousStarted = this.timeStarted = undefined;
        this.previousFormData = this.formData = undefined;
        this.previousRound = this.roundStarted = undefined;
        this.previousCombat = this.isCombat = false;
        game.users!.forEach((player) => {
            const elem = $(`#players-active i[data-user-id="${player.id}"]`);
            if (elem.length === 0) return;
            elem.removeClass('ccrc-ready fa-check fa-xmark ccrc-notready fa-xmark');
        });
    }

    start(formData: any = {}, options: StartOptions = { save: true }) {
        if (!game.scenes!.active) {
            ui.notifications!.error('No active scene found. Ensure a scene is active and try again.');
            return;
        }
        this.emit('START', { formData });
        this.handleStart({ formData, options });
    }

    handleStart(payload: any = {}) {
        const newStatus: Record<string, boolean> = {};
        const { formData, options } = payload;
        const { save } = options ?? {};

        game.users!.forEach((player) => {
            const elem = $(`#players-active i[data-user-id="${player.id}"]`);
            if (player.isGM && !formData['include-gms']) {
                elem.removeClass('ccrc-ready fa-check fa-xmark ccrc-notready fa-xmark');
                return;
            }
            newStatus[player.id] = false;
            elem.removeClass('ccrc-ready fa-check fa-xmark').addClass('ccrc-notready fa-xmark');
        });
        if (save && game.user!.isActiveGM) {
            game.scenes!.active!.setFlag(ns, 'readyCheckStatus', newStatus);
            game.scenes!.active!.setFlag(ns, 'readyCheck', true);
        }

        this.timeStarted = new Date();
        this.previousRound = this.roundStarted;
        this.previousStatus = this.readyStatus;
        this.previousStarted = this.timeStarted;
        this.previousFormData = this.formData;
        this.previousCombat = this.isCombat;
        this.formData = formData;
        this.readyStatus = newStatus;
        this.active = true;
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
        const userElem = $(`#players-active i[data-user-id="${game.user!._id}"]`);
        if (formData['show-prompt'] && userElem.length > 0) {
            if (game.user!.isGM && !formData['include-gms']) return;
            const userPrompt = new ApplicationCheckPrompt();
            userPrompt.render({ force: true });
        } else {
            if (options?.notify === false) return;
            ui.notifications!.success('Ready check started.');
        }
    }

    markReady(userId: string, noSave = false) {
        this.emit('READY', { userId });
        this.handleMarkReady({ userId, noSave });
    }

    handleMarkReady(payload: any = { noSave: false }) {
        modLogger.debug('handleMarkReady', payload);
        const { userId, noSave, elem } = payload;
        this.readyStatus[userId] = true;
        const useElem = $(`#players-active i[data-user-id="${userId}"]`);
        modLogger.log('useElem', useElem);
        if (elem) {
            elem.classList.remove('ccrc-notready', 'fa-xmark');
            elem.classList.add('ccrc-ready', 'fa-check');
        } else {
            useElem?.removeClass('ccrc-notready fa-xmark');
            useElem?.addClass('ccrc-ready fa-check');
        }
        // Only trigger save with self
        if (!noSave && game.user!.isActiveGM) game.scenes!.active!.setFlag(ns, `readyCheckStatus.${userId}`, true);
    }

    markUnready(userId: string, noSave = false) {
        this.emit('UNREADY', { userId });
        this.handleMarkUnready({ userId, noSave });
    }

    handleMarkUnready(payload: any = { noSave: false }) {
        modLogger.debug('handleMarkUnready', payload);
        const { userId, noSave, elem } = payload;
        this.readyStatus[userId] = false;
        const useElem = $(`#players-active i[data-user-id="${userId}"]`);
        modLogger.log('useElem', elem, useElem);
        if (elem) {
            elem.classList.remove('ccrc-ready', 'fa-check');
            elem.classList.add('ccrc-notready', 'fa-xmark');
        } else {
            useElem?.removeClass('ccrc-ready fa-check');
            useElem?.addClass('ccrc-notready fa-xmark');
        }
        if (!noSave && game.user!.isActiveGM) game.scenes!.active!.setFlag(ns, `readyCheckStatus.${userId}`, false);
    }

    openCreate() {
        const readyCheck = new ApplicationNewCheck();
        readyCheck.render({ force: true });
    }
}
