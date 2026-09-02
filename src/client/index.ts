/**
 * Subagent model picker — browser half. Registers a collapsible plugin
 * configuration card under `settings.plugin.item` keyed to `subagent-model-picker`.
 *
 * Follows the dsh-market robustness pattern: `settingsScope` and `remote.session`
 * are injected NESTED (so this plugin still mounts on hosts lacking them — the
 * card just never appears), and a `missingPrimitives` guard skips registration
 * gracefully instead of crashing mid-render.
 */
import * as primitives from '@deepseek-ai/dsh-client-ui-primitives'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import { ModelCapabilityCard, type ModelCapabilityCardInjected, type ModelOption } from './ModelCapabilityCard.tsx'
import { en, zh, type SettingsKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    '@dsh-external/dsh-client-ui-subagent-model-picker': SettingsKey
  }
  interface SlotMap {
    'settings.plugin.item': { kind: 'keyed'; scope: 'root'; owner: { children?: never } }
  }
}

/** Exports the card renders with; an older host lacking any disables the card. */
const REQUIRED_PRIMITIVES = ['Button', 'Input', 'IconChevronDownOutline14'] as const

function missingPrimitives(mod: Record<string, unknown>): string[] {
  return REQUIRED_PRIMITIVES.filter((name) => typeof mod[name] !== 'function')
}

export const SETTINGS_NS = 'subagent-model-picker'

export interface SettingsValue {
  descriptions: Array<{ provider: string; model: string; capabilities: string }>
}

export const name = '@dsh-external/dsh-client-ui-subagent-model-picker'
// settingsScope / remote.session are optional and injected nested below.
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

  const scoped = ctx as unknown as {
    inject(services: string[], callback: (scopedCtx: {
      settingsScope: { bind(spec: { namespace: string }): SettingsScope<SettingsValue> }
      remote: { session: { modelCatalog(): Promise<{
        ok: boolean
        value?: { groups: Array<{ id: string; name: string; models: Array<{ id: string; name: string }> }> }
        error?: { code: string; message: string }
      }> } }
      slots: {
        inject(slot: string, register: () => void): void
        register(opts: { name: string; key: string; locale: string; inject: () => ModelCapabilityCardInjected }, comp: typeof ModelCapabilityCard): unknown
      }
    }) => void): void
  }
  scoped.inject(['settingsScope', 'remote', 'remote.session'], (scopedCtx) => {
    const scope = scopedCtx.settingsScope.bind({ namespace: SETTINGS_NS })
    const loadModels = async (): Promise<ModelOption[]> => {
      const res = await scopedCtx.remote.session.modelCatalog()
      if (!res.ok || res.value === undefined) {
        throw new Error(res.error ? `${res.error.code}: ${res.error.message}` : 'model catalog unavailable')
      }
      return (res.value.groups ?? []).flatMap((g) => (g.models ?? []).map((m) => ({
        key: `${g.id}/${m.id}`,
        provider: g.id,
        model: m.id,
        name: m.name,
      })))
    }
    const injected = (): ModelCapabilityCardInjected => ({ scope, t, loadModels })
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
