import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import Home from '../pages/Home';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Você pode escolher qual página será a dashboard principal */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/home" element={<Home />} />
      {/* Rota padrão: redireciona para a dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
