import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { LayoutTitleProvider, useLayoutTitle } from './LayoutTitleContext'
import { PageSection } from '../sections'
import './MainLayout.css'

function MainLayoutShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { pageTitle } = useLayoutTitle()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="main-layout">
      <header className="main-layout-header">
        <div className="main-layout-brand">Product Management</div>
        <div className="main-layout-page-title" title={pageTitle || undefined}>
          {pageTitle}
        </div>
        <nav className="main-layout-nav">
          <Link
            to="/home"
            className={`main-layout-link ${location.pathname === '/home' ? 'is-active' : ''}`}
          >
            홈
          </Link>
          <Link
            to="/product"
            className={`main-layout-link ${location.pathname === '/product' ? 'is-active' : ''}`}
          >
            상품
          </Link>
        </nav>
        <div className="main-layout-user">
          <span>
            {user?.name} ({user?.accountId})
          </span>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>
      <main className="main-layout-content">
        <PageSection className="main-layout__outlet">
          <Outlet />
        </PageSection>
      </main>
    </div>
  )
}

export function MainLayout() {
  return (
    <LayoutTitleProvider>
      <MainLayoutShell />
    </LayoutTitleProvider>
  )
}
