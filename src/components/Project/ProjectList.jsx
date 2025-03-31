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
        console.log('Projects:', response.data);
        setProjects(response.data);
      })
      .catch(error => console.error('Erro ao buscar projetos:', error));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Adiciona ou atualiza
  const handleAddOrUpdate = (projectData) => {
    if (editingProject) {
      // Atualiza
      api.put(`/projects/${projectData.id}`, projectData)
        .then(response => {
          setProjects(projects.map(p => p.id === projectData.id ? response.data : p));
          setEditingProject(null);
        })
        .catch(error => console.error('Erro ao atualizar projeto:', error));
    } else {
      // Cria projeto e automaticamente o card
      api.post('/projects', projectData)
        .then(response => {
          const newProject = response.data;
          setProjects([...projects, newProject]);

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

  // Deleta projeto e card
  const handleDelete = (id) => {
    // Confirmação antes de deletar
    const confirmDelete = window.confirm(`Tem certeza de que deseja deletar o projeto de ID ${id}?`);
    if (!confirmDelete) return;

    api.delete(`/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project.id !== id));
        // Deleta também o card correspondente
        api.delete(`/cards/${id}`)
          .then(() => {
            console.log(`Card com ID ${id} deletado`);
          })
          .catch(err => console.error(`Erro ao deletar card com ID ${id}:`, err));
      })
      .catch(error => console.error('Erro ao deletar projeto:', error));
  };

  return (
    <div>
      <h3>Gerenciamento de Projetos</h3>
      <ProjectForm
        project={editingProject}
        onSubmit={handleAddOrUpdate}
        onCancel={() => setEditingProject(null)}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map(project => (
          <li key={project.id} style={{ marginBottom: '1rem' }}>
            <ProjectItem
              project={project}
              onEdit={setEditingProject}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
