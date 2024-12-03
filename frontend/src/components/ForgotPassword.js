import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from 'axios';
import '../styles/styles.css'; // Adjust the path to correctly point to your styles.css

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setMessage('');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
                username,
                password: newPassword,
            });
            setMessage('Password reset successfully. You can now log in.');
            setError('');
        } catch (err) {
            console.error('Error resetting password:', err);
            if (err.response && err.response.status === 404) {
                setError('Username not found. Please check and try again.');
            } else {
                setError('Failed to reset password. Please try again.');
            }
            setMessage('');
        }
    };

    // Navigate back to the login form
    const handleBackToLogin = () => {
        navigate('/'); // Adjust the route as needed
    };

    return (
        <div className="forgot-password-container">
            <h2>Reset Password</h2>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                />
            </div>
            <button onClick={handlePasswordReset} className="form-button">Reset Password</button>
            {message && <p className="success">{message}</p>}
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

            {/* Back button to navigate to login */}
            <button onClick={handleBackToLogin} className="back-button">Back to Login</button>
        </div>
    );
};

export default ForgotPassword;
