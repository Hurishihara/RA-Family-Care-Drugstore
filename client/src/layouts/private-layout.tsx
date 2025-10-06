import { useAuth } from '@/hooks/auth.hook'
import CustomSidebar from '@/components/CustomSidebar';
import { Navigate, Outlet } from 'react-router';

import PrivateLayoutSkeleton from './sub-components/private-layout-skeleton';

const Private = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <PrivateLayoutSkeleton />
    }

    return isAuthenticated ? (
        <>
            <CustomSidebar>
                <Outlet />    
            </CustomSidebar>
        </>
    ) : <Navigate to='/login' />
}

export default Private;