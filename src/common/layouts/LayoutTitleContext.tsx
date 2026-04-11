import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type LayoutTitleContextValue = {
  pageTitle: string
  setPageTitle: (title: string) => void
}

const LayoutTitleContext = createContext<LayoutTitleContextValue | null>(null)

export function LayoutTitleProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState('')
  const value = useMemo(() => ({ pageTitle, setPageTitle }), [pageTitle])
  return <LayoutTitleContext.Provider value={value}>{children}</LayoutTitleContext.Provider>
}

export function useLayoutTitle() {
  const ctx = useContext(LayoutTitleContext)
  if (!ctx) {
    throw new Error('useLayoutTitle must be used within LayoutTitleProvider')
  }
  return ctx
}
