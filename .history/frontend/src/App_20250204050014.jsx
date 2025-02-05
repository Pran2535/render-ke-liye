import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, AuthContext } from './context/Authcontext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditExpense from './pages/AddEditExpense';
import './index.css';

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                        <Route path="/add-expense" element={<ProtectedRoute element={<AddEditExpense />} />} />

                        {/* Redirect all unknown routes to dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
