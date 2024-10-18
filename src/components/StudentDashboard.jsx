import React, { useEffect, useState } from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
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
        <div className="dashboard-container">
            <h2>Available Job Offers</h2>
            <ul>
                {jobOffers.map((offer) => (
                    <li key={offer.id}>
                        <h3>{offer.companyName}</h3>
                        <p>{offer.position}</p>
                        <p>{offer.eligibility}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;
