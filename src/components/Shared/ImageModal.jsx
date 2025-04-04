import React from 'react';
import PropTypes from 'prop-types';
import ModalEditor from './ModalEditor';
import './ImageModal.css'; // você pode criar esse CSS separado

function ImageModal({ image, onClose }) {
  return (
    <ModalEditor onClose={onClose}>
      <div className="image-modal-container">
        <img
          src={image.url || image.path || image.imageUrl}
          alt={image.name}
          className="image-modal-img"
        />
      </div>
    </ModalEditor>
  );
}

ImageModal.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
