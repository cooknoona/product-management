import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import './ActionButtons.css'

type ConfirmButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function ConfirmButton({ children, className = '', ...props }: ConfirmButtonProps) {
  const mergedClassName = ['action-button', 'action-button--confirm', className].filter(Boolean).join(' ')
  return (
    <button {...props} className={mergedClassName}>
      {children}
    </button>
  )
}
