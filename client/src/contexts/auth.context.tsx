import React, { type FC, type ReactNode } from 'react';
import type { User } from '@/types/user.type';
import { toast } from 'sonner';
import { CircleXIcon, WifiOffIcon } from 'lucide-react';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { useApiQuery } from '@/hooks/use-api';

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

    // Check if the current route is login
    const isLoginPage = location.pathname === '/login';

    const { data, isPending, error, isSuccess, isError} = useApiQuery<User>({
        url: '/auth/current-user',
        queryKey: ['current-user'],
        options: {
            enabled: !isLoginPage, // only run the query if not on login page
            retry: 1,
            retryOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 10, // Stale after 10 minutes
            gcTime: 1000 * 60 * 30 // Cache for 30 minutes 
        },
    })

    React.useEffect(() => {
        if (isPending) { 
            return;
        }

        if (isSuccess && data) {
            setUser(data);
            setIsAuthenticated(true);
            setLoading(false);
            return;
        }

        if (isError && error) {
            setIsAuthenticated(false);
            setLoading(false);
            if (axios.isAxiosError(error)) {
                const err = error.response?.data as ErrorResponse;
                toast(err.title, {
                        classNames: {
                            title: '!font-primary !font-bold !text-red-500 text-md',
                            description: '!font-primary !font-medium !text-muted-foreground text-xs'
                        },
                        icon: <CircleXIcon className='w-5 h-5 text-red-500' />,
                        description: err.description,
                    })
                return;
            }
            const err = error as unknown as ErrorResponse;
            toast(err.title, {
                    classNames: {
                        title: '!font-primary !font-bold !text-red-500 text-md',
                        description: '!font-primary !font-medium !text-muted-foreground text-xs'
                    },
                    icon: <WifiOffIcon className='w-5 h-5 text-red-500' />,
                    description: err.description,
                })
            return; 
        }
    }, [ data, error, isPending, isSuccess, isError ])
        

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, loading, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

