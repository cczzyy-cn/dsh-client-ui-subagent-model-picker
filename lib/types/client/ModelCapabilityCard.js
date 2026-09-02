import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useSyncExternalStore } from 'react';
import { Button, IconChevronDownOutline14, Input } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './ModelCapabilityCard.module.css';
/**
 * Collapsible plugin configuration card: pick a model from the catalog, edit its
 * capability description, and save. Single-column layout so it fits the UI block.
 */
export function ModelCapabilityCard({ scope, t, loadModels }) {
    const snapshot = useSyncExternalStore((cb) => scope.subscribe(cb), () => scope.getSnapshot());
    const entries = snapshot.value?.descriptions ?? [];
    const [open, setOpen] = useState(true);
    const [models, setModels] = useState([]);
    const [selected, setSelected] = useState('');
    const [cap, setCap] = useState('');
    const [savedAt, setSavedAt] = useState(-1);
    useEffect(() => {
        let cancelled = false;
        void loadModels().then((ms) => {
            if (cancelled)
                return;
            setModels(ms);
            setSelected((prev) => prev || ms[0]?.key || '');
        }).catch(() => setModels([]));
        return () => { cancelled = true; };
    }, [loadModels]);
    const entriesKey = JSON.stringify(entries);
    useEffect(() => {
        const entry = entries.find((e) => `${e.provider}/${e.model}` === selected);
        setCap(entry?.capabilities ?? '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, entriesKey]);
    const save = async () => {
        if (!selected)
            return;
        const sep = selected.indexOf('/');
        const provider = selected.slice(0, sep);
        const model = selected.slice(sep + 1);
        const rest = entries.filter((e) => `${e.provider}/${e.model}` !== selected);
        const next = [...rest, { provider, model, capabilities: cap }];
        await scope.set('descriptions', next);
        setSavedAt(Date.now());
    };
    return (_jsxs("div", { className: css.card, children: [_jsxs("button", { type: "button", className: css.header, onClick: () => setOpen((v) => !v), children: [_jsxs("span", { className: css.headText, children: [_jsx("span", { className: css.name, children: t('card.title') }), _jsx("span", { className: css.description, children: t('card.description') })] }), _jsx(IconChevronDownOutline14, { className: open ? `${css.chevron} ${css.chevronOpen}` : css.chevron })] }), open && (_jsxs("div", { className: css.body, children: [_jsx("label", { className: css.label, children: t('field.model') }), _jsxs("select", { className: css.select, value: selected, onChange: (e) => setSelected(e.target.value), children: [models.length === 0 && _jsx("option", { value: "", children: t('field.noModels') }), models.map((m) => (_jsx("option", { value: m.key, children: `${m.provider}/${m.model} — ${m.name}` }, m.key)))] }), _jsx("label", { className: css.label, children: t('field.capabilities') }), _jsx(Input, { className: css.capability ?? '', placeholder: t('field.capabilities'), value: cap, onChange: (e) => setCap(e.target.value) }), _jsxs("div", { className: css.footer, children: [_jsx(Button, { variant: "primary", disabled: !selected, onClick: () => void save(), children: t('action.save') }), savedAt > 0 && _jsx("span", { className: css.saved, children: t('action.saved') })] })] }))] }));
}
//# sourceMappingURL=ModelCapabilityCard.js.map