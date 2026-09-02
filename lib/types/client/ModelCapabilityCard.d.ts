import React from 'react';
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { SettingsValue } from './index.ts';
export interface ModelCapabilityCardInjected {
    scope: SettingsScope<SettingsValue>;
    t: (key: string) => string;
}
export type ModelCapabilityCardProps = ModelCapabilityCardInjected;
/** Plugin configuration card: per-model capability descriptions. */
export declare function ModelCapabilityCard({ scope, t }: ModelCapabilityCardProps): React.ReactElement;
//# sourceMappingURL=ModelCapabilityCard.d.ts.map