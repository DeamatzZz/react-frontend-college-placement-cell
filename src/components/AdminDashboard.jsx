import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [jobOffers, setJobOffers] = useState([]);

    useEffect(() => {
        const fetchJobOffers = async () => {
            const response = await fetch('/api/job-offers'); // Adjust URL as necessary
            const data = await response.json();
            setJobOffers(data);
        };
        fetchJobOffers();
    }, []);

    return (
        <div className="admin-dashboard-container">
            <h2>Admin Dashboard</h2>
            <div className="job-offers-section">
                <h3>Job Offers</h3>
                <ul>
                    {jobOffers.map((offer) => (
                        <li key={offer.id}>
                            <h4>{offer.companyName}</h4>
                            <p>Position: {offer.position}</p>
                            <p>Eligibility: {offer.eligibility}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="actions-section">
                <button className="add-job-offer-button">Add Job Offer</button>
                <button className="manage-students-button">Manage Students</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
