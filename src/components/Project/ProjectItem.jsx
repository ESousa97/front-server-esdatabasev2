// src/components/Project/ProjectItem.jsx
import React from 'react';

function ProjectItem({ project, onEdit, onDelete }) {
  const handleShowDetails = () => {
    console.log("Detalhes do projeto:", project);
  };

  return (
    <div className="project-item">
      <div className="project-info">
        <strong>{project.titulo}</strong> - {project.descricao}
      </div>
      <div className="project-actions">
        <button onClick={handleShowDetails}>Detalhes</button>
        <button onClick={() => onEdit(project)}>Editar</button>
        <button onClick={() => onDelete(project.id)}>Excluir</button>
      </div>
    </div>
  );
}

export default ProjectItem;
