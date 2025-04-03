// src/components/ImageUploader/DirectoryManager.jsx
import React from 'react';
import { FolderIcon, EyeIcon } from './icons';

function DirectoryManager({
  selectedDirectory,
  newDirectoryName,
  setNewDirectoryName,
  createDirectory,
  existingDirectories,
  fetchDirectoryContent
}) {
  return (
    <div>
      {/* Formulário para criar novo diretório */}
      <div className="image-uploader__group">
        <label className="image-uploader__label">
          Criar novo diretório em: <code>/{selectedDirectory || '(assets)'}</code>
        </label>
        <input
          className="image-uploader__input"
          type="text"
          placeholder="Nome da nova pasta"
          value={newDirectoryName}
          onChange={(e) => setNewDirectoryName(e.target.value)}
        />
        <button className="image-uploader__button" onClick={createDirectory}>
          Criar Subpasta
        </button>
      </div>

      {/* Lista de diretórios existentes */}
      <div className="existing-directories">
        <h4>Diretórios existentes:</h4>
        <ul>
          {existingDirectories.map((dir, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FolderIcon size={16} />
              <strong>{dir}</strong>
              <button onClick={() => fetchDirectoryContent(dir)} title="Ver conteúdo">
                <EyeIcon size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DirectoryManager;
