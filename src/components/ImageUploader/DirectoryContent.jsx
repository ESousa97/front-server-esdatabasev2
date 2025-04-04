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
  fetchDirectoryContent,
}) {
  if (!selectedDirectory) return null;

  const pathParts = selectedDirectory.split('/');
  const filteredContent = filter
    ? directoryContent.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : directoryContent;

  const buildPath = (index) => pathParts.slice(0, index + 1).join('/');

  return (
    <div className="directory-content">
      <div className="directory-header">
        <div className="directory-breadcrumb">
          <button
            onClick={exitDirectoryNavigation}
            className="exit-button-icon"
            title="Voltar"
          >
            ←
          </button>
          <nav className="breadcrumb-path">
            {pathParts.map((part, index) => {
              const path = buildPath(index);
              const isCurrent = path === selectedDirectory;

              return (
                <span key={index} className="breadcrumb-segment">
                  <button
                    className="breadcrumb-button"
                    disabled={isCurrent}
                    onClick={() => {
                      if (!isCurrent) {
                        fetchDirectoryContent?.(path); // previne erro se for undefined
                      }
                    }}
                  >
                    {part}
                  </button>
                  {index < pathParts.length - 1 && (
                    <span className="breadcrumb-separator">/</span>
                  )}
                </span>
              );
            })}
          </nav>
        </div>

        <input
          className="image-uploader__input filter-input"
          type="text"
          placeholder="Filtrar arquivos ou pastas..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="directory-body">
        {filteredContent.length > 0 ? (
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
        ) : (
          <div className="directory-empty">Nenhum item encontrado.</div>
        )}
      </div>

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
            <button
              className="image-uploader__button cancel"
              onClick={cancelRename}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectoryContent;
