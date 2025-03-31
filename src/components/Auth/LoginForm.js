// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import './LoginForm.css';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Preencha todos os campos.');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      onLogin();
    } catch (err) {
      setErrorMsg('Email ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <div className="login-form">
      {errorMsg && <p className="form-error">{errorMsg}</p>}

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="exemplo@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group password-group">
        <label htmlFor="password">Senha</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Mostrar/ocultar senha"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button className="btn-primary" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}

export default LoginForm;
