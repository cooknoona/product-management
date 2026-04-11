import type { PropsWithChildren } from 'react'
import { MdLogin } from 'react-icons/md'
import './LoginCardForm.css'

type LoginCardFormProps = PropsWithChildren<{
  title: string
}>

export function LoginCardForm({ title, children }: LoginCardFormProps) {
  return (
    <div className="login-card-form">
      <div className="login-card-form__header">
        <MdLogin className="login-card-form__icon" aria-hidden />
        <h1 className="login-card-form__title">{title}</h1>
      </div>
      <div className="login-card-form__body">{children}</div>
    </div>
  )
}
