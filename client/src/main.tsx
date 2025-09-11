import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/login-page.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/auth.context.tsx'
import Private from './layouts/Private.tsx'
import CustomInventoryTablePage from './pages/inventory-page.tsx'
import CustomOrdersTablePage from './pages/orders-page.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<Private />}>
          <Route path='/inventory' element={<CustomInventoryTablePage />} />
          <Route path='/orders' element={<CustomOrdersTablePage />} />
        </Route>
      </Routes>
      <Toaster position='top-center' />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)