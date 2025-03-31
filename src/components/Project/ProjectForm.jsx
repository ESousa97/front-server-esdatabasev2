// src/components/Project/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import ContentEditor from '../ContentEditor';

function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    conteudo: '',
    categoria: ''
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({ titulo: '', descricao: '', conteudo: '', categoria: '' });
    }
  }, [project]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <input 
        type="text" 
        placeholder="Título" 
        value={formData.titulo} 
        onChange={e => handleChange('titulo', e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Descrição" 
        value={formData.descricao} 
        onChange={e => handleChange('descricao', e.target.value)} 
      />
      <ContentEditor 
        value={formData.conteudo} 
        onChange={(val) => handleChange('conteudo', val)} 
      />
      <input 
        type="text" 
        placeholder="Categoria" 
        value={formData.categoria} 
        onChange={e => handleChange('categoria', e.target.value)} 
      />
      <div className="form-actions">
        <button type="submit" className="btn-primary">Salvar</button>
        {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}

export default ProjectForm;
