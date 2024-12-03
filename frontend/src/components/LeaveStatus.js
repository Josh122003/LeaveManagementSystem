import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveStatus = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchLeaves = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/leaves/status', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLeaves(data);
        };

        fetchLeaves();
    }, []);

    return (
        <div>
            <h2>Your Leave Status</h2>
            <ul>
                {leaves.map(leave => (
                    <li key={leave._id}>
                        {leave.type} from {new Date(leave.fromDate).toLocaleDateString()} to {new Date(leave.toDate).toLocaleDateString()} - Status: {leave.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveStatus;
