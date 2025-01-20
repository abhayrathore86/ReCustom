'use client';

import { UsersService } from '@/services/userService';
import React, { useState } from 'react';

interface ILoginFormProps {
    onLogin: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('john.doe@example.com');
    const [error, setError] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
            const loginUser = await UsersService.login(email);
            if (loginUser) {
                await UsersService.findAll()
                onLogin();
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                        required
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
