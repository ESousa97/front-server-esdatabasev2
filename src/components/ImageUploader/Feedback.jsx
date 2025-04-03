// Feedback.jsx
import React from 'react';

function Feedback({ message }) {
  return (
    <div className={`feedback feedback--${message.type}`}>
      {message.text}
    </div>
  );
}

export default Feedback;
