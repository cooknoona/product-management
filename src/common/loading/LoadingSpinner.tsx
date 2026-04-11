import { createPortal } from 'react-dom'
import './LoadingSpinner.css'

export function LoadingSpinner() {
  const node = (
    <div
      className="loading-spinner-root"
      role="status"
      aria-busy="true"
      aria-label="로딩 중"
    >
      <div className="loading-spinner-backdrop" />
      <div className="loading-spinner-panel">
        <span className="loading-spinner__ring" aria-hidden />
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
