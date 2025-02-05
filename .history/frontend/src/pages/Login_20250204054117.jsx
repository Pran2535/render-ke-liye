import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/Authservice';
import { AuthContext } from '../context/Authcontext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login({ email, password });
            console.log("login success", response.data )
            setUser(response.data.user);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error', error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button type="submit">Login</Button>
            </form>
            <p className="mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Login;
