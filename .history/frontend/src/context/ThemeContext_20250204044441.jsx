import React, { createContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../utils/theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const currentTheme = theme === 'light' ? lightTheme : darkTheme;
        document.body.style.backgroundColor = currentTheme.background;
        document.body.style.color = currentTheme.text;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
