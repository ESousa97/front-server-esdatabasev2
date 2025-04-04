import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ModalEditor.css';

function ModalEditor({ children, onClose }) {
  // Fecha o modal ao pressionar a tecla ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Fecha o modal ao clicar fora do conteúdo
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

ModalEditor.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalEditor;
