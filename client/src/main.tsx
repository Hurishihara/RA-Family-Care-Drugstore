import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/login-page.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/auth.context.tsx'
import Private from './layouts/Private.tsx'
import CustomInventoryTablePage from './pages/inventory-page.tsx'
import CustomOrdersTablePage from './pages/orders-page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<Private />}>
          <Route path='/inventory' element={<CustomInventoryTablePage />} />
          <Route path='/orders' element={<CustomOrdersTablePage />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)