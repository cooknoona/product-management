import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LoadingSpinner } from '../common/loading/LoadingSpinner'

type GlobalLoadingContextValue = {
  /** 비동기 작업 동안 전역 스피너 표시 (중첩 시 카운터로 관리) */
  runWithLoading: <T>(fn: () => Promise<T>) => Promise<T>
  isLoading: boolean
}

const GlobalLoadingContext = createContext<GlobalLoadingContextValue | null>(null)

export function GlobalLoadingProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)

  const start = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  const stop = useCallback(() => {
    setCount((c) => Math.max(0, c - 1))
  }, [])

  const runWithLoading = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T> => {
      start()
      try {
        return await fn()
      } finally {
        stop()
      }
    },
    [start, stop],
  )

  const value = useMemo(
    () => ({
      runWithLoading,
      isLoading: count > 0,
    }),
    [runWithLoading, count],
  )

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
      {count > 0 ? <LoadingSpinner /> : null}
    </GlobalLoadingContext.Provider>
  )
}

export function useGlobalLoading() {
  const ctx = useContext(GlobalLoadingContext)
  if (!ctx) {
    throw new Error('useGlobalLoading must be used within GlobalLoadingProvider')
  }
  return ctx
}
