
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import ThankYou from './pages/ThankYou';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { STORAGE_KEYS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    localStorage.setItem(STORAGE_KEYS.AUTH, status ? 'true' : 'false');
  };

  return (
    <Router>
      <div className="min-h-screen bg-premium-offWhite flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <Admin onLogout={() => handleLogin(false)} /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={<Login onLogin={() => handleLogin(true)} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
