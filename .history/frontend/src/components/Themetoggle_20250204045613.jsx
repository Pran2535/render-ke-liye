import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Button from '../components/ui/Button';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="flex items-center">
            <span className="mr-2">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
            <Button onClick={toggleTheme} variant="secondary">
                Toggle Theme
            </Button>
        </div>
    );
};

export default ThemeToggle;
