import React from 'react';
import PropTypes from 'prop-types';
import './EditorActions.css';

function EditorActions({ onInsertCopyable, onInsertImage, onInsertYouTube }) {
  return (
    <div className="editor-actions">
      <button
        className="editor-button"
        type="button"
        onClick={onInsertCopyable}
      >
        + Texto Copiável
      </button>
      <button
        className="editor-button"
        type="button"
        onClick={onInsertImage}
      >
        + Imagem
      </button>
      <button
        className="editor-button"
        type="button"
        onClick={onInsertYouTube}
      >
        + Vídeo YouTube
      </button>
    </div>
  );
}

EditorActions.propTypes = {
  onInsertCopyable: PropTypes.func.isRequired,
  onInsertImage: PropTypes.func.isRequired,
  onInsertYouTube: PropTypes.func.isRequired,
};

export default EditorActions;
