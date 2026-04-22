import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AppErrorCodeValue } from '@shared/app-errors'
import { ConfirmModal, ErrorModal, SuccessModal, WarningModal } from '../common/modals'
import { getMessageKeyForError } from '../localisation/app-error-messages'
import { useLocalisation } from '../localisation'

type ModalAction = () => void | Promise<void>

type ModalState =
  | { kind: 'none' }
  | { kind: 'error'; code: AppErrorCodeValue }
  | { kind: 'warning'; message: string }
  | { kind: 'success'; message: string; onConfirm?: ModalAction }
  | { kind: 'confirm'; message: string; onConfirm: ModalAction; onCancel?: ModalAction }

type AppModalContextValue = {
  showError: (code: AppErrorCodeValue) => void
  showValidationWarning: (message: string) => void
  showSuccess: (message: string, onConfirm?: ModalAction) => void
  showConfirm: (message: string, onConfirm: ModalAction, onCancel?: ModalAction) => void
  dismissModal: () => void
}

const AppModalContext = createContext<AppModalContextValue | null>(null)

export function AppModalProvider({ children }: { children: ReactNode }) {
  const { t } = useLocalisation()
  const [state, setState] = useState<ModalState>({ kind: 'none' })

  const showError = useCallback((code: AppErrorCodeValue) => {
    setState({ kind: 'error', code })
  }, [])

  const showValidationWarning = useCallback((message: string) => {
    setState({ kind: 'warning', message })
  }, [])

  const showSuccess = useCallback((message: string, onConfirm?: ModalAction) => {
    setState({ kind: 'success', message, onConfirm })
  }, [])

  const showConfirm = useCallback((message: string, onConfirm: ModalAction, onCancel?: ModalAction) => {
    setState({ kind: 'confirm', message, onConfirm, onCancel })
  }, [])

  const dismissModal = useCallback(() => {
    setState({ kind: 'none' })
  }, [])

  const handleSuccessConfirm = useCallback(async () => {
    if (state.kind !== 'success') return
    await Promise.resolve(state.onConfirm?.())
    dismissModal()
  }, [dismissModal, state])

  const handleConfirmYes = useCallback(async () => {
    if (state.kind !== 'confirm') return
    await Promise.resolve(state.onConfirm())
    dismissModal()
  }, [dismissModal, state])

  const handleConfirmNo = useCallback(async () => {
    if (state.kind !== 'confirm') return
    await Promise.resolve(state.onCancel?.())
    dismissModal()
  }, [dismissModal, state])

  const value = useMemo(
    () => ({ showError, showValidationWarning, showSuccess, showConfirm, dismissModal }),
    [showError, showValidationWarning, showSuccess, showConfirm, dismissModal],
  )

  return (
    <AppModalContext.Provider value={value}>
      {state.kind === 'error' ? (
        <ErrorModal message={t(getMessageKeyForError(state.code))} onClose={dismissModal} />
      ) : null}
      {state.kind === 'warning' ? (
        <WarningModal message={state.message} onClose={dismissModal} />
      ) : null}
      {state.kind === 'success' ? (
        <SuccessModal message={state.message} onConfirm={() => void handleSuccessConfirm()} />
      ) : null}
      {state.kind === 'confirm' ? (
        <ConfirmModal
          message={state.message}
          onConfirm={() => void handleConfirmYes()}
          onCancel={() => void handleConfirmNo()}
        />
      ) : null}
      {children}
    </AppModalContext.Provider>
  )
}

export function useAppModal() {
  const ctx = useContext(AppModalContext)
  if (!ctx) {
    throw new Error('useAppModal must be used within AppModalProvider')
  }
  return ctx
}
