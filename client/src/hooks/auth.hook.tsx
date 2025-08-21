import { AuthContext } from '@/contexts/auth.context'
import React from 'react'

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { useAuth };