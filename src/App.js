import React from 'react';
import Projects from './Projects';
import CardList from './CardList';
import LoginForm from './auth/LoginForm';
import { AuthProvider, useAuth } from './auth/AuthContext';
import api from './auth/api';

function MainContent() {
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogout = async () => {
    await api.post('/auth/logout');
    logout();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Minha Aplicação CRUD</h1>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Projects />
          <CardList />
        </>
      ) : (
        <LoginForm onLogin={login} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
