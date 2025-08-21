import React, { type FC, type ReactNode } from 'react';
import type { User } from '@/types/user.type';
import { api } from '@/utils/axios.config';
import { useLocation } from 'react-router';

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = React.useState<boolean>(false);
    const [ user, setUser ] = React.useState<User | null>(null);
    const [ loading, setLoading ] = React.useState<boolean>(true);
    const location = useLocation()

    React.useEffect(() => {

        if (location.pathname === '/login') {
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await api.get<User>('/auth/current-user');
                setUser(response.data);
                setIsAuthenticated(true);
            }
            catch (err) {
                console.error('Error fetching user:', err);
                setIsAuthenticated(false);
            }
            finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, loading, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

