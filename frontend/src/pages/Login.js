// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';

// function Login() {

//     const [loginInfo, setLoginInfo] = useState({
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copyLoginInfo = { ...loginInfo };
//         copyLoginInfo[name] = value;
//         setLoginInfo(copyLoginInfo);
//     }

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const { email, password } = loginInfo;
//         if (!email || !password) {
//             return handleError('email and password are required')
//         }
//         try {
//             const url = `http://localhost:5000/auth/login`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginInfo)
//             });
//             const result = await response.json();
//             const { success, message, jwtToken, name, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 localStorage.setItem('token', jwtToken);
//                 localStorage.setItem('loggedInUser', name);
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
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={loginInfo.email}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={loginInfo.password}
//                     />
//                 </div>
//                 <button type='submit'>Login</button>
//                 <span>Does't have an account ?
//                     <Link to="/signup">Signup</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Login
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        role: 'student', // Default role
    });

    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setLoginInfo((prev) => ({ ...prev, [name]: value }));
    // };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: type === "radio" ? (checked ? value : prev[name]) : value,
        }));
    };
    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     const { email, password, role } = loginInfo;
    //     if (!email || !password) {
    //         return handleError('Email and password are required.');
    //     }
    //     try {
    //         const response = await fetch('http://localhost:5000/auth/login', {
    //             method: "POST",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(loginInfo),
    //         });

    //         if (!response.ok) {
    //             const errorResult = await response.json();
    //             throw new Error(errorResult?.error?.details?.[0]?.message || "Login failed");
    //         }

    //         const { success, message, jwtToken, name } = await response.json();
    //         if (success) {
    //             handleSuccess(message);
    //             localStorage.setItem('token', jwtToken);
    //             localStorage.setItem('loggedInUser', name);
    //             localStorage.setItem('loggedInUser', name);
    //             setTimeout(() => {
    //                 if (role === 'teacher') {
    //                     navigate('/teacher-dashboard');
    //                 } else if (role === 'student') {
    //                     navigate('/student-dashboard');
    //                 } else {
    //                     navigate('/home'); // Fallback
    //                 }
    //             }, 1000);
    //         } else {
    //             handleError(message);
    //         }
    //     } catch (err) {
    //         console.error("Login error:", err);
    //         handleError(err.message || "An unexpected error occurred.");
    //     }
    // };
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form default submission
    
        const { email, password, role } = loginInfo;
    
        // Validate required fields
        if (!email || !password) {
            return handleError("Email and password are required.");
        }
    
        try {
            // Make a login request to the backend
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }), // Send role explicitly
            });
    
            // Check if response is successful
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.message || "Login failed.";
                throw new Error(errorMessage);
            }
    
            // Parse JSON response
            const { success, message, jwtToken, name } = await response.json();
    
            if (success) {
                handleSuccess(message); // Display success notification
    
                // Save user data to localStorage
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name);
    
                // Navigate based on the role
                setTimeout(() => {
                    const redirectPath =
                        role === "teacher"
                            ? "/teacher" // Updated to /teacher
                            : role === "student"
                            ? "/student" // Updated to /student
                            : "/home"; // Fallback route
                    navigate(redirectPath);
                }, 1000);
            } else {
                handleError(message); // Display error message if unsuccessful
            }
        } catch (error) {
            console.error("Login error:", error.message); // Log error to console for debugging
            handleError(error.message || "An unexpected error occurred."); // Display error notification
        }
    };
    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
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
                            checked={loginInfo.role === 'student'}
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
                            checked={loginInfo.role === 'teacher'}
                            onChange={handleChange}
                        />
                        <label htmlFor="teacher">Teacher</label>
                    </div>
                </div>
                <button type='submit'>Login</button>
                <span>Doesn't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
