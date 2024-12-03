import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ConfirmLogoutModal from './ConfirmLogoutModal';
const AdminDashboard = () => {
    const [leaves, setLeaves] = useState([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false); 
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/leaves/admin`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLeaves(response.data);
            } catch (error) {
                console.error("Error fetching leaves:", error);
            }
        };

        fetchLeaves();
    }, [token]);

    const handleUpdateLeaveStatus = async (leaveId, status) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/leaves/status`, { id: leaveId, status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeaves(leaves.map(leave => (leave.id === leaveId ? { ...leave, status } : leave)));
        } catch (error) {
            console.error("Error updating leave status:", error);
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true); // Show the logout confirmation modal
    };

    const confirmLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Redirect to login
    };

    const cancelLogout = () => {
        setShowLogoutModal(false); // Hide the modal
    };

    return (
        <div className="admin-dashboard">
            <h2>Welcome, Admin!</h2>
            <h3>Leave Requests</h3>
            <ul>
                {leaves.map((leave) => (
                    <li key={leave.id}>
                       <p> <strong>Username:</strong> {leave.username} </p>
                       <p> <strong>LeaveType:</strong> {leave.type} </p>
                       <p><strong>From:</strong> {new Date(leave.fromDate).toLocaleDateString()}  </p>
                       <p><strong>To:</strong> {new Date(leave.toDate).toLocaleDateString()}</p>
                       <p><strong>Reason:</strong> {leave.reason}</p>
                       <p><strong>Status:</strong> {leave.status}</p>
                       <p><button className="approve-button"onClick={() => handleUpdateLeaveStatus(leave.id, 'approved')}>Approve</button></p>
                       <p><button className="deny-button"onClick={() => handleUpdateLeaveStatus(leave.id, 'denied')}>Cancel</button></p>
                    </li>
                ))}
            </ul>
           
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <ConfirmLogoutModal
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
