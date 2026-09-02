import type { Context as ClientContext } from '@deepseek-ai/cordis';
import { type SettingsKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        '@dsh-external/dsh-client-ui-subagent-model-picker': SettingsKey;
    }
    interface SlotMap {
        'settings.plugin.item': {
            kind: 'keyed';
            scope: 'root';
            owner: {
                children?: never;
            };
        };
    }
}
export declare const SETTINGS_NS = "subagent-model-picker";
export interface SettingsValue {
    descriptions: Array<{
        provider: string;
        model: string;
        capabilities: string;
    }>;
}
export declare const name = "@dsh-external/dsh-client-ui-subagent-model-picker";
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map