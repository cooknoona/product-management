import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>홈</h1>
        <div className="home-user">
          <span>
            {user?.name} ({user?.accountId})
          </span>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>
      <main className="home-main">
        <p className="home-welcome">재고조사 앱에 오신 것을 환영합니다.</p>
        <nav className="home-nav">
          <Link className="home-link" to="/product">
            상품 관리
          </Link>
        </nav>
      </main>
    </div>
  )
}
