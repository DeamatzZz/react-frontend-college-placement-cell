import React, { useState } from 'react';
import './LoginPage.css'; // Import the stylesheet for styling

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // New state for role selection

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., form submission, authentication)
        console.log('Logging in with:', username, password, role);
        // Here you would call your backend login API, passing username, password, and role
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                {/* Role Selector Dropdown */}
                <div className="input-group">
                    <label htmlFor="role">Role:</label>
                    <select 
                        id="role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                        <option value="hod">HOD</option>
                    </select>
                </div>

                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
