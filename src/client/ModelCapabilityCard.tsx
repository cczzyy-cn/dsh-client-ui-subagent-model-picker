import React, { useSyncExternalStore } from 'react'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { SettingsValue } from './index.ts'

export interface ModelCapabilityCardInjected {
  scope: SettingsScope<SettingsValue>
  t: (key: string) => string
}

export type ModelCapabilityCardProps = ModelCapabilityCardInjected

/** Plugin configuration card: per-model capability descriptions. */
export function ModelCapabilityCard({ scope, t }: ModelCapabilityCardProps): React.ReactElement {
  const snapshot = useSyncExternalStore(
    (cb) => scope.subscribe(cb),
    () => scope.getSnapshot(),
  )
  const value = snapshot.value ?? { descriptions: [] }
  const [draft, setDraft] = React.useState(value.descriptions)
  const [savedAt, setSavedAt] = React.useState<number>(-1)

  const external = JSON.stringify(value.descriptions)
  React.useEffect(() => {
    setDraft(value.descriptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [external])

  const updateRow = (i: number, field: 'provider' | 'model' | 'capabilities', v: string): void =>
    setDraft(draft.map((row, idx) => (idx === i ? { ...row, [field]: v } : row)))
  const removeRow = (i: number): void => setDraft(draft.filter((_, idx) => idx !== i))
  const addRow = (): void => setDraft([...draft, { provider: '', model: '', capabilities: '' }])
  const save = async (): Promise<void> => {
    await scope.set('descriptions', draft)
    setSavedAt(Date.now())
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <strong>{t('card.title')}</strong>
        <div style={{ color: 'var(--dsh-foreground-2,#000000a6)' }}>{t('card.description')}</div>
      </div>
      {draft.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8 }}>
          <input placeholder={t('field.provider')} value={row.provider} onChange={(e) => updateRow(i, 'provider', e.target.value)} />
          <input placeholder={t('field.model')} value={row.model} onChange={(e) => updateRow(i, 'model', e.target.value)} />
          <input placeholder={t('field.capabilities')} value={row.capabilities} onChange={(e) => updateRow(i, 'capabilities', e.target.value)} />
          <button type="button" onClick={() => removeRow(i)}>{t('action.remove')}</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={addRow}>{t('action.add')}</button>
        <button type="button" onClick={() => void save()}>{t('action.save')}</button>
        {savedAt > 0 && <span>{t('action.saved')}</span>}
      </div>
    </div>
  )
}
