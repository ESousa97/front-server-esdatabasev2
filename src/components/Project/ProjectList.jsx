// src/components/Project/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ProjectForm from './ProjectForm';
import ProjectItem from './ProjectItem';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = () => {
    api.get('/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.error('Erro ao buscar projetos:', error));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddOrUpdate = (projectData) => {
    if (editingProject) {
      api.put(`/projects/${projectData.id}`, projectData)
        .then(response => {
          setProjects(projects.map(p => p.id === projectData.id ? response.data : p));
          setEditingProject(null);
        })
        .catch(error => console.error('Erro ao atualizar projeto:', error));
    } else {
      api.post('/projects', projectData)
        .then(response => {
          const newProject = response.data;
          setProjects([...projects, newProject]);

          // Cria automaticamente o card correspondente
          const cardData = {
            id: newProject.id,
            titulo: newProject.titulo.replace('PROJECT', '').trim(),
            descricao: newProject.descricao,
            imageurl: ''
          };

          api.post('/cards', cardData)
            .then(cardResponse => {
              console.log('Card criado automaticamente:', cardResponse.data);
            })
            .catch(err => console.error('Erro ao criar o card automaticamente:', err));
        })
        .catch(error => console.error('Erro ao adicionar projeto:', error));
    }
  };

  const handleDelete = (id) => {
    api.delete(`/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project.id !== id));
        api.delete(`/cards/${id}`)
          .then(() => {
            console.log(`Card com ID ${id} deletado`);
          })
          .catch(err => console.error(`Erro ao deletar card com ID ${id}:`, err));
      })
      .catch(error => console.error('Erro ao deletar projeto:', error));
  };

  return (
    <div className="project-list">
      <h3>Gerenciamento de Projetos</h3>
      <ProjectForm 
        project={editingProject} 
        onSubmit={handleAddOrUpdate} 
        onCancel={() => setEditingProject(null)}
      />
      <div className="project-items">
        {projects.map(project => (
          <ProjectItem 
            key={project.id}
            project={project} 
            onEdit={setEditingProject} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
