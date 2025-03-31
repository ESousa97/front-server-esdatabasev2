// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import api from '../../services/api';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
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
    <div>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="exemplo@dominio.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button className="btn-primary" onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default LoginForm;
