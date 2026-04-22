import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLayoutTitle } from '../../common/layouts'
import { useLocalisation } from '../../localisation'
import './HomePage.css'

export function HomePage() {
  const { setPageTitle } = useLayoutTitle()
  const { t } = useLocalisation()

  useEffect(() => {
    setPageTitle(t('home.title'))
    return () => setPageTitle('')
  }, [setPageTitle, t])

  return (
    <div className="home-page">
      <main className="home-main">
        <p className="home-welcome">{t('app.welcome')}</p>
        <nav className="home-nav">
          <Link className="home-link" to="/product">
            {t('home.navProduct')}
          </Link>
        </nav>
      </main>
    </div>
  )
}
