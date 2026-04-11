import type { FormHTMLAttributes } from 'react'
import './StandardForm.css'

type StandardFormProps = FormHTMLAttributes<HTMLFormElement> & {
  layout?: 'stack' | 'grid'
}

export function StandardForm({ layout = 'stack', className = '', ...props }: StandardFormProps) {
  const merged = `standard-form standard-form--${layout} ${className}`.trim()
  return <form {...props} className={merged} />
}
