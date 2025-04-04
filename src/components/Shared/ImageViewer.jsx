// src/components/Shared/ImageViewer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ModalEditor from './ModalEditor';
import '../../styles/image-viewer.css';

function ImageViewer({ image, onClose }) {
  if (!image) return null;

  const imageUrl = image.url || image.path || image.imageUrl;
  const imageName = image.name || 'imagem';

  return (
    <ModalEditor onClose={onClose}>
      <div className="image-viewer">
        <img src={imageUrl} alt={imageName} className="image-viewer__img" />
        <div className="image-viewer__footer">
          <span>{imageName}</span>
        </div>
      </div>
    </ModalEditor>
  );
}

ImageViewer.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ImageViewer;
