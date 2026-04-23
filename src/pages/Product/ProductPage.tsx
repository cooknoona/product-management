import { useEffect, useState } from 'react'
import { SettingButton } from '../../common/buttons'
import { useLayoutTitle } from '../../common/layouts'
import { useLocalisation } from '../../localisation'
import { SettingModal } from '../../common/modals'
import './ProductPage.css'

export function ProductPage() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { setPageTitle } = useLayoutTitle()
  const { t } = useLocalisation()

  useEffect(() => {
    setPageTitle(t('product.title'))
    return () => setPageTitle('')
  }, [setPageTitle, t])

  return (
    <div className="product-page">
      <div className="product-page__toolbar">
        <SettingButton onClick={() => setSettingsOpen(true)} />
      </div>
      {settingsOpen ? <SettingModal onClose={() => setSettingsOpen(false)} /> : null}
    </div>
  )
}
