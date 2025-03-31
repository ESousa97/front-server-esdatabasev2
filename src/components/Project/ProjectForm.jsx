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
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {/* Campo Título */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>
          Título
        </label>
        <input
          type="text"
          placeholder="Título"
          value={formData.titulo}
          onChange={e => handleChange('titulo', e.target.value)}
        />
      </div>

      {/* Campo Descrição */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>
          Descrição
        </label>
        <input
          type="text"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={e => handleChange('descricao', e.target.value)}
        />
      </div>

      {/* Editor de Conteúdo */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>
          Conteúdo
        </label>
        <ContentEditor
          value={formData.conteudo}
          onChange={(val) => handleChange('conteudo', val)}
        />
      </div>

      {/* Campo Categoria */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 'bold' }}>
          Categoria
        </label>
        <input
          type="text"
          placeholder="Categoria"
          value={formData.categoria}
          onChange={e => handleChange('categoria', e.target.value)}
        />
      </div>

      {/* Botões */}
      <button type="submit" style={{ marginRight: '0.5rem' }}>Salvar</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ProjectForm;
