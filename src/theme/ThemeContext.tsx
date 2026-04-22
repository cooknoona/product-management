import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'pm.theme'

export type ThemePreference = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  preference: ThemePreference
  setPreference: (next: ThemePreference) => void
  /** 시스템 모드(`system`)일 때 `prefers-color-scheme` 반영 후 값 */
  resolved: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStored(): ThemePreference {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* ignore */
  }
  return 'system'
}

function resolve(preference: ThemePreference): 'light' | 'dark' {
  if (preference === 'light' || preference === 'dark') return preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readStored)
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => resolve(readStored()))

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (preference === 'system') {
      const m = window.matchMedia('(prefers-color-scheme: dark)')
      const apply = () => setResolved(m.matches ? 'dark' : 'light')
      apply()
      m.addEventListener('change', apply)
      return () => m.removeEventListener('change', apply)
    }
    setResolved(preference)
  }, [preference])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved)
  }, [resolved])

  const value = useMemo(
    () => ({ preference, setPreference, resolved }),
    [preference, setPreference, resolved],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
