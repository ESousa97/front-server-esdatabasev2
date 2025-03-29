import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import ProjectList from '../components/Project/ProjectList';
import CardList from '../components/Card/CardList';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

function Dashboard() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  if (!isAuthenticated) {
    // Redireciona para a tela de login
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header onLogout={handleLogout} />
      <main style={{ display: 'flex', padding: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h2>Dashboard</h2>
          <ProjectList />
          <CardList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
