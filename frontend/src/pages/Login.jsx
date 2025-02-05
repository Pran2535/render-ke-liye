import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import authService from '../services/Authservice';
import { AuthContext } from '../context/Authcontext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState('light');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login({ email, password });
            console.log("login success", response.data);
            
            await login(response.data.user, response.data.token);
            
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error', error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className={`w-full max-w-md p-8 space-y-6 rounded-xl shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                {/* Theme Toggle */}
                <div className="flex justify-end">
                    <button 
                        onClick={toggleTheme} 
                        className={`p-2 rounded-full transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                            }`}
                    >
                        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* Login Header */}
                <div className="text-center">
                    <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Welcome Back
                    </h2>
                    <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Sign in to continue
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className={`w-full p-3 rounded-lg border transition-colors duration-300 
                                ${theme === 'dark' 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className={`w-full p-3 rounded-lg border transition-colors duration-300 pr-10
                                ${theme === 'dark' 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        Sign In
                    </button>
                </form>

                {/* Register Link */}
                <div className="text-center">
                    <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Don't have an account?{' '}
                        <Link 
                            to="/register" 
                            className={`font-semibold transition-colors duration-300 
                                ${theme === 'dark' 
                                    ? 'text-blue-400 hover:text-blue-300' 
                                    : 'text-blue-600 hover:text-blue-800'
                                }`}
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;