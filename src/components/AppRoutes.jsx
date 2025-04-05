import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ImageUploader from './ImageUploader';
import LivePreviewPage from './Project/LivePreviewPage';
import ContentEditor from './ContentEditor/ContentEditor';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/upload-image"
        element={
          <PrivateRoute>
            <ImageUploader />
          </PrivateRoute>
        }
      />

      <Route
        path="/live-preview"
        element={
          <PrivateRoute>
            <LivePreviewPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/content-editor"
        element={
          <PrivateRoute>
            <ContentEditor />
          </PrivateRoute>
        }
      />

      {/* Redireciona qualquer rota não definida para a dashboard */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
