// src/components/ImageUploader/DirectoryManager.jsx
import React from 'react';
import { FolderIcon, EyeIcon } from './icons';
import DirectoryContent from './DirectoryContent';

function DirectoryManager({
  // Props de criação/listagem de diretórios
  selectedDirectory,
  newDirectoryName,
  setNewDirectoryName,
  createDirectory,
  existingDirectories,
  fetchDirectoryContent,

  // Props para exibir conteúdo do diretório selecionado
  directoryContent,
  filter,
  setFilter,
  handleRename,
  handleDelete,
  renamingItem,
  renameInputValue,
  setRenameInputValue,
  confirmRename,
  cancelRename,
  exitDirectoryNavigation,
  onImageClick, // caso queira visualizar imagem em modal
}) {
  return (
    <div className="directory-manager">
      <div className="directory-group">
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

      <div className="existing-directories">
        <h4>Diretórios existentes:</h4>
        <ul>
          {existingDirectories.map((dir, idx) => (
            <li key={idx} className="existing-directory-item">
              <FolderIcon size={16} />
              <strong>{dir}</strong>
              <button onClick={() => fetchDirectoryContent(dir)} title="Ver conteúdo">
                <EyeIcon size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Se houver um diretório selecionado, mostra o conteúdo dele AQUI */}
      {selectedDirectory && (
        <DirectoryContent
          selectedDirectory={selectedDirectory}
          directoryContent={directoryContent}
          filter={filter}
          setFilter={setFilter}
          handleRename={handleRename}
          handleDelete={handleDelete}
          renamingItem={renamingItem}
          renameInputValue={renameInputValue}
          setRenameInputValue={setRenameInputValue}
          confirmRename={confirmRename}
          cancelRename={cancelRename}
          exitDirectoryNavigation={exitDirectoryNavigation}
          onImageClick={onImageClick}
        />
      )}
    </div>
  );
}

export default DirectoryManager;
