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
import * as primitives from '@deepseek-ai/dsh-client-ui-primitives';
import { ModelCapabilityCard } from "./ModelCapabilityCard.js";
import { en, zh } from "./locales.js";
/** Exports the card renders with; an older host lacking any disables the card. */
const REQUIRED_PRIMITIVES = ['Button', 'Input'];
/** @returns the required primitives the host module is missing. */
function missingPrimitives(mod) {
    return REQUIRED_PRIMITIVES.filter((name) => typeof mod[name] !== 'function');
}
/** Settings namespace this card edits (matches the host plugin's registration). */
export const SETTINGS_NS = 'subagent-model-picker';
export const name = '@dsh-external/dsh-client-ui-subagent-model-picker';
// settingsScope is intentionally NOT module-level: it is optional, and naming it
// here would unmount the whole plugin on a host without that service.
export const inject = ['slots', 'locale'];
const NS = '@dsh-external/dsh-client-ui-subagent-model-picker';
export function apply(ctx) {
    const gaps = missingPrimitives(primitives);
    if (gaps.length > 0) {
        console.warn(`[dsh-client-ui-subagent-model-picker] host ui-primitives missing ${gaps.join(', ')} — configuration card disabled`);
        return;
    }
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-client-ui-subagent-model-picker: dictionaries');
    const t = ctx.locale.bind(NS);
    // Nested inject keeps settingsScope optional: without it the card simply
    // never registers, while the plugin itself stays mounted.
    const scoped = ctx;
    scoped.inject(['settingsScope'], (scopedCtx) => {
        const scope = scopedCtx.settingsScope.bind({ namespace: SETTINGS_NS });
        const injected = () => ({ scope, t });
        scopedCtx.slots.inject('settings.plugin.item', function* () {
            yield scopedCtx.slots.register({
                name: 'settings.plugin.item',
                key: SETTINGS_NS,
                locale: NS,
                inject: injected,
            }, ModelCapabilityCard);
        });
    });
}
//# sourceMappingURL=index.js.map