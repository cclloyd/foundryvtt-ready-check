// src/module/types/fvtt-ready-check.d.ts
import type { RCManager } from '#ccrc/module/lib/manager';

declare global {
    // Extend each game phase in fvtt-types
    interface UninitializedGame {
        readyCheck: RCManager;
    }

    interface InitGame {
        readyCheck: RCManager;
    }

    interface I18nInitGame {
        readyCheck: RCManager;
    }

    interface SetupGame {
        readyCheck: RCManager;
    }

    interface ReadyGame {
        readyCheck: RCManager;
    }

    namespace ClientSettings {
        interface Values {
            'fvtt-ready-check': {
                [key: string]: unknown;
            };
        }
    }

    // Add namespace-specific overloads instead of generic ones.
    // This avoids the conflict with the "core" overloads in fvtt-types.
    interface ClientSettings {
        get(namespace: 'fvtt-ready-check', key: string): unknown;
        set(namespace: 'fvtt-ready-check', key: string, value: unknown): Promise<unknown>;
        register(namespace: 'fvtt-ready-check', key: string, data: any): void;
    }
}

export {};
