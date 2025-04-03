// src/components/ImageUploader/DirectoryContent.jsx
import React from 'react';
import {
  FolderIcon,
  FileImageIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
} from './icons';

function DirectoryContent({
  selectedDirectory,
  directoryContent,
  fetchDirectoryContent,
  breadcrumb,
  filter,
  setFilter,
  handleRename,
  handleDelete,
  renamingItem,
  renameInputValue,
  setRenameInputValue,
  confirmRename,
  cancelRename,
  navigateToBreadcrumb,
  exitDirectoryNavigation // nova prop
}) {
  // Aplica filtro ao conteúdo do diretório
  const filteredContent = filter
    ? directoryContent.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : directoryContent;

  if (!selectedDirectory) {
    return null; // Se não há diretório selecionado, não mostra nada
  }

  return (
    <div className="directory-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Conteúdo de: {selectedDirectory}</h4>
        {/* Botão para sair da navegação */}
        <button onClick={exitDirectoryNavigation} className="image-uploader__button">
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

      <ul>
        {filteredContent.map((item, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {item.type === 'dir' ? <FolderIcon size={16} /> : <FileImageIcon size={16} />}
            <span>{item.name}</span>
            {item.type === 'dir' ? (
              <button onClick={() => fetchDirectoryContent(`${selectedDirectory}/${item.name}`)} title="Abrir">
                <EyeIcon size={16} />
              </button>
            ) : item.download_url && (
              <a href={item.download_url} target="_blank" rel="noopener noreferrer" title="Ver">
                <EyeIcon size={16} />
              </a>
            )}
            <button onClick={() => handleRename(item.path)} title="Renomear">
              <EditIcon size={16} />
            </button>
            <button onClick={() => handleDelete(item.path, item.type)} title="Deletar">
              <TrashIcon size={16} />
            </button>
          </li>
        ))}
      </ul>

      {/* Caixa de renomear item */}
      {renamingItem && (
        <div className="image-uploader__group rename-box">
          <label className="image-uploader__label">Renomear para:</label>
          <input
            className="image-uploader__input"
            type="text"
            value={renameInputValue}
            onChange={(e) => setRenameInputValue(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
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
