import { createPortal } from 'react-dom'
import { MdCheckCircleOutline } from 'react-icons/md'
import { useLocalisation } from '../../localisation'
import { ConfirmButton } from '../buttons'
import './ModalShell.css'

type SuccessModalProps = {
  message: string
  onConfirm: () => void
}

export function SuccessModal({ message, onConfirm }: SuccessModalProps) {
  const { t } = useLocalisation()
  const node = (
    <div className="modal-shell-backdrop" role="presentation" onClick={onConfirm}>
      <div
        className="modal-shell modal-shell--status modal-shell--success"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-shell__header">
          <MdCheckCircleOutline aria-hidden className="modal-shell__icon modal-shell__icon--success" />
          <h2 id="success-modal-title" className="modal-shell__title">
            {t('modal.successTitle')}
          </h2>
        </div>
        <p className="modal-shell__body">{message}</p>
        <div className="modal-shell__actions modal-shell__actions--single">
          <ConfirmButton type="button" onClick={onConfirm}>
            {t('common.confirm')}
          </ConfirmButton>
        </div>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
