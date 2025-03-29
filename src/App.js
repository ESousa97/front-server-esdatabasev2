// /src/App.js
import React from 'react';
import Projects from './Projects';
import CardList from './CardList';
import LoginForm from './auth/LoginForm';
import { AuthProvider, useAuth } from './auth/AuthContext';
import api from './auth/api';

function MainContent() {
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Projmanage</h1>
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
