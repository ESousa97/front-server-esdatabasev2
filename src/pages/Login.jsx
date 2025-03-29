import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    login();
    navigate('/'); // Redireciona para a tela inicial
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Projmanage - Login</h1>
      <LoginForm onLogin={handleLoginSuccess} />
    </div>
  );
}

export default Login;
