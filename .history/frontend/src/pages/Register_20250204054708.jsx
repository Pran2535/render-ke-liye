import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/Authservice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]   = useState('');
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register({ firstName, lastName, email, password });
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration error', error);
            alert('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
            <h2 className="text-2xl mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
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
                <Button type="submit">Register</Button>
            </form>
            <p className="mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
