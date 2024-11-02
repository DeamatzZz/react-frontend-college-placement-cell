import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />  {/* Home page */}
                <Route path="/login" element={<LoginPage />} /> {/* Login page */}
            </Routes>
        </Router>
    );
}

export default App;
