import React, { useState } from 'react';
import {
  FolderIcon,
  FolderOpenIcon,
  FileImageIcon,
  EditIcon,
  TrashIcon,
} from './icons';
import api from '../../services/api';

function DirectoryTreeNode({ item, parentPath, onRename, onDelete, onImageClick }) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;

  const toggleExpand = async () => {
    if (item.type !== 'dir') return;
    if (!expanded) {
      setLoading(true);
      try {
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

  const Icon = expanded ? FolderOpenIcon : FolderIcon;

  return (
    <li className="tree-node-wrapper">
      <div className={`tree-node ${item.type}`}>
        {item.type === 'dir' ? (
          <button type="button" onClick={toggleExpand} className="tree-node-folder">
            <Icon size={16} />
            <span className="tree-node-name">{item.name}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onImageClick(item)}
            className="tree-node-file"
          >
            <FileImageIcon size={16} />
            <span className="tree-node-name">{item.name}</span>
          </button>
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
