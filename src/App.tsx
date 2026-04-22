import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { MainLayout } from './common/layouts/MainLayout'
import { AppModalProvider } from './errors/AppModalContext'
import { LocalisationProvider } from './localisation'
import { GlobalLoadingProvider } from './loading/GlobalLoadingContext'
import { HomePage } from './pages/Home/HomePage'
import { LoginPage } from './pages/Login/LoginPage'
import { ProductPage } from './pages/Product/ProductPage'
import { ThemeProvider } from './theme'
import './App.css'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LocalisationProvider>
        <HashRouter>
          <AuthProvider>
            <AppModalProvider>
              <GlobalLoadingProvider>
                <div className="app-shell">
                  <AppRoutes />
                </div>
              </GlobalLoadingProvider>
            </AppModalProvider>
          </AuthProvider>
        </HashRouter>
      </LocalisationProvider>
    </ThemeProvider>
  )
}
