import React from 'react';
import {
  FolderIcon,
  FolderOpenIcon,
  EyeIcon,
  EyeOffIcon
} from './icons';
import DirectoryContent from './DirectoryContent';

function DirectoryManager({
  selectedDirectory,
  setSelectedDirectory,
  newDirectoryName,
  setNewDirectoryName,
  createDirectory,
  existingDirectories,
  fetchDirectoryContent,

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
  onImageClick,
}) {
  const handleDirectoryToggle = (dir) => {
    if (selectedDirectory === dir) {
      setSelectedDirectory(null); // Fecha se for a mesma pasta
    } else {
      fetchDirectoryContent(dir); // Abre nova pasta
      setSelectedDirectory(dir);
    }
  };

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
          {existingDirectories.map((dir, idx) => {
            const isOpen = selectedDirectory === dir;

            return (
              <li
                key={idx}
                className={`existing-directory-item ${isOpen ? 'active' : ''}`}
                onClick={() => handleDirectoryToggle(dir)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDirectoryToggle(dir);
                }}
              >
                {isOpen ? <FolderOpenIcon size={18} /> : <FolderIcon size={18} />}
                <strong>{dir}</strong>
                <button
                  className="eye-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDirectoryToggle(dir);
                  }}
                  title={isOpen ? 'Fechar diretório' : 'Ver conteúdo'}
                >
                  {/* ✅ INVERTIDO AQUI */}
                  {isOpen ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

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
          fetchDirectoryContent={fetchDirectoryContent}
        />
      )}
    </div>
  );
}

export default DirectoryManager;
