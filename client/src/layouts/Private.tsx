import { useAuth } from "@/hooks/auth.hook"
import { Navigate, Outlet } from "react-router";

const Private = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <Outlet />
    ) : <Navigate to='/login' />
}

export default Private;