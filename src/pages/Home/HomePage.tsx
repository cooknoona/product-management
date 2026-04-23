import { useEffect, useState } from 'react'
import { SettingButton } from '../../common/buttons'
import { useLayoutTitle } from '../../common/layouts'
import { useLocalisation } from '../../localisation'
import { SettingModal } from '../../common/modals'
import './HomePage.css'

export function HomePage() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { setPageTitle } = useLayoutTitle()
  const { t } = useLocalisation()

  useEffect(() => {
    setPageTitle(t('home.title'))
    return () => setPageTitle('')
  }, [setPageTitle, t])

  return (
    <div className="home-page">
      <div className="home-page__toolbar">
        <SettingButton onClick={() => setSettingsOpen(true)} />
      </div>
      {settingsOpen ? <SettingModal onClose={() => setSettingsOpen(false)} /> : null}
    </div>
  )
}
