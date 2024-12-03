import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmLogoutModal from './ConfirmLogoutModal'; // Import the modal component

const StudentDashboard = () => {
    const [leaves, setLeaves] = useState([]);
    const [studentDetails, setStudentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeavesAndStudentDetails = async () => {
            setLoading(true);
            try {
                const leavesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/leaves/student`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLeaves(leavesResponse.data);

                const studentResponse = await axios.get(`${process.env.REACT_APP_API_URL}/students/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStudentDetails(studentResponse.data);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeavesAndStudentDetails();
    }, [token]);

    const handleApplyLeave = () => {
        navigate('/apply-leave');
    };

    const handleDeleteLeave = async (leaveId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/leaves/${leaveId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeaves(leaves.filter(leave => leave.id !== leaveId));
        } catch (error) {
            console.error('Error deleting leave:', error);
            setError('Failed to delete leave. Please try again.');
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true); // Show logout confirmation modal
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false); // Hide the modal
    };

    return (
        <div className="student-dashboard">
            {loading ? (
                <p>Loading your details...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    {studentDetails ? (
                        <>
                            <h2>Welcome, {studentDetails.username}!</h2>
                            <div className="student-details">
                                <h3>Your Details</h3>
                                <p>Id: {studentDetails.id}</p>
                                <p>Username: {studentDetails.username}</p>
                            </div>
                        </>
                    ) : (
                        <p>No student details available.</p>
                    )}

                    <button onClick={handleApplyLeave}>Apply Leave</button>
                    <h3>Your Leaves</h3>
                    {leaves.length === 0 ? (
                        <p>No leaves applied.</p>
                    ) : (
                        <ul>
                            {leaves.map((leave) => (
                                <li key={leave.id}>
                                    <div className="leave-details">
                                        <span><strong>Leave Type:</strong> {leave.type}</span>
                                        <span><strong>From:</strong> {new Date(leave.fromDate).toLocaleDateString()}</span>
                                        <span><strong>To:</strong> {new Date(leave.toDate).toLocaleDateString()}</span>
                                        <span><strong>Reason:</strong> {leave.reason}</span>
                                        <span><strong>Status:</strong> {leave.status}</span>
                                        <button onClick={() => handleDeleteLeave(leave.id)} className="cancel-leave-button">Cancel Leave</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button onClick={handleLogout} className="logout-button">Logout</button>

                    {/* Logout Confirmation Modal */}
                    {showLogoutModal && (
                        <ConfirmLogoutModal
                            onConfirm={confirmLogout}
                            onCancel={cancelLogout}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default StudentDashboard;
