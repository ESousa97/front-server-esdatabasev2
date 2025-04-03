// Feedback.jsx
import React, { useContext } from 'react';
import { FeedbackContext } from './FeedbackContext';

function Feedback({ message }) {
  // Se o componente também utiliza o contexto para outras finalidades:
  const { feedback } = useContext(FeedbackContext) || {};

  return (
    <div className={`feedback feedback--${message.type}`}>
      {message.text}
    </div>
  );
}

export default Feedback;
