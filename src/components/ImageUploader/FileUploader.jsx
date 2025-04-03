// src/components/ImageUploader/FileUploader.jsx
import React from 'react';

function FileUploader({
  imageFiles,
  setImageFiles,
  handleDrop,
  handleFileChange,
  progressMap,
  handleUpload,
  uploading,
  directory,
  setDirectory,
  selectedDirectory,
  dropError
}) {
  const removeFile = (index) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  return (
    <div>
      <div
        className="image-uploader__drop-area"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>Arraste e solte imagens aqui ou clique para selecionar.</p>
        {dropError && (
          <div className="drop-error-message">
            {dropError}
          </div>
        )}
        <input
          className="image-uploader__input"
          type="file"
          accept=".png"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {imageFiles.length > 0 && (
        <div className="image-preview-list">
          <h5 style={{ marginBottom: '1rem' }}>Pré-visualização:</h5>
          <ul>
            {imageFiles.map((img, idx) => {
              const progress = progressMap[img.newName] ?? 0;
              return (
                <li key={idx} className="preview-item">
                  <div className="image-preview-wrapper">
                    <img
                      src={URL.createObjectURL(img.file)}
                      alt={img.file.name}
                    />
                    <button
                      type="button"
                      className="remove-preview"
                      onClick={() => removeFile(idx)}
                      aria-label={`Remover ${img.newName}`}
                    >
                      &times;
                    </button>
                  </div>

                  <input
                    type="text"
                    className="image-uploader__input"
                    value={img.newName}
                    onChange={(e) => {
                      const newFiles = [...imageFiles];
                      newFiles[idx].newName = e.target.value;
                      setImageFiles(newFiles);
                    }}
                  />

                  {progress > 0 && (
                    <div className="image-preview-progress">
                      <span
                        style={{ width: `${progress}%` }}
                        data-tooltip={`${progress}%`}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="image-uploader__group">
        <label className="image-uploader__label">Diretório de destino:</label>
        <input
          className="image-uploader__input"
          type="text"
          placeholder="Ex.: pasta-projeto"
          value={directory || selectedDirectory || ''}
          onChange={(e) => setDirectory(e.target.value)}
        />
      </div>

      <button
        className="image-uploader__button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Enviando...' : 'Enviar Imagens'}
      </button>
    </div>
  );
}

export default FileUploader;
