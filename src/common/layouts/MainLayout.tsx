import { Outlet } from 'react-router-dom'
import { LayoutTitleProvider } from './LayoutTitleContext'
import { PageSection } from '../sections'
import './MainLayout.css'

function MainLayoutShell() {
  return (
    <div className="main-layout">
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
