import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import ImageUploader from './ImageUploader';
import LivePreviewPage from './Project/LivePreviewPage';
import ContentEditor from './ContentEditor/ContentEditor';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas que usarão o Layout */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Outras rotas protegidas */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/upload-image"
        element={
          <PrivateRoute>
            <Layout>
              <ImageUploader />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/live-preview"
        element={
          <PrivateRoute>
            <Layout>
              <LivePreviewPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/content-editor"
        element={
          <PrivateRoute>
            <Layout>
              <ContentEditor />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Rota curinga redireciona para /dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
