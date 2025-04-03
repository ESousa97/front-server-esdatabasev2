// src/components/ImageUploader/DirectoryContent.jsx
import React from 'react';
import DirectoryTreeNode from './DirectoryTreeNode';

function DirectoryContent({
  selectedDirectory,
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
  if (!selectedDirectory) return null;

  const filteredContent = filter
    ? directoryContent.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : directoryContent;

  return (
    <div className="directory-content">
      <div className="directory-header">
        <h4>Conteúdo de: {selectedDirectory}</h4>
        <button onClick={exitDirectoryNavigation} className="directory-exit">
          Sair
        </button>
      </div>

      <input
        className="image-uploader__input"
        type="text"
        placeholder="Filtrar por nome..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul className="directory-tree">
        {filteredContent.map((item, idx) => (
          <DirectoryTreeNode
            key={idx}
            item={item}
            parentPath={selectedDirectory}
            onRename={handleRename}
            onDelete={handleDelete}
            onImageClick={onImageClick}
          />
        ))}
      </ul>

      {renamingItem && (
        <div className="rename-box">
          <label className="image-uploader__label">Renomear para:</label>
          <input
            className="image-uploader__input"
            type="text"
            value={renameInputValue}
            onChange={(e) => setRenameInputValue(e.target.value)}
          />
          <div className="rename-actions">
            <button className="image-uploader__button" onClick={confirmRename}>
              Confirmar
            </button>
            <button className="image-uploader__button cancel" onClick={cancelRename}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectoryContent;
