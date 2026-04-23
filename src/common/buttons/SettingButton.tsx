import { MdSettings } from 'react-icons/md'
import { useLocalisation } from '../../localisation'
import './SettingButton.css'

type SettingButtonProps = {
  onClick: () => void
  className?: string
  disabled?: boolean
  id?: string
}

export function SettingButton({ onClick, className = '', disabled, id }: SettingButtonProps) {
  const { t } = useLocalisation()
  const label = t('common.settings')
  return (
    <button
      type="button"
      id={id}
      className={['setting-button', className].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      <MdSettings className="setting-button__icon" aria-hidden />
    </button>
  )
}
