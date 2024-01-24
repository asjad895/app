import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './components/regist.js';
import LoginForm from './components/login.js';
import Spinner from './components/spinner.js';
import Dashboard from './components/Dashboard.js';
import PasswordReset from './components/password_reset.js';
import VerifyEmail from './components/verify_email.js';

function App() {
  const [loading, setLoading] = useState(true);
  // const [spinnerMsg, setSpinnerMsg] = useState('true');
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const simulateAsyncOperation = () => {
      setTimeout(() => {
        setLoading(false);
        setShowLogin(true);
      }, 2000);  // Simulating a 2-second delay
    };

    simulateAsyncOperation();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Spinner message={"Loading....."} />
      ) : (
        <Router>
          <Routes>
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={showLogin ? <LoginForm /> : <Navigate to="/signup" />} />
            <Route index element={<Navigate to="/signup" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset" element={<PasswordReset />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
