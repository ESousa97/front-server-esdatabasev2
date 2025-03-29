import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ProjectForm from './ProjectForm';
import ProjectItem from './ProjectItem';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = () => {
    api.get('/projects')
      .then(response => setProjects(response.data))
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
          setProjects([...projects, response.data]);
        })
        .catch(error => console.error('Erro ao adicionar projeto:', error));
    }
  };

  const handleDelete = (id) => {
    api.delete(`/projects/${id}`)
      .then(() => setProjects(projects.filter(p => p.id !== id)))
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
