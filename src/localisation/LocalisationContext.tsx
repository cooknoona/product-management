import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { MessageKey } from './messages.ko'
import { messagesEn } from './messages.en'
import { messagesKo } from './messages.ko'

const STORAGE_KEY = 'pm.locale'

export const SUPPORTED_LOCALES = ['ko', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

const CATALOG: Record<Locale, Record<MessageKey, string>> = {
  ko: messagesKo,
  en: messagesEn,
}

const BCP47: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
}

function readStoredLocale(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'ko' || v === 'en') return v
  } catch {
    /* ignore */
  }
  return 'ko'
}

type LocalisationContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (key: MessageKey) => string
  /** `Intl`·`toLocaleString`용 */
  numberLocale: string
}

const LocalisationContext = createContext<LocalisationContextValue | null>(null)

export function LocalisationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback(
    (key: MessageKey) => CATALOG[locale][key] ?? CATALOG.ko[key] ?? key,
    [locale],
  )

  const value = useMemo<LocalisationContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      numberLocale: BCP47[locale],
    }),
    [locale, setLocale, t],
  )

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'ko'
  }, [locale])

  useEffect(() => {
    document.title = t('app.documentTitle')
  }, [locale, t])

  return <LocalisationContext.Provider value={value}>{children}</LocalisationContext.Provider>
}

export function useLocalisation() {
  const ctx = useContext(LocalisationContext)
  if (!ctx) {
    throw new Error('useLocalisation must be used within LocalisationProvider')
  }
  return ctx
}
