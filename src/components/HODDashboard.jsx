import React, { useEffect, useState } from 'react';
import './HODDashboard.css';

const HODDashboard = () => {
    const [students, setStudents] = useState([]);
    const [jobOffers, setJobOffers] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch('/api/students'); // Adjust URL as necessary
            const data = await response.json();
            setStudents(data);
        };

        const fetchJobOffers = async () => {
            const response = await fetch('/api/job-offers'); // Adjust URL as necessary
            const data = await response.json();
            setJobOffers(data);
        };

        fetchStudents();
        fetchJobOffers();
    }, []);

    return (
        <div className="hod-dashboard-container">
            <h2>HOD Dashboard</h2>
            <div className="students-section">
                <h3>Student Applications</h3>
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            <h4>{student.name}</h4>
                            <p>Email: {student.email}</p>
                            <p>Application Status: {student.status}</p>
                        </li>
                    ))}
                </ul>
            </div>
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
                <button className="manage-job-offers-button">Manage Job Offers</button>
                <button className="generate-report-button">Generate Report</button>
            </div>
        </div>
    );
};

export default HODDashboard;
