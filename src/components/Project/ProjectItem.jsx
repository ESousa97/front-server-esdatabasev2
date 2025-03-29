// src/components/Project/ProjectItem.jsx
import React from 'react';

function ProjectItem({ project, onEdit, onDelete }) {
  const handleShowDetails = () => {
    alert(JSON.stringify(project, null, 2));
  };

  return (
    <div>
      <p>ID: {project.id}</p> {/* Exibe o ID do projeto */}
      <strong>{project.titulo}</strong> - {project.descricao}
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={handleShowDetails} style={{ marginRight: '0.5rem' }}>
          Detalhes
        </button>
        <button onClick={() => onEdit(project)} style={{ marginRight: '0.5rem' }}>
          Editar
        </button>
        <button onClick={() => onDelete(project.id)}>Deletar</button>
      </div>
    </div>
  );
}

export default ProjectItem;
