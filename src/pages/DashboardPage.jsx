// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectEditor from '../components/Project/ProjectEditor';
import CardEditor from '../components/Card/CardEditor';
import ModalEditor from '../components/Shared/ModalEditor';
import ImageUploader from '../components/ImageUploader';
import './DashboardPage.css';

// Função utilitária para truncar texto
function truncateContent(content = '', maxLength = 60) {
  return content.length <= maxLength
    ? content
    : content.substring(0, maxLength) + '...';
}

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [cards, setCards] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchCards();
  }, []);

  const fetchProjects = () => {
    api.get('/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Erro ao buscar projetos:', error));
  };

  const fetchCards = () => {
    api.get('/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Erro ao buscar cards:', error));
  };

  const handleEdit = (type, item) => setEditingItem({ type, data: item });
  const closeModal = () => setEditingItem(null);

  const handleSaveProject = (projectData) => {
    if (projectData.id) {
      api.put(`/projects/${projectData.id}`, projectData)
        .then(response => {
          setProjects(prev =>
            prev.map(p => (p.id === projectData.id ? response.data : p))
          );
          closeModal();
        })
        .catch(error => console.error('Erro ao atualizar projeto:', error));
    } else {
      api.post('/projects', projectData)
        .then(response => {
          const newProject = response.data;
          setProjects(prev => [...prev, newProject]);
          const cardData = {
            id: newProject.id,
            titulo: newProject.titulo.replace('PROJECT', '').trim() || newProject.titulo,
            descricao: newProject.descricao,
            conteudo: '',
            categoria: ''
          };
          api.post('/cards', cardData)
            .then(cardResponse => setCards(prev => [...prev, cardResponse.data]))
            .catch(err => console.error('Erro ao criar o card automaticamente:', err));
          closeModal();
        })
        .catch(error => console.error('Erro ao adicionar projeto:', error));
    }
  };

  const handleSaveCard = (cardData) => {
    if (cardData.id) {
      api.put(`/cards/${cardData.id}`, cardData)
        .then(response => {
          setCards(prev =>
            prev.map(c => (c.id === cardData.id ? response.data : c))
          );
          closeModal();
        })
        .catch(error => console.error('Erro ao atualizar card:', error));
    } else {
      api.post('/cards', cardData)
        .then(response => {
          const newCard = response.data;
          setCards(prev => [...prev, newCard]);
          const projectData = {
            id: newCard.id,
            titulo: `PROJECT - ${newCard.titulo}`.toUpperCase(),
            descricao: newCard.descricao,
            conteudo: '',
            categoria: ''
          };
          api.post('/projects', projectData)
            .then(projResponse => setProjects(prev => [...prev, projResponse.data]))
            .catch(err => console.error('Erro ao criar o projeto automaticamente:', err));
          closeModal();
        })
        .catch(error => console.error('Erro ao adicionar card:', error));
    }
  };

  // Tratamento de deleção via modal de confirmação
  const confirmDeleteProject = (id) => {
    setDeleteConfirmation({ type: 'project', id });
  };

  const confirmDeleteCard = (id) => {
    setDeleteConfirmation({ type: 'card', id });
  };

  const executeDeleteProject = (id) => {
    Promise.all([
      api.delete(`/projects/${id}`),
      api.delete(`/cards/${id}`)
    ])
      .then(() => {
        setProjects(prev => prev.filter(p => p.id !== id));
        setCards(prev => prev.filter(c => c.id !== id));
      })
      .catch(error => console.error('Erro ao deletar projeto e/ou card correspondente:', error));
  };

  const executeDeleteCard = (id) => {
    Promise.all([
      api.delete(`/cards/${id}`),
      api.delete(`/projects/${id}`)
    ])
      .then(() => {
        setCards(prev => prev.filter(c => c.id !== id));
        setProjects(prev => prev.filter(p => p.id !== id));
      })
      .catch(error => console.error('Erro ao deletar card e/ou projeto correspondente:', error));
  };

  return (
    <div className="dashboard-main">
      {/* Seção de Projetos */}
      <section className="dashboard-section">
        <header className="section-header">
          <h2>Projetos</h2>
          <button className="btn add-btn" onClick={() => handleEdit('project', {})}>
            Adicionar Projeto
          </button>
        </header>
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
                <th className="col-conteudo">Conteúdo</th>
                <th>Categoria</th>
                <th className="col-acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.titulo}</td>
                  <td>{project.descricao}</td>
                  <td>{truncateContent(project.conteudo, 60)}</td>
                  <td>{project.categoria}</td>
                  <td className="actions-cell col-acoes">
                    <button className="btn table-btn" onClick={() => handleEdit('project', project)}>
                      Editar
                    </button>
                    <button className="btn delete-btn" onClick={() => confirmDeleteProject(project.id)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção de Cards */}
      <section className="dashboard-section">
        <header className="section-header">
          <h2>Cards</h2>
          <button className="btn add-btn" onClick={() => handleEdit('card', {})}>
            Adicionar Card
          </button>
        </header>
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Imagem URL</th>
                <th className="col-acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(card => (
                <tr key={card.id}>
                  <td>{card.id}</td>
                  <td>{card.titulo}</td>
                  <td>{card.descricao}</td>
                  <td>{card.imageurl}</td>
                  <td className="actions-cell col-acoes">
                    <button className="btn table-btn" onClick={() => handleEdit('card', card)}>
                      Editar
                    </button>
                    <button className="btn delete-btn" onClick={() => confirmDeleteCard(card.id)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção de Upload de Imagens */}
      <section className="dashboard-section">
        <header className="section-header">
          <h2>Upload de Imagens</h2>
        </header>
        <ImageUploader />
      </section>

      {/* Modal para Edição */}
      {editingItem && (
        <ModalEditor onClose={closeModal} fullscreen={editingItem?.type === 'project'}>
          {editingItem.type === 'project' ? (
            <ProjectEditor
              project={editingItem.data.id ? editingItem.data : null}
              onSubmit={handleSaveProject}
              onCancel={closeModal}
            />
          ) : (
            <div className="modal-content">
              <h3>{editingItem.data.id ? "Editar Card" : "Adicionar Card"}</h3>
              <CardEditor
                initialCard={editingItem.data.id ? editingItem.data : null}
                onSubmit={handleSaveCard}
              />
            </div>
          )}
        </ModalEditor>
      )}

      {/* Modal de Confirmação para Deleção */}
      {deleteConfirmation && (
        <ModalEditor onClose={() => setDeleteConfirmation(null)}>
          <div className="confirm-modal">
            <h3>Confirmar Exclusão</h3>
            <p>
              Tem certeza de que deseja deletar {deleteConfirmation.type === 'project' ? 'o projeto' : 'o card'} de ID {deleteConfirmation.id}?
            </p>
            <div className="confirm-buttons">
              <button
                className="btn delete-btn"
                onClick={() => {
                  if (deleteConfirmation.type === 'project') {
                    executeDeleteProject(deleteConfirmation.id);
                  } else {
                    executeDeleteCard(deleteConfirmation.id);
                  }
                  setDeleteConfirmation(null);
                }}
              >
                Sim, deletar
              </button>
              <button className="btn" onClick={() => setDeleteConfirmation(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </ModalEditor>
      )}
    </div>
  );
}

export default DashboardPage;
