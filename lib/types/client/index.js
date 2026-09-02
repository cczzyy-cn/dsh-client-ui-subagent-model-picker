import { ModelCapabilityCard } from "./ModelCapabilityCard.js";
import { en, zh } from "./locales.js";
/** Settings namespace this card edits (matches the host plugin's registration). */
export const SETTINGS_NS = 'subagent-model-picker';
export const name = '@dsh-external/dsh-client-ui-subagent-model-picker';
export const inject = ['slots', 'locale', 'settingsScope'];
const NS = '@dsh-external/dsh-client-ui-subagent-model-picker';
export function apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-client-ui-subagent-model-picker: dictionaries');
    const t = ctx.locale.bind(NS);
    const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NS });
    const injected = () => ({ scope, t });
    ctx.slots.inject('settings.plugin.item', function* () {
        yield ctx.slots.register({
            name: 'settings.plugin.item',
            key: SETTINGS_NS,
            locale: NS,
            inject: injected,
        }, ModelCapabilityCard);
    });
}
//# sourceMappingURL=index.js.map