import type { ButtonHTMLAttributes } from 'react'
import { MdClose } from 'react-icons/md'
import './ActionButtons.css'

type CloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function CloseButton({ className = '', ...props }: CloseButtonProps) {
  const mergedClassName = ['close-button', className].filter(Boolean).join(' ')
  return (
    <button {...props} className={mergedClassName}>
      <MdClose className="close-button__icon" aria-hidden />
    </button>
  )
}
