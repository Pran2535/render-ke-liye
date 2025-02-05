import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@/context/ThemeContext';
import {ThemeProvider} from './context/ThemeContext'
import { AuthProvider } from './context/Authcontext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditExpense from './pages/AddEditExpense';
import '@/index.css';

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-expense" element={<AddEditExpense />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
