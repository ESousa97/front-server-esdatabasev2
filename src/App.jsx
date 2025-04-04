import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { FeedbackProvider } from './components/ImageUploader/FeedbackContext';
import AppRoutes from '../src/components/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FeedbackProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </FeedbackProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
