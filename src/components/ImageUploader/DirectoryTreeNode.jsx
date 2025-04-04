// src/components/ImageUploader/DirectoryTreeNode.jsx
import React, { useState } from 'react';
import { FolderIcon, FileImageIcon, EditIcon, TrashIcon } from './icons';
import api from '../../services/api';

function DirectoryTreeNode({ item, parentPath, onRename, onDelete, onImageClick }) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);

  // Constrói o caminho relativo atual (ex: "projects0004/subpasta")
  const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;

  const toggleExpand = async () => {
    if (item.type !== 'dir') return;
    if (!expanded) {
      setLoading(true);
      try {
        // Removemos o prefixo "public/assets" pois o backend já o adiciona
        const res = await api.get(`/directory-content/${currentPath}`);
        setChildren(res.data.content || []);
        setExpanded(true);
      } catch (err) {
        console.error('Erro ao buscar conteúdo do diretório:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setExpanded(false);
    }
  };

  return (
    <li>
      <div className="tree-node">
        {item.type === 'dir' ? (
          <span onClick={toggleExpand} className="tree-node-folder">
            <FolderIcon size={16} /> {item.name}
          </span>
        ) : (
          <span onClick={() => onImageClick(item)} className="tree-node-file">
            <FileImageIcon size={16} /> {item.name}
          </span>
        )}
        <div className="tree-node-actions">
          <button onClick={() => onRename(currentPath)} title="Renomear">
            <EditIcon size={16} />
          </button>
          <button onClick={() => onDelete(currentPath, item.type)} title="Deletar">
            <TrashIcon size={16} />
          </button>
        </div>
        {loading && <span className="loading-text">Carregando...</span>}
      </div>
      {expanded && children.length > 0 && (
        <ul className="tree-node-children">
          {children.map((child, idx) => (
            <DirectoryTreeNode
              key={idx}
              item={child}
              parentPath={currentPath}
              onRename={onRename}
              onDelete={onDelete}
              onImageClick={onImageClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default DirectoryTreeNode;
