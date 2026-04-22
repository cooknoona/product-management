import { MdSettings } from 'react-icons/md'
import { useLocalisation } from '../../localisation'
import './SettingsButton.css'

type SettingsButtonProps = {
  onClick: () => void
  className?: string
  disabled?: boolean
  id?: string
}

export function SettingsButton({ onClick, className = '', disabled, id }: SettingsButtonProps) {
  const { t } = useLocalisation()
  const label = t('common.settings')
  return (
    <button
      type="button"
      id={id}
      className={['settings-button', className].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      <MdSettings className="settings-button__icon" aria-hidden />
    </button>
  )
}
