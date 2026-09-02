import React from 'react';
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { SettingsValue } from './index.ts';
export interface ModelOption {
    key: string;
    provider: string;
    model: string;
    name: string;
}
export interface ModelCapabilityCardInjected {
    scope: SettingsScope<SettingsValue>;
    t: (key: string) => string;
    loadModels: () => Promise<ModelOption[]>;
}
export type ModelCapabilityCardProps = ModelCapabilityCardInjected;
/**
 * Collapsible plugin configuration card: pick a model from the catalog, edit its
 * capability description, and save. Single-column layout so it fits the UI block.
 */
export declare function ModelCapabilityCard({ scope, t, loadModels }: ModelCapabilityCardProps): React.ReactElement;
//# sourceMappingURL=ModelCapabilityCard.d.ts.map