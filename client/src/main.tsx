import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/LoginPage.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

/* Route structure:
- / (Dashboard)
- /login (LoginPage)
*/