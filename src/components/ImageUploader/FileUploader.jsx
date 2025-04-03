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
  selectedDirectory
}) {
  return (
    <div>
      {/* Área de drop e input de arquivo */}
      <div
        className="image-uploader__drop-area"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>Arraste e solte imagens aqui ou clique abaixo para selecionar.</p>
        <input
          className="image-uploader__input"
          type="file"
          accept="image/*"
          multiple
          webkitdirectory="true"
          onChange={handleFileChange}
        />
      </div>

      {/* Pré-visualização das imagens selecionadas */}
      {imageFiles.length > 0 && (
        <div className="image-preview-list">
          <h5>Pré-visualização:</h5>
          <ul>
            {imageFiles.map((img, idx) => {
              const progress = progressMap[img.newName] ?? 0;
              return (
                <li key={idx}>
                  <img
                    src={URL.createObjectURL(img.file)}
                    alt={img.file.name}
                    width="100"
                  />
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

      {/* Campo para especificar o diretório de destino */}
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

      {/* Botão de upload */}
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
