import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import srmLogo from '../assets/images/srm-institute-of-science-and-technology-vector-logo-Photoroom.png'; // Adjust path as needed

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear error message on form submission
        const apiUrl = role === 'student' ? '/students/login' : '/admins/login';
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${apiUrl}`, { username, password });
            localStorage.setItem('token', response.data.token);
            // Redirect based on role
            if (role === 'student') {
                navigate('/student-dashboard');
            } else {
                navigate('/admin-dashboard');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Unexpected error occurred');
        }
    };

    return (
        <div className="login-container">
            <img src={srmLogo} alt="SRM Institute Logo" className="srm-logo" />
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>

                {/* Add spacing around the link */}
                <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                    <Link to="/ForgotPassword" className="forgot-password-link">Forgot Password?</Link>
                </div>

                <button type="submit">Login</button>
            </form>
            {errorMessage && <div id="error-container" style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};

export default Login;
