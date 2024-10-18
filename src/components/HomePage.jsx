import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="home-container">
            <h1 className="home-heading">College Placement Cell</h1>
            <div className="home-avatar" onClick={goToLogin}>
                <img 
                    src="https://via.placeholder.com/150" 
                    alt="Avatar" 
                    className="avatar-img" 
                />
            </div>
            <button 
                className="login-btn" 
                style={{ padding: '5px 10px', fontSize: '0.9rem', width: '120px' }} 
                onClick={goToLogin}
            >
                Login
            </button>
        </div>
    );
};

export default HomePage;
