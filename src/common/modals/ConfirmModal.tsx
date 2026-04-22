import { createPortal } from 'react-dom'
import { MdHelpOutline } from 'react-icons/md'
import { useLocalisation } from '../../localisation'
import { CancelButton, ConfirmButton } from '../buttons'
import './ModalShell.css'

type ConfirmModalProps = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  const { t } = useLocalisation()
  const node = (
    <div className="modal-shell-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="modal-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-shell__header">
          <MdHelpOutline aria-hidden className="modal-shell__icon modal-shell__icon--confirm" />
          <h2 id="confirm-modal-title" className="modal-shell__title">
            {t('modal.confirmTitle')}
          </h2>
        </div>
        <p className="modal-shell__body">{message}</p>
        <div className="modal-shell__actions modal-shell__actions--dual">
          <CancelButton type="button" onClick={onCancel}>
            {t('common.cancel')}
          </CancelButton>
          <ConfirmButton type="button" onClick={onConfirm}>
            {t('common.confirm')}
          </ConfirmButton>
        </div>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
