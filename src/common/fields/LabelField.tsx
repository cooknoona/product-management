import { cloneElement, isValidElement, type PropsWithChildren, type ReactElement } from 'react'
import { useLocalisation } from '../../localisation'
import './LabelField.css'

type LabelFieldProps = PropsWithChildren<{
  labelName: string
  required?: boolean
}>

export function LabelField({ labelName, required = false, children }: LabelFieldProps) {
  const { t } = useLocalisation()
  const control =
    required && isValidElement(children)
      ? cloneElement(children as ReactElement<{ required?: boolean }>, { required: true })
      : children

  return (
    <label className="label-field">
      <span className="label-field__label-row">
        <span className="label-field__name">{labelName}</span>
        {required ? (
          <abbr className="label-field__required-mark" title={t('common.required')}>
            *
          </abbr>
        ) : null}
      </span>
      <span className="label-field__control">{control}</span>
    </label>
  )
}
