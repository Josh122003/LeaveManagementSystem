import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { username } = useParams(); // Get username from URL parameters
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, { username, newPassword });
            if (response.data.success) {
                setMessage('Password updated successfully! You can now log in.');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after a success message
                }, 2000);
            } else {
                setError('Failed to update password.');
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            setError('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>Update Password</button>
            {message && <p className="success">{message}</p>}
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ResetPassword;
