import React, { useContext } from 'react';
import { FeedbackContext } from './FeedbackContext';
import { CheckCircle, XCircle, AlertTriangle, Info, Edit3 } from 'lucide-react';

// Mapeamento de ícones para os diferentes tipos de feedback
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
  const { feedback } = useContext(FeedbackContext);
  if (!feedback) return null;
  const { text, type = 'info' } = feedback;
  return (
    <div className={`feedback-box ${type}`}>
      <span className="feedback-icon">{icons[type] || icons.info}</span>
      <span>{text}</span>
    </div>
  );
}

export default Feedback;
