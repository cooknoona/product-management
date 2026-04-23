import { createPortal } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { useLocalisation } from '../../localisation'
import { ConfirmButton } from '../buttons'
import './ModalShell.css'

type WarningModalProps = {
  message: string
  onClose: () => void
}

export function WarningModal({ message, onClose }: WarningModalProps) {
  const { t } = useLocalisation()

  const node = (
    <div className="modal-shell-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-shell modal-shell--status modal-shell--warning"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="warning-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-shell__header">
          <MdOutlineWarning aria-hidden className="modal-shell__icon modal-shell__icon--warning" />
          <h2 id="warning-modal-title" className="modal-shell__title">
            {t('modal.warningTitle')}
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
