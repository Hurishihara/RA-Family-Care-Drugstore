import React, { type FC, type ReactNode } from 'react';
import type { User } from '@/types/user.type';
import { api } from '@/utils/axios.config';
import { useLocation } from 'react-router';
import { toast } from 'sonner';
import { CircleXIcon } from 'lucide-react';

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
            setLoading(false);
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await api.get<User>('/auth/current-user');
                console.log('Fetched user:', response.data);
                setUser(response.data);
                setIsAuthenticated(true);
            }
            catch (err) {
                setIsAuthenticated(false);
                toast('Session expired. Please login again.', {
                    classNames: {
                        title: '!font-primary !font-bold !text-red-500 text-md',
                        description: '!font-primary !font-medium !text-muted-foreground text-xs'
                    },
                    duration: 3000,
                    icon: <CircleXIcon className='w-5 h-5 text-red-500' />,
                    description: `${err instanceof Error ? err.message : 'An unexpected error occurred.'}`,
                })
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

