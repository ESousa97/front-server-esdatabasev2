import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import ModalEditor from './ModalEditor';
import { LoaderIcon } from '../ImageUploader/icons';
import './ImageModal.css';

function ImageModal({ image, onClose }) {
  const [loading, setLoading] = useState(true);

  if (!image) return null;

  const isAbsoluteUrl = (url) => /^https?:\/\//i.test(url);

  let imageUrl = image.download_url;
  if (!imageUrl || !isAbsoluteUrl(imageUrl)) {
    if (image.url && isAbsoluteUrl(image.url)) {
      imageUrl = image.url;
    } else if (image.imageUrl && isAbsoluteUrl(image.imageUrl)) {
      imageUrl = image.imageUrl;
    } else {
      imageUrl = null;
    }
  }

  const imageName = image.name || (image.path ? image.path.split('/').pop() : 'imagem');

  return (
    <AnimatePresence>
      <ModalEditor onClose={onClose}>
        <motion.div
          className="image-viewer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {imageUrl ? (
          <>
          <div className="image-viewer__wrapper">
            <div className={`image-viewer__loader ${!loading ? 'fade-out' : 'fade-in'}`}>
              <LoaderIcon size={48} strokeWidth={2.5} className="rotate" />
            </div>
        
            <img
              src={imageUrl}
              alt={imageName}
              className={`image-viewer__img ${loading ? 'loading' : 'loaded'} fade-in`}
              onLoad={() => setLoading(false)}
            />
          </div>
        
          {!loading && (
            <div className="image-viewer__footer">
              <span>{imageName}</span>
            </div>
          )}
        </>
        ) : (
          <p>Imagem não disponível.</p>
        )}
        </motion.div>
      </ModalEditor>
    </AnimatePresence>
  );
}

ImageModal.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    url: PropTypes.string,
    imageUrl: PropTypes.string,
    download_url: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
