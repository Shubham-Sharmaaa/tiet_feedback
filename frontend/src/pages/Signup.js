
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', // Default role
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupInfo((prev) => ({
            ...prev,
            [name]: type === "radio" ? (checked ? value : prev[name]) : value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required.');
        }
        try {
            const response = await fetch('https://tiet-feedback-api.vercel.app/auth/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details || 'Signup failed.');
            } else {
                handleError(message);
            }
        } catch (err) {
            console.error("Signup error:", err);
            handleError(err.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <div>
                <label>Role:</label>
    <div className="radio-group">
        <label className="radio-option">
            <span>Student</span>
            <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={signupInfo.role === 'student'}
                onChange={handleChange}
            />
        </label>
        <label className="radio-option">
            <span>Teacher</span>
            <input
                type="radio"
                id="teacher"
                name="role"
                value="teacher"
                checked={signupInfo.role === 'teacher'}
                onChange={handleChange}
            />
        </label>
    </div>
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
