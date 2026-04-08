import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import './LoginPage.css'

type Mode = 'login' | 'register'

export function LoginPage() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [accountId, setAccountId] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (user) return <Navigate to="/home" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      if (mode === 'register') {
        const res = await window.electronAPI.auth.register({
          accountId,
          password,
          name,
        })
        if (!res.ok) {
          if (res.error === 'duplicate_account') {
            setError('이미 사용 중인 계정입니다.')
          } else {
            setError('등록에 실패했습니다.')
          }
          return
        }
        setMode('login')
        setPassword('')
        setName('')
        return
      }

      const res = await window.electronAPI.auth.login({ accountId, password })
      if (!res.ok) {
        setError('계정 또는 비밀번호가 올바르지 않습니다.')
        return
      }
      login(res.user)
      navigate('/home')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>재고조사</h1>
        <p className="login-lead">
          {mode === 'login' ? '로그인' : '계정 등록'}
        </p>

        <div className="login-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => {
              setMode('login')
              setError(null)
            }}
          >
            로그인
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => {
              setMode('register')
              setError(null)
            }}
          >
            등록
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>계정 ID</span>
            <input
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          {mode === 'register' && (
            <label>
              <span>이름</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
          )}
          <label>
            <span>비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === 'login' ? 'current-password' : 'new-password'
              }
              required
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" disabled={pending}>
            {pending ? '처리 중…' : mode === 'login' ? '로그인' : '등록'}
          </button>
        </form>
      </div>
    </div>
  )
}
