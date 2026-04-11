import type { PropsWithChildren } from 'react'
import './PageSection.css'

type PageSectionProps = PropsWithChildren<{
  title?: string
  className?: string
}>

export function PageSection({ title, className = '', children }: PageSectionProps) {
  return (
    <section className={`page-section ${className}`.trim()}>
      {title ? <h2 className="page-section__title">{title}</h2> : null}
      <div className="page-section__body">{children}</div>
    </section>
  )
}
