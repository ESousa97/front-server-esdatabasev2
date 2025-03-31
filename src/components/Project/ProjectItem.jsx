// src/components/Project/ProjectItem.jsx
import React from 'react';

function ProjectItem({ project, onEdit, onDelete }) {
  const handleShowDetails = () => {
    alert(JSON.stringify(project, null, 2));
  };

  return (
    <div>
      <p>ID: {project.id}</p>
      <strong>{project.titulo}</strong> - {project.descricao}
      <div style={{ marginTop: '0.5rem' }}>
        <button
          style={{ marginRight: '0.5rem' }}
          onClick={handleShowDetails}
        >
          Detalhes
        </button>
        <button
          style={{ marginRight: '0.5rem' }}
          onClick={() => onEdit(project)}
        >
          Editar
        </button>
        <button onClick={() => onDelete(project.id)}>
          Deletar
        </button>
      </div>
    </div>
  );
}

export default ProjectItem;
