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
  const toggleDirectory = (dir) => {
    if (selectedDirectory === dir) {
      setSelectedDirectory(null);
    } else {
      fetchDirectoryContent(dir);
      setSelectedDirectory(dir);
    }
  };

  return (
    <div className="directory-manager">
      {/* === Seção de Criação de Subpasta === */}
      <div className="directory-group">
        <label htmlFor="new-dir-input" className="image-uploader__label">
          Criar subpasta em: <code>/{selectedDirectory || 'assets'}</code>
        </label>
        <input
          id="new-dir-input"
          className="image-uploader__input"
          type="text"
          placeholder="Nome da nova pasta"
          value={newDirectoryName}
          onChange={(e) => setNewDirectoryName(e.target.value)}
        />
        <button
          type="button"
          className="image-uploader__button"
          onClick={createDirectory}
        >
          Criar Subpasta
        </button>
      </div>

      {/* === Lista de Diretórios === */}
      <div className="existing-directories">
        <h4>Diretórios existentes:</h4>
        <ul>
          {existingDirectories.map((dir, idx) => {
            const isOpen = selectedDirectory === dir;

            return (
              <li key={idx}>
                <div className={`existing-directory-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="existing-directory-trigger"
                    aria-pressed={isOpen}
                    onClick={() => toggleDirectory(dir)}
                  >
                    {isOpen ? <FolderOpenIcon size={18} /> : <FolderIcon size={18} />}
                    <strong>{dir}</strong>
                  </button>
                  <button
                    type="button"
                    className="eye-button"
                    onClick={() => toggleDirectory(dir)}
                    title={isOpen ? 'Fechar diretório' : 'Ver conteúdo'}
                    aria-label={isOpen ? 'Fechar diretório' : 'Abrir diretório'}
                  >
                    {isOpen ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* === Conteúdo da Pasta Selecionada === */}
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
