// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
