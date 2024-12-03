import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import ApplyLeave from './components/ApplyLeave';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

import AdminDashboard from './components/AdminDashboard';
import './styles/styles.css';
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />

                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/apply-leave" element={<ApplyLeave />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </div>
    );
};

export default App;
