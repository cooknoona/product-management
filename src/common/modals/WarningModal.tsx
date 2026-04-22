import { createPortal } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { useLocalisation } from '../../localisation'
import { CloseButton } from '../buttons'
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
        className="modal-shell"
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
        <div className="modal-shell__actions">
          <CloseButton type="button" onClick={onClose}>
            {t('common.close')}
          </CloseButton>
        </div>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
