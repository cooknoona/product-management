import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import './ActionButtons.css'

type CancelButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function CancelButton({ children, className = '', ...props }: CancelButtonProps) {
  const mergedClassName = ['action-button', 'action-button--cancel', className].filter(Boolean).join(' ')
  return (
    <button {...props} className={mergedClassName}>
      {children}
    </button>
  )
}
