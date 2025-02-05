import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/Authservice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;  // ✅ Persist user on refresh
    });

    useEffect(() => {
        authService.getCurrentUser()
            .then(response => {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));  // ✅ Save user to localStorage
            })
            .catch(() => {
                setUser(null);
                localStorage.removeItem("user");  // ✅ Clear user on error
            });
    }, []);

    // Logout function
    const logout = async () => {
        await authService.logout();
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
