import { createPortal } from 'react-dom'
import { useLocalisation } from '../../localisation'
import './LoadingSpinner.css'

export function LoadingSpinner() {
  const { t } = useLocalisation()
  const node = (
    <div
      className="loading-spinner-root"
      role="status"
      aria-busy="true"
      aria-label={t('common.loading')}
    >
      <div className="loading-spinner-backdrop" />
      <div className="loading-spinner-panel">
        <span className="loading-spinner__ring" aria-hidden />
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
