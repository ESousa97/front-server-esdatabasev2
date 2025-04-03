// src/components/ImageUploader/Feedback.jsx
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
};

function Feedback({ message }) {
  if (!message) return null;

  const { text, type = 'info' } = message;

  return (
    <div className={`feedback-box ${type}`}>
      <span className="feedback-icon">{icons[type]}</span>
      <span>{text}</span>
    </div>
  );
}

export default Feedback;
