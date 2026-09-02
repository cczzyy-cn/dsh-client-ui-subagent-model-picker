import React, { useSyncExternalStore } from 'react'
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { SettingsValue } from './index.ts'
import css from './ModelCapabilityCard.module.css'

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
    <div className={css.card}>
      <div className={css.header}>
        <div className={css.headText}>
          <span className={css.name}>{t('card.title')}</span>
          <span className={css.description}>{t('card.description')}</span>
        </div>
      </div>
      <div className={css.body}>
        {draft.map((row, i) => (
          <div key={i} className={css.fieldRow}>
            <Input placeholder={t('field.provider')} value={row.provider} onChange={(e) => updateRow(i, 'provider', e.target.value)} />
            <Input placeholder={t('field.model')} value={row.model} onChange={(e) => updateRow(i, 'model', e.target.value)} />
            <Input placeholder={t('field.capabilities')} value={row.capabilities} onChange={(e) => updateRow(i, 'capabilities', e.target.value)} />
            <Button className={css.removeBtn} onClick={() => removeRow(i)}>{t('action.remove')}</Button>
          </div>
        ))}
        <div className={css.footer}>
          <Button variant="outline" onClick={addRow}>{t('action.add')}</Button>
          <Button variant="primary" onClick={() => void save()}>{t('action.save')}</Button>
          {savedAt > 0 && <span className={css.saved}>{t('action.saved')}</span>}
        </div>
      </div>
    </div>
  )
}
