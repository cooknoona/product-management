import { createPortal } from 'react-dom'
import { MdErrorOutline } from 'react-icons/md'
import { useLocalisation } from '../../localisation'
import { ConfirmButton } from '../buttons'
import './ModalShell.css'

type ErrorModalProps = {
  message: string
  onClose: () => void
}

export function ErrorModal({ message, onClose }: ErrorModalProps) {
  const { t } = useLocalisation()
  const node = (
    <div className="modal-shell-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-shell modal-shell--status modal-shell--error"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-shell__header">
          <MdErrorOutline aria-hidden className="modal-shell__icon modal-shell__icon--error" />
          <h2 id="error-modal-title" className="modal-shell__title">
            {t('modal.errorTitle')}
          </h2>
        </div>
        <p className="modal-shell__body">{message}</p>
        <div className="modal-shell__actions modal-shell__actions--single">
          <ConfirmButton type="button" onClick={onClose}>
            {t('common.close')}
          </ConfirmButton>
        </div>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
