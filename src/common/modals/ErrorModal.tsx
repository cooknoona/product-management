import { createPortal } from 'react-dom'
import { MdErrorOutline } from 'react-icons/md'
import { StandardButton } from '../buttons'
import './ModalShell.css'

type ErrorModalProps = {
  message: string
  onClose: () => void
}

export function ErrorModal({ message, onClose }: ErrorModalProps) {
  const node = (
    <div className="modal-shell-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-shell"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-shell__header">
          <MdErrorOutline aria-hidden color="#dc2626" />
          <h2 id="error-modal-title" className="modal-shell__title">
            ERROR
          </h2>
        </div>
        <p className="modal-shell__body">{message}</p>
        <div className="modal-shell__actions">
          <StandardButton type="button" onClick={onClose}>
            확인
          </StandardButton>
        </div>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
