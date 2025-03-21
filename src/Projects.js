// src/Projects.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ titulo: '', descricao: '', conteudo: '', categoria: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Carrega todos os projetos
  const fetchProjects = () => {
    axios.get('/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.error('Erro ao buscar projetos:', error));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Adiciona um novo projeto
  const addProject = () => {
    axios.post('/api/projects', newProject)
      .then(response => {
        setProjects([...projects, response.data]);
        setNewProject({ titulo: '', descricao: '', conteudo: '', categoria: '' });
      })
      .catch(error => console.error('Erro ao adicionar projeto:', error));
  };

  // Deleta um projeto
  const deleteProject = (id) => {
    axios.delete(`/api/projects/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project.id !== id));
      })
      .catch(error => console.error('Erro ao deletar projeto:', error));
  };

  // Inicia a edição
  const startEditing = (project) => {
    setEditingProject(project);
    setUpdatedData(project);
  };

  // Atualiza um projeto existente
  const updateProject = (id) => {
    axios.put(`/api/projects/${id}`, updatedData)
      .then(response => {
        setProjects(projects.map(project => project.id === id ? response.data : project));
        setEditingProject(null);
        setUpdatedData({});
      })
      .catch(error => console.error('Erro ao atualizar projeto:', error));
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Gerenciamento de Projetos</h2>
      <div>
        <input
          type="text"
          placeholder="Título"
          value={newProject.titulo}
          onChange={(e) => setNewProject({ ...newProject, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newProject.descricao}
          onChange={(e) => setNewProject({ ...newProject, descricao: e.target.value })}
        />
        <input
          type="text"
          placeholder="Conteúdo"
          value={newProject.conteudo}
          onChange={(e) => setNewProject({ ...newProject, conteudo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={newProject.categoria}
          onChange={(e) => setNewProject({ ...newProject, categoria: e.target.value })}
        />
        <button onClick={addProject}>Adicionar Projeto</button>
      </div>
      <ul>
        {projects.map(project => (
          <li key={project.id} style={{ marginBottom: '1rem' }}>
            {editingProject && editingProject.id === project.id ? (
              <div>
                <input
                  type="text"
                  value={updatedData.titulo}
                  onChange={(e) => setUpdatedData({ ...updatedData, titulo: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedData.descricao}
                  onChange={(e) => setUpdatedData({ ...updatedData, descricao: e.target.value })}
                />
                <button onClick={() => updateProject(project.id)}>Salvar</button>
                <button onClick={() => setEditingProject(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <strong>{project.titulo}</strong> - {project.descricao}
                <button onClick={() => deleteProject(project.id)}>Deletar</button>
                <button onClick={() => startEditing(project)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
