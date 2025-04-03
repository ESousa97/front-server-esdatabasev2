// src/components/ImageUploader/ImageModal.jsx
import React from 'react';

function ImageModal({ image, onClose }) {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>
          Fechar
        </button>
        <img src={image.download_url} alt={image.name} />
      </div>
    </div>
  );
}

export default ImageModal;
