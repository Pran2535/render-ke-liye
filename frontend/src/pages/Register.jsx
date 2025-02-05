import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import authService from '../services/Authservice';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');
    const [error, setError] = useState(null); // To handle errors
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the registration function from your authService
            const response = await authService.register({ firstName, lastName, email, password });
            if (response.status === 201) {
                navigate('/login'); // Redirect to login on successful registration
            }
        } catch (error) {
            console.error('Registration error', error);
            setError('Registration failed. Please try again.');
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

                {/* Register Header */}
                <div className="text-center">
                    <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Create Account
                    </h2>
                    <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Join us and start managing your expenses
                    </p>
                </div>

                {/* Error Handling */}
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                            className={`w-full p-3 rounded-lg border transition-colors duration-300 
                                ${theme === 'dark' 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                            className={`w-full p-3 rounded-lg border transition-colors duration-300 
                                ${theme === 'dark' 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                    </div>
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
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className={`w-full p-3 rounded-lg border transition-colors duration-300 
                                ${theme === 'dark' 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg transition-colors duration-300 
                            ${theme === 'dark' 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center">
                    <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className={`font-semibold transition-colors duration-300 
                                ${theme === 'dark' 
                                    ? 'text-blue-400 hover:text-blue-300' 
                                    : 'text-blue-600 hover:text-blue-800'
                                }`}
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
