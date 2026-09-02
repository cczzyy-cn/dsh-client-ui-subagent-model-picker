import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useSyncExternalStore } from 'react';
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './ModelCapabilityCard.module.css';
/** Plugin configuration card: per-model capability descriptions. */
export function ModelCapabilityCard({ scope, t }) {
    const snapshot = useSyncExternalStore((cb) => scope.subscribe(cb), () => scope.getSnapshot());
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
    return (_jsxs("div", { className: css.card, children: [_jsx("div", { className: css.header, children: _jsxs("div", { className: css.headText, children: [_jsx("span", { className: css.name, children: t('card.title') }), _jsx("span", { className: css.description, children: t('card.description') })] }) }), _jsxs("div", { className: css.body, children: [draft.map((row, i) => (_jsxs("div", { className: css.fieldRow, children: [_jsx(Input, { placeholder: t('field.provider'), value: row.provider, onChange: (e) => updateRow(i, 'provider', e.target.value) }), _jsx(Input, { placeholder: t('field.model'), value: row.model, onChange: (e) => updateRow(i, 'model', e.target.value) }), _jsx(Input, { placeholder: t('field.capabilities'), value: row.capabilities, onChange: (e) => updateRow(i, 'capabilities', e.target.value) }), _jsx(Button, { className: css.removeBtn, onClick: () => removeRow(i), children: t('action.remove') })] }, i))), _jsxs("div", { className: css.footer, children: [_jsx(Button, { variant: "outline", onClick: addRow, children: t('action.add') }), _jsx(Button, { variant: "primary", onClick: () => void save(), children: t('action.save') }), savedAt > 0 && _jsx("span", { className: css.saved, children: t('action.saved') })] })] })] }));
}
//# sourceMappingURL=ModelCapabilityCard.js.map