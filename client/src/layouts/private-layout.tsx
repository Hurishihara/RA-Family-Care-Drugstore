import { useAuth } from "@/hooks/auth.hook"
import CustomSidebar from "@/components/CustomSidebar";
import { Navigate, Outlet } from "react-router";

const Private = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
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