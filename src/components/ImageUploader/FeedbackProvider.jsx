// No arquivo principal (ex: App.jsx)
import React from 'react';
import { FeedbackProvider } from './FeedbackContext';
import ImageUploader from '../ImageUploader';

function App() {
  return (
    <FeedbackProvider>
      <ImageUploader />
    </FeedbackProvider>
  );
}

export default App;
