import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
    const [type, setType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate(); // useNavigate for navigation

    const token = localStorage.getItem('token');

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/leaves`,
                { type, fromDate, toDate, reason },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/student-dashboard'); // Navigate to the student dashboard
        } catch (error) {
            console.error('Error applying for leave:', error);
            // Handle error, e.g., show an alert or message to the user
        }
    };

    const handleBack = () => {
        navigate('/student-dashboard'); // Navigate back to student dashboard
    };

    return (
        <div className="apply-leave-container">
            <h2>Apply for Leave</h2>
            <form onSubmit={handleApply}>
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="" disabled>Select Leave Type</option>
                    <option value="Medical">Medical</option>
                    <option value="Casual">Casual</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Native">Native</option>
                    <option value="Others">Others</option>
                </select>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                />
                <button type="submit">Apply Leave</button>
            </form>
            <button onClick={handleBack} className="back-button">Back to Dashboard</button>
        </div>
    );
};

export default ApplyLeave;
