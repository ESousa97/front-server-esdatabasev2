// src/pages/Home.jsx (exemplo de alteração)
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import ProjectList from '../components/Project/ProjectList';
import CardList from '../components/Card/CardList';
import Footer from '../components/Layout/Footer';
import Sidebar from '../components/Layout/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

function Home() {
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
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header onLogout={handleLogout} />
      <div className="editor-container">
        <Sidebar />
        <main className="main-content">
          <h2>Dashboard</h2>
          <ProjectList />
          <CardList />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
