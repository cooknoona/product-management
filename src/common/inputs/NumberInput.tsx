import type { InputHTMLAttributes } from 'react'
import './inputs.css'

type NumberInputProps = InputHTMLAttributes<HTMLInputElement>

export function NumberInput({ className = '', type = 'number', ...props }: NumberInputProps) {
  const mergedClassName = `standard-input ${className}`.trim()
  return <input {...props} type={type} className={mergedClassName} />
}
