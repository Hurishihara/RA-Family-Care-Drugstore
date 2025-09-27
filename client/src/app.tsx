import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { AuthProvider } from './contexts/auth.context.tsx';
import { Toaster } from 'sonner';
import Private from './layouts/private-layout.tsx';
import LoginPage from './pages/login-page.tsx';
import CustomInventoryTablePage from './pages/inventory-page.tsx';
import CustomOrdersTablePage from './pages/orders-page.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        Component: () => <Navigate to='/login' replace />
    },
    {
        path: '/login',
        Component: LoginPage,
    },
    {
        Component: Private,
        children: [
            {
                path: '/inventory',
                Component: CustomInventoryTablePage,
            },
            {
                path: '/orders',
                Component: CustomOrdersTablePage,
            }
        ]
    }
]);

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position='top-center' />
        </AuthProvider>
    )
}

export default App;