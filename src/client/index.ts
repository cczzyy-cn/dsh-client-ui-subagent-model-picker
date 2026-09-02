/**
 * Subagent model picker — browser half. Registers a plugin configuration card
 * under `settings.plugin.item` keyed to `subagent-model-picker`.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
// Type-only Context merges: ctx.locale, ctx.slots, ctx.settingsScope.
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import { ModelCapabilityCard, type ModelCapabilityCardInjected } from './ModelCapabilityCard.tsx'
import { en, zh, type SettingsKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Subagent model picker configuration card copy. */
    '@dsh-external/dsh-client-ui-subagent-model-picker': SettingsKey
  }
  interface SlotMap {
    /** One plugin's card inside the plugin configuration section. */
    'settings.plugin.item': { kind: 'keyed'; scope: 'root'; owner: { children?: never } }
  }
}

/** Settings namespace this card edits (matches the host plugin's registration). */
export const SETTINGS_NS = 'subagent-model-picker'

export interface SettingsValue {
  descriptions: Array<{ provider: string; model: string; capabilities: string }>
}

export const name = '@dsh-external/dsh-client-ui-subagent-model-picker'
export const inject = ['slots', 'locale', 'settingsScope']

const NS = '@dsh-external/dsh-client-ui-subagent-model-picker'

export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-client-ui-subagent-model-picker: dictionaries')
  const t = ctx.locale.bind(NS) as (key: string) => string
  const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NS }) as SettingsScope<SettingsValue>
  const injected = (): ModelCapabilityCardInjected => ({ scope, t })
  ctx.slots.inject('settings.plugin.item', function* () {
    yield ctx.slots.register({
      name: 'settings.plugin.item',
      key: SETTINGS_NS,
      locale: NS,
      inject: injected,
    }, ModelCapabilityCard)
  })
}
