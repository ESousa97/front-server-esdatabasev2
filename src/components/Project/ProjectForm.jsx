import React, { useState, useEffect } from 'react';
import ContentEditor from '../ContentEditor/ContentEditor';
import { Save, X } from 'lucide-react';
import './ProjectForm.css';

function ProjectForm({ project, onSubmit, onCancel, onContentChange }) {
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
    <form className="project-form" onSubmit={handleSubmit}>
      {/* Linha de cima: Título, Descrição, Categoria, e Botões todos em Grid */}
      <div className="form-header">
        <div className="form-group">
          <label className="form-label">Título</label>
          <input
            className="form-input"
            type="text"
            placeholder="Título"
            value={formData.titulo}
            onChange={e => handleChange('titulo', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descrição</label>
          <input
            className="form-input"
            type="text"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={e => handleChange('descricao', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Categoria</label>
          <input
            className="form-input"
            type="text"
            placeholder="Categoria"
            value={formData.categoria}
            onChange={e => handleChange('categoria', e.target.value)}
          />
        </div>

        {/* Botões */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            <Save size={16} style={{ marginRight: '4px' }} />
            Salvar
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
            >
              <X size={16} style={{ marginRight: '4px' }} />
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Abaixo, o editor de conteúdo ocupando espaço total abaixo da linha de inputs e botões */}
      <div className="form-content">
        <label className="form-label">Conteúdo</label>
        <ContentEditor
          value={formData.conteudo}
          onChange={(val) => {
            handleChange('conteudo', val);
            onContentChange(val);
          }}
        />
      </div>
    </form>
  );
}

export default ProjectForm;
