import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocalisation } from '../../localisation'
import { useTheme } from '../../theme'
import { ApplyButton, CancelButton, ConfirmButton } from '../buttons'
import { OptionDropdown } from '../dropdowns'
import { ConfirmModal } from './ConfirmModal'
import './ModalShell.css'
import './SettingModal.css'

type SettingModalProps = {
  onClose: () => void
}

export function SettingModal({ onClose }: SettingModalProps) {
  const { t, locale, setLocale } = useLocalisation()
  const { preference, resolved, setPreference } = useTheme()
  const currentMode = preference === 'system' ? resolved : preference
  const [draftLocale, setDraftLocale] = useState<'ko' | 'en'>(locale)
  const [draftMode, setDraftMode] = useState<'light' | 'dark'>(currentMode)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const isDirty = draftLocale !== locale || draftMode !== currentMode

  const languageOptions = [
    { value: 'ko', label: t('settings.language.korean') },
    { value: 'en', label: t('settings.language.english') },
  ]
  const modeOptions = [
    { value: 'dark', label: t('settings.mode.dark') },
    { value: 'light', label: t('settings.mode.light') },
  ]

  function applyDraft() {
    setLocale(draftLocale)
    setPreference(draftMode)
  }

  function handleApply() {
    applyDraft()
  }

  function handleConfirm() {
    applyDraft()
    onClose()
  }

  function handleCancel() {
    if (isDirty) {
      setShowCancelConfirm(true)
      return
    }
    onClose()
  }

  const node = (
    <div className="modal-shell-backdrop" role="presentation" onClick={handleCancel}>
      <div
        className="modal-shell modal-shell--settings"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-shell__header">
          <h2 id="settings-modal-title" className="modal-shell__title">
            {t('settings.title')}
          </h2>
        </div>
        <div className="settings-modal__body">
          <section className="settings-modal__section" aria-labelledby="settings-display-title">
            <h3 id="settings-display-title" className="settings-modal__section-title">
              {t('settings.sectionDisplay')}
            </h3>
            <div className="settings-modal__row">
              <span className="settings-modal__label">{t('settings.fieldMode')}</span>
              <OptionDropdown
                value={draftMode}
                options={modeOptions}
                onChange={(e) => setDraftMode(e.target.value as 'light' | 'dark')}
              />
            </div>
          </section>

          <section className="settings-modal__section" aria-labelledby="settings-language-title">
            <h3 id="settings-language-title" className="settings-modal__section-title">
              {t('settings.sectionLanguage')}
            </h3>
            <div className="settings-modal__row">
              <span className="settings-modal__label">{t('settings.fieldCurrentLanguage')}</span>
              <OptionDropdown
                value={draftLocale}
                options={languageOptions}
                onChange={(e) => setDraftLocale(e.target.value as 'ko' | 'en')}
              />
            </div>
          </section>
        </div>
        <div className="modal-shell__actions modal-shell__actions--triple">
          <div className="settings-modal__actions-left">
            <CancelButton type="button" onClick={handleCancel}>
              {t('common.cancel')}
            </CancelButton>
          </div>
          <div className="settings-modal__actions-right">
            <ApplyButton type="button" onClick={handleApply}>
              {t('common.apply')}
            </ApplyButton>
            <ConfirmButton type="button" onClick={handleConfirm}>
              {t('common.confirm')}
            </ConfirmButton>
          </div>
        </div>
      </div>
      {showCancelConfirm ? (
        <ConfirmModal
          message={t('settings.cancelWarning')}
          onCancel={() => setShowCancelConfirm(false)}
          onConfirm={() => {
            setShowCancelConfirm(false)
            onClose()
          }}
        />
      ) : null}
    </div>
  )

  return createPortal(node, document.body)
}
