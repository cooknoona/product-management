import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLayoutTitle } from '../../common/layouts'
import './HomePage.css'

export function HomePage() {
  const { setPageTitle } = useLayoutTitle()

  useEffect(() => {
    setPageTitle('홈')
    return () => setPageTitle('')
  }, [setPageTitle])

  return (
    <div className="home-page">
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
