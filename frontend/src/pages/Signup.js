// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';

// function Signup() {

//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copySignupInfo = { ...signupInfo };
//         copySignupInfo[name] = value;
//         setSignupInfo(copySignupInfo);
//     }

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const { name, email, password } = signupInfo;
//         if (!name || !email || !password) {
//             return handleError('name, email and password are required')
//         }
//         try {
//             const url = `http://localhost:5000/auth/signup`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(signupInfo)
//             });
//             const result = await response.json();
//             const { success, message, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 setTimeout(() => {
//                     navigate('/home')
//                 }, 1000)
//             } else if (error) {
//                 const details = error?.details[0].message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//             console.log(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }
//     return (
//         <div className='container'>
//             <h1>Signup</h1>
//             <form onSubmit={handleSignup}>
//                 <div>
//                     <label htmlFor='name'>Name</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='name'
//                         autoFocus
//                         placeholder='Enter your name...'
//                         value={signupInfo.name}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={signupInfo.email}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={signupInfo.password}
//                     />
//                 </div>
//                 <button type='submit'>Signup</button>
//                 <span>Already have an account ?
//                     <Link to="/login">Login</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Signup
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

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setSignupInfo((prev) => ({ ...prev, [name]: value }));
    // };
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
            const response = await fetch('http://localhost:5000/auth/signup', {
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
                    <div>
                        <input
                            type="radio"
                            id="student"
                            name="role"
                            value="student"
                            checked={signupInfo.role === 'student'}
                            onChange={handleChange}
                        />
                        <label htmlFor="student">Student</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="teacher"
                            name="role"
                            value="teacher"
                            checked={signupInfo.role === 'teacher'}
                            onChange={handleChange}
                        />
                        <label htmlFor="teacher">Teacher</label>
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
