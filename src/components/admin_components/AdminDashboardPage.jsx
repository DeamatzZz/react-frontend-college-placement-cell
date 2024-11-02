import React from 'react';
import { Link } from 'react-router-dom';
import "./AdminDashboardPage.css"

// import './AdminDashboardPage.css'; // Make sure to create this CSS file for custom styles

const AdminDashboardPage = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            {/* Horizontal line */}
            <hr className="dashboard-line" />
            <div className="card-container">
                {/* Cards go here */}
                <div className="card-container">
                <Link to="/admin/option3" className="card" style={{ backgroundColor: '#f39c12' }}>
                    <h4>HOD's</h4>
                </Link>
                <Link to="/admin/option2" className="card" style={{ backgroundColor: '#3498db' }}>
                    <h4>Students</h4>
                </Link>
                <Link to="/admin/option4" className="card" style={{ backgroundColor: '#2ecc71' }}>
                    <h4>Companies</h4>
                </Link>
                <Link to="/admin/option5" className="card" style={{ backgroundColor: '#e74c3c' }}>
                    <h4>Job Offers</h4>
                </Link>
                <Link to="/admin/option6" className="card" style={{ backgroundColor: '#9b59b6' }}>
                    <h4>Selected Students</h4>
                </Link>
            </div>
            </div>
        </div>
        
    );
};

export default AdminDashboardPage;
