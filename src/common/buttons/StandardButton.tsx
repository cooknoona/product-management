import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import './StandardButton.css'

type StandardButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary'
  }
>

export function StandardButton({
  children,
  className = '',
  variant = 'primary',
  ...props
}: StandardButtonProps) {
  const variantClass = variant === 'secondary' ? 'standard-button--secondary' : ''
  const mergedClassName = ['standard-button', variantClass, className].filter(Boolean).join(' ')
  return (
    <button {...props} className={mergedClassName}>
      {children}
    </button>
  )
}
