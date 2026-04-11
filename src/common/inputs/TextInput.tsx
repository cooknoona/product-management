import type { InputHTMLAttributes } from 'react'
import './inputs.css'

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInput({ className = '', type = 'text', ...props }: TextInputProps) {
  const mergedClassName = `standard-input ${className}`.trim()
  return <input {...props} type={type} className={mergedClassName} />
}
