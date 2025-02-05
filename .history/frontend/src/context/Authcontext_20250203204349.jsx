import React, { createContext, useState, useEffect } from 'react';
import authService from '@/services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.getCurrentUser().then(setUser).catch(() => setUser(null));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};