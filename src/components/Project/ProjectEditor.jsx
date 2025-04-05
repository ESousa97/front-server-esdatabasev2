import React, { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';
import './ProjectEditor.css';

function ProjectEditor({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    project || { titulo: '', descricao: '', conteudo: '', categoria: '' }
  );

  // Atualiza o conteúdo conforme o usuário edita
  const handleContentChange = (newContent) => {
    setFormData((prev) => ({ ...prev, conteudo: newContent }));
  };

  // Atualiza o localStorage com o conteúdo para que a página de preview possa lê-lo
  useEffect(() => {
    localStorage.setItem('livePreviewContent', formData.conteudo);
  }, [formData.conteudo]);

  return (
    <div className="project-editor">
      <h2 className="editor-heading">
        {project?.id ? 'Editar Projeto' : 'Novo Projeto'}
      </h2>

      <ProjectForm
        project={formData}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onContentChange={handleContentChange}
      />
    </div>
  );
}

export default ProjectEditor;
