import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './AdminDashboard.css';

import AdminDashboardPage from './admin_components/AdminDashboardPage';
import HodDashboardPage from './admin_components/HodDashboardPage';
import StudentDashboardPage from './admin_components/StudentDashboardPage';


const AdminDashboard = ({ adminName }) => (
    <div className="admin-dashboard">
        {/* Header with Welcome message */}
        <div className="header">
            <h1>Placement Cell</h1>
            <div className="welcome-message">Welcome, {adminName}</div>
        </div>

        {/* Content Area */}
        <div className="dashboard-content">
            {/* Selection Area */}
            <div className="selection-area">
                <h3></h3>
                <ul>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/hod">Hod's</Link>
                    </li>
                    <li>
                        <Link to="/admin/students">Students</Link>
                    </li>
                    <li>
                        <Link to="/admin/companies">Companies</Link>
                    </li>
                    <li>
                        <Link to="/admin/job-offers">Job Offers</Link>
                    </li>
                    <li>
                        <Link to="/admin/selected-students">Selected Students</Link>
                    </li>
                </ul>
            </div>

            {/* Display Area */}
            <div className="display-area">
                <Routes>
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/hod" element={<HodDashboardPage />} />
                    <Route path="/admin/students" element={<StudentDashboardPage />} />
                    <Route path="/" element={<p>Please select an option from the left.</p>} />
                </Routes>
            </div>
        </div>
    </div>
);

export default AdminDashboard;
