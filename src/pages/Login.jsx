// src/pages/Login.jsx
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bem-vindo ao Projmanage</h1>
        <LoginForm onLogin={handleLoginSuccess} />
      </div>
    </div>
  );
}

export default Login;
