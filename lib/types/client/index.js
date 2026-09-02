/**
 * Subagent model picker — browser half. Registers a collapsible plugin
 * configuration card under `settings.plugin.item` keyed to `subagent-model-picker`.
 *
 * Follows the dsh-market robustness pattern: `settingsScope` and `remote.session`
 * are injected NESTED (so this plugin still mounts on hosts lacking them — the
 * card just never appears), and a `missingPrimitives` guard skips registration
 * gracefully instead of crashing mid-render.
 */
import * as primitives from '@deepseek-ai/dsh-client-ui-primitives';
import { ModelCapabilityCard } from "./ModelCapabilityCard.js";
import { en, zh } from "./locales.js";
/** Exports the card renders with; an older host lacking any disables the card. */
const REQUIRED_PRIMITIVES = ['Button', 'Input', 'IconChevronDownOutline14'];
function missingPrimitives(mod) {
    return REQUIRED_PRIMITIVES.filter((name) => typeof mod[name] !== 'function');
}
export const SETTINGS_NS = 'subagent-model-picker';
export const name = '@dsh-external/dsh-client-ui-subagent-model-picker';
// settingsScope / remote.session are optional and injected nested below.
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
    const scoped = ctx;
    scoped.inject(['settingsScope', 'remote', 'remote.session'], (scopedCtx) => {
        const scope = scopedCtx.settingsScope.bind({ namespace: SETTINGS_NS });
        const loadModels = async () => {
            const res = await scopedCtx.remote.session.modelCatalog();
            if (!res.ok || res.value === undefined) {
                throw new Error(res.error ? `${res.error.code}: ${res.error.message}` : 'model catalog unavailable');
            }
            return (res.value.groups ?? []).flatMap((g) => (g.models ?? []).map((m) => ({
                key: `${g.id}/${m.id}`,
                provider: g.id,
                model: m.id,
                name: m.name,
            })));
        };
        const injected = () => ({ scope, t, loadModels });
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