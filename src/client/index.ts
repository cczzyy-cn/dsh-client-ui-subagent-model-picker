/**
 * Subagent model picker — browser half. Registers a plugin configuration card
 * under `settings.plugin.item` keyed to `subagent-model-picker`.
 *
 * Follows the dsh-market robustness pattern: `settingsScope` is injected
 * NESTED (so this plugin still mounts on hosts without that service — the card
 * just never appears there), and a `missingPrimitives` guard skips
 * registration gracefully when the host's ui-primitives module lacks an export
 * we render with, instead of crashing mid-render.
 */
import * as primitives from '@deepseek-ai/dsh-client-ui-primitives'
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

/** Exports the card renders with; an older host lacking any disables the card. */
const REQUIRED_PRIMITIVES = ['Button', 'Input'] as const

/** @returns the required primitives the host module is missing. */
function missingPrimitives(mod: Record<string, unknown>): string[] {
  return REQUIRED_PRIMITIVES.filter((name) => typeof mod[name] !== 'function')
}

/** Settings namespace this card edits (matches the host plugin's registration). */
export const SETTINGS_NS = 'subagent-model-picker'

export interface SettingsValue {
  descriptions: Array<{ provider: string; model: string; capabilities: string }>
}

export const name = '@dsh-external/dsh-client-ui-subagent-model-picker'
// settingsScope is intentionally NOT module-level: it is optional, and naming it
// here would unmount the whole plugin on a host without that service.
export const inject = ['slots', 'locale']

const NS = '@dsh-external/dsh-client-ui-subagent-model-picker'

export function apply(ctx: ClientContext): void {
  const gaps = missingPrimitives(primitives as unknown as Record<string, unknown>)
  if (gaps.length > 0) {
    console.warn(
      `[dsh-client-ui-subagent-model-picker] host ui-primitives missing ${gaps.join(', ')} — configuration card disabled`,
    )
    return
  }

  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-client-ui-subagent-model-picker: dictionaries')
  const t = ctx.locale.bind(NS) as (key: string) => string

  // Nested inject keeps settingsScope optional: without it the card simply
  // never registers, while the plugin itself stays mounted.
  const scoped = ctx as unknown as {
    inject(services: string[], callback: (scopedCtx: {
      settingsScope: { bind(spec: { namespace: string }): SettingsScope<SettingsValue> }
      slots: {
        inject(slot: string, register: () => void): void
        register(opts: { name: string; key: string; locale: string; inject: () => ModelCapabilityCardInjected }, comp: typeof ModelCapabilityCard): unknown
      }
    }) => void): void
  }
  scoped.inject(['settingsScope'], (scopedCtx) => {
    const scope = scopedCtx.settingsScope.bind({ namespace: SETTINGS_NS })
    const injected = (): ModelCapabilityCardInjected => ({ scope, t })
    scopedCtx.slots.inject('settings.plugin.item', function* () {
      yield scopedCtx.slots.register({
        name: 'settings.plugin.item',
        key: SETTINGS_NS,
        locale: NS,
        inject: injected,
      }, ModelCapabilityCard)
    })
  })
}
