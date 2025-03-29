import React from 'react';

function ProjectItem({ project, onEdit, onDelete }) {
  return (
    <div>
      <strong>{project.titulo}</strong> - {project.descricao}
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => onEdit(project)} style={{ marginRight: '0.5rem' }}>Editar</button>
        <button onClick={() => onDelete(project.id)}>Deletar</button>
      </div>
    </div>
  );
}

export default ProjectItem;
