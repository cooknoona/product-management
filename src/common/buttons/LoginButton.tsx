import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import './LoginButton.css'

type LoginButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function LoginButton({ children, className = '', ...props }: LoginButtonProps) {
  const mergedClassName = ['login-button', className].filter(Boolean).join(' ')
  return (
    <button {...props} className={mergedClassName}>
      {children}
    </button>
  )
}
