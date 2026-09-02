import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { Button, IconChevronDownOutline14, Input } from '@deepseek-ai/dsh-client-ui-primitives'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { SettingsValue } from './index.ts'
import css from './ModelCapabilityCard.module.css'

export interface ModelOption {
  key: string
  provider: string
  model: string
  name: string
}

export interface ModelCapabilityCardInjected {
  scope: SettingsScope<SettingsValue>
  t: (key: string) => string
  loadModels: () => Promise<ModelOption[]>
}

export type ModelCapabilityCardProps = ModelCapabilityCardInjected

/**
 * Collapsible plugin configuration card: pick a model from the catalog, edit its
 * capability description, and save. Single-column layout so it fits the UI block.
 */
export function ModelCapabilityCard({ scope, t, loadModels }: ModelCapabilityCardProps): React.ReactElement {
  const snapshot = useSyncExternalStore(
    (cb) => scope.subscribe(cb),
    () => scope.getSnapshot(),
  )
  const entries = snapshot.value?.descriptions ?? []
  const [open, setOpen] = useState(true)
  const [models, setModels] = useState<ModelOption[]>([])
  const [selected, setSelected] = useState('')
  const [cap, setCap] = useState('')
  const [savedAt, setSavedAt] = useState(-1)

  useEffect(() => {
    let cancelled = false
    void loadModels().then((ms) => {
      if (cancelled) return
      setModels(ms)
      setSelected((prev) => prev || ms[0]?.key || '')
    }).catch((err: unknown) => {
      console.error('[dsh-client-ui-subagent-model-picker] loadModels failed:', err)
      setModels([])
    })
    return () => { cancelled = true }
  }, [loadModels])

  const entriesKey = JSON.stringify(entries)
  useEffect(() => {
    const entry = entries.find((e) => `${e.provider}/${e.model}` === selected)
    setCap(entry?.capabilities ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, entriesKey])

  const save = async (): Promise<void> => {
    if (!selected) return
    const sep = selected.indexOf('/')
    const provider = selected.slice(0, sep)
    const model = selected.slice(sep + 1)
    const rest = entries.filter((e) => `${e.provider}/${e.model}` !== selected)
    const next = [...rest, { provider, model, capabilities: cap }]
    await scope.set('descriptions', next)
    setSavedAt(Date.now())
  }

  return (
    <div className={css.card}>
      <button type="button" className={css.header} onClick={() => setOpen((v) => !v)}>
        <span className={css.headText}>
          <span className={css.name}>{t('card.title')}</span>
          <span className={css.description}>{t('card.description')}</span>
        </span>
        <IconChevronDownOutline14 className={open ? `${css.chevron} ${css.chevronOpen}` : css.chevron} />
      </button>
      {open && (
        <div className={css.body}>
          <label className={css.label}>{t('field.model')}</label>
          <select
            className={css.select}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {models.length === 0 && <option value="">{t('field.noModels')}</option>}
            {models.map((m) => (
              <option key={m.key} value={m.key}>{`${m.provider}/${m.model} — ${m.name}`}</option>
            ))}
          </select>
          <label className={css.label}>{t('field.capabilities')}</label>
          <Input className={css.capability ?? ''} placeholder={t('field.capabilities')} value={cap} onChange={(e) => setCap(e.target.value)} />
          <div className={css.footer}>
            <Button variant="primary" disabled={!selected} onClick={() => void save()}>{t('action.save')}</Button>
            {savedAt > 0 && <span className={css.saved}>{t('action.saved')}</span>}
          </div>
        </div>
      )}
    </div>
  )
}
