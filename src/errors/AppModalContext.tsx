import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AppErrorCodeValue } from '@shared/app-errors'
import { ErrorModal, WarningModal } from '../common/modals'
import type { WarningModalAction } from '../common/modals/warning-modal.types'
import { getAppErrorMessage } from './app-error-messages'

type ModalState =
  | { kind: 'none' }
  | { kind: 'error'; code: AppErrorCodeValue }
  | {
      kind: 'warning'
      message: string
      actions?: WarningModalAction[]
    }

type ShowWarningChoiceOptions = {
  message: string
  actions: WarningModalAction[]
}

type AppModalContextValue = {
  showError: (code: AppErrorCodeValue) => void
  /** 검증 등 단일 확인만 필요할 때 */
  showValidationWarning: (message: string) => void
  /** 취소/삭제 등 버튼이 여러 개인 경고(선택형) */
  showWarningChoice: (options: ShowWarningChoiceOptions) => void
  dismissModal: () => void
}

const AppModalContext = createContext<AppModalContextValue | null>(null)

export function AppModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({ kind: 'none' })

  const showError = useCallback((code: AppErrorCodeValue) => {
    setState({ kind: 'error', code })
  }, [])

  const showValidationWarning = useCallback((message: string) => {
    setState({ kind: 'warning', message })
  }, [])

  const showWarningChoice = useCallback((options: ShowWarningChoiceOptions) => {
    if (options.actions.length === 0) return
    setState({
      kind: 'warning',
      message: options.message,
      actions: options.actions,
    })
  }, [])

  const dismissModal = useCallback(() => {
    setState({ kind: 'none' })
  }, [])

  const value = useMemo(
    () => ({ showError, showValidationWarning, showWarningChoice, dismissModal }),
    [showError, showValidationWarning, showWarningChoice, dismissModal],
  )

  return (
    <AppModalContext.Provider value={value}>
      {state.kind === 'error' ? (
        <ErrorModal message={getAppErrorMessage(state.code)} onClose={dismissModal} />
      ) : null}
      {state.kind === 'warning' ? (
        <WarningModal message={state.message} actions={state.actions} onDismiss={dismissModal} />
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
