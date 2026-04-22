import type { SelectHTMLAttributes } from 'react'
import './OptionDropdown.css'

export type OptionItem = {
  value: string
  label: string
}

type OptionDropdownProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  options: OptionItem[]
}

export function OptionDropdown({ className = '', options, ...props }: OptionDropdownProps) {
  const mergedClassName = ['option-dropdown', className].filter(Boolean).join(' ')
  return (
    <select {...props} className={mergedClassName}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
