import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/LoginPage.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/auth.context.tsx'
import Private from './layouts/Private.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<Private />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)