import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '../ImageUploader/icons';
import './ModalEditor.css';

function ModalEditor({ children, onClose }) {
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300); // Espera a animação antes de fechar de fato
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    setVisible(true); // Aciona animação de entrada

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]); // ✅ agora o ESLint está satisfeito

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      handleClose();
    }
  };

  return (
    <div className={`modal-overlay ${visible ? 'show' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose} aria-label="Fechar modal">
          <CloseIcon size={20} strokeWidth={2.5} />
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
