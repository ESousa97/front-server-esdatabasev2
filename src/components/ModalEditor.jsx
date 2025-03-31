// src/components/ModalEditor.jsx
import React from 'react';
import './ModalEditor.css';

function ModalEditor({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">X</button>
        {children}
      </div>
    </div>
  );
}

export default ModalEditor;
