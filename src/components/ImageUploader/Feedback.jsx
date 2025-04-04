import React, { useContext } from 'react';
import { FeedbackContext } from './FeedbackContext';
import { CheckCircle, XCircle, AlertTriangle, Info, Edit3 } from 'lucide-react';
import '../styles/feedback-toast.css';

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
  danger: <XCircle size={20} />,
  caution: <AlertTriangle size={20} />,
  modification: <Edit3 size={20} />,
  update: <CheckCircle size={20} />,
};

function Feedback() {
  const { toasts } = useContext(FeedbackContext);

  return (
    <div className="toast-container">
      {toasts.map(({ id, text, type }) => (
        <div key={id} className={`toast-feedback ${type}`}>
          <span className="toast-icon">{icons[type] || icons.info}</span>
          <span className="toast-message">{text}</span>
        </div>
      ))}
    </div>
  );
}

export default Feedback;
