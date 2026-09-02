import type { Context } from '@deepseek-ai/cordis'
export const name = '@dsh-external/dsh-client-ui-subagent-model-picker'
// Host face is a no-op: the settings namespace + tools are registered by the
// host plugin (dsh-subagent-model-picker). This package only contributes the
// browser configuration card under `settings.plugin.item`.
export function apply(_ctx: Context): void {}
