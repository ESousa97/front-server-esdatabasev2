import { useContext } from 'react';
import { FeedbackContext } from './FeedbackContext';

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }

  const { addToast } = context;

  // Função para usar no lugar do antigo showFeedback
  const showFeedback = (text, type = 'info', duration = 4000) => {
    addToast(text, type, duration);
  };

  return showFeedback;
};
