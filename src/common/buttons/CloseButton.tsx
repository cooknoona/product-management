import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import './ActionButtons.css'

type CloseButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function CloseButton({ children, className = '', ...props }: CloseButtonProps) {
  const mergedClassName = ['action-button', 'action-button--cancel', className].filter(Boolean).join(' ')
  return (
    <button {...props} className={mergedClassName}>
      {children}
    </button>
  )
}
