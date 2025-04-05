import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ImageUploader from './ImageUploader';
import LivePreviewPage from './Project/LivePreviewPage';
import ContentEditor from './ContentEditor/ContentEditor';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload-image" element={<ImageUploader />} />
      <Route path="/live-preview" element={<LivePreviewPage />} />
      <Route path="/" element={<ContentEditor />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
