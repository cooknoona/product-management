import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import './ActionButtons.css'

type ApplyButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function ApplyButton({ children, className = '', ...props }: ApplyButtonProps) {
  const mergedClassName = ['action-button', 'action-button--apply', className].filter(Boolean).join(' ')
  return (
    <button {...props} className={mergedClassName}>
      {children}
    </button>
  )
}
