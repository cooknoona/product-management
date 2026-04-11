import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { MdOutlineWarning } from 'react-icons/md'
import { StandardButton } from '../buttons'
import type { WarningModalAction } from './warning-modal.types'
import './ModalShell.css'

type WarningModalProps = {
  message: string
  actions?: WarningModalAction[]
  onDismiss: () => void
}

const DEFAULT_ACTIONS: WarningModalAction[] = [
  {
    label: '확인',
    variant: 'primary',
    onClick: () => {},
  },
]

export function WarningModal({ message, actions, onDismiss }: WarningModalProps) {
  const resolvedActions = useMemo(() => actions ?? DEFAULT_ACTIONS, [actions])

  async function handleAction(action: WarningModalAction) {
    await Promise.resolve(action.onClick())
    onDismiss()
  }

  const node = (
    <div className="modal-shell-backdrop" role="presentation" onClick={onDismiss}>
      <div
        className="modal-shell"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="warning-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-shell__header">
          <MdOutlineWarning aria-hidden color="#ca8a04" />
          <h2 id="warning-modal-title" className="modal-shell__title">
            WARNING
          </h2>
        </div>
        <p className="modal-shell__body">{message}</p>
        <div className="modal-shell__actions modal-shell__actions--warning">
          {resolvedActions.map((action, index) => (
            <StandardButton
              key={`${action.label}-${index}`}
              type="button"
              variant={action.variant ?? 'primary'}
              onClick={() => void handleAction(action)}
            >
              {action.label}
            </StandardButton>
          ))}
        </div>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
