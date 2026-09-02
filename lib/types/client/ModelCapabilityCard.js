import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useSyncExternalStore } from 'react';
/** Plugin configuration card: per-model capability descriptions. */
export function ModelCapabilityCard({ scope, t }) {
    const snapshot = useSyncExternalStore(scope.subscribe, scope.getSnapshot);
    const value = snapshot.value ?? { descriptions: [] };
    const [draft, setDraft] = React.useState(value.descriptions);
    const [savedAt, setSavedAt] = React.useState(-1);
    const external = JSON.stringify(value.descriptions);
    React.useEffect(() => {
        setDraft(value.descriptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [external]);
    const updateRow = (i, field, v) => setDraft(draft.map((row, idx) => (idx === i ? { ...row, [field]: v } : row)));
    const removeRow = (i) => setDraft(draft.filter((_, idx) => idx !== i));
    const addRow = () => setDraft([...draft, { provider: '', model: '', capabilities: '' }]);
    const save = async () => {
        await scope.set('descriptions', draft);
        setSavedAt(Date.now());
    };
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [_jsxs("div", { children: [_jsx("strong", { children: t('card.title') }), _jsx("div", { style: { color: 'var(--dsh-foreground-2,#000000a6)' }, children: t('card.description') })] }), draft.map((row, i) => (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8 }, children: [_jsx("input", { placeholder: t('field.provider'), value: row.provider, onChange: (e) => updateRow(i, 'provider', e.target.value) }), _jsx("input", { placeholder: t('field.model'), value: row.model, onChange: (e) => updateRow(i, 'model', e.target.value) }), _jsx("input", { placeholder: t('field.capabilities'), value: row.capabilities, onChange: (e) => updateRow(i, 'capabilities', e.target.value) }), _jsx("button", { type: "button", onClick: () => removeRow(i), children: t('action.remove') })] }, i))), _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [_jsx("button", { type: "button", onClick: addRow, children: t('action.add') }), _jsx("button", { type: "button", onClick: () => void save(), children: t('action.save') }), savedAt > 0 && _jsx("span", { children: t('action.saved') })] })] }));
}
//# sourceMappingURL=ModelCapabilityCard.js.map