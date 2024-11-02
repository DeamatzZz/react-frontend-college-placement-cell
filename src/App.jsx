import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
// import StudentDashboard from './components/StudentDashboard'; // Import StudentDashboard
import AdminDashboard from './components/AdminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<AdminDashboard />} />
                {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} /> Add route for StudentDashboard */}
            </Routes>
        </Router>
    );
}

export default App;
