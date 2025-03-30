// src/components/ModalEditor.jsx
import React from 'react';

function ModalEditor({ children, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'var(--color-bg)',
        padding: '2rem',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '600px',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'transparent',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          color: 'var(--color-text)'
        }}>X</button>
        {children}
      </div>
    </div>
  );
}

export default ModalEditor;
