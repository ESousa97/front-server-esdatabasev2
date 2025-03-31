import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectForm from '../components/Project/ProjectForm';
import CardEditor from '../components/Card/CardEditor';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ModalEditor from '../components/ModalEditor';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [cards, setCards] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  // Efetua o logout com proteção CSRF
  const handleLogout = async () => {
    try {
      // (Opcional) Obter novamente um token CSRF fresco antes do logout,
      // caso queira garantir um token recente.
      // A chamada inicial em "api.js" já definiu X-CSRF-Token globalmente,
      // mas se passou muito tempo, você pode querer refazer:
      const tokenRes = await api.get('/csrf-token');
      const csrfToken = tokenRes.data.csrfToken;
      
      // Envia a requisição de logout incluindo o token no header
      await api.post('/auth/logout', {}, {
        headers: { 'X-CSRF-Token': csrfToken }
      });
      
      // Remove o estado de autenticação e redireciona para /login
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Abre o modal para edição/adicionar
  const handleEdit = (type, item) => {
    setEditingItem({ type, data: item });
  };

  // Fecha o modal
  const closeModal = () => {
    setEditingItem(null);
  };

  // Salva ou atualiza um projeto
  const handleSaveProject = (projectData) => {
    if (projectData.id) {
      // Atualização
      api.put(`/projects/${projectData.id}`, projectData)
        .then(response => {
          setProjects(prev =>
            prev.map(p => (p.id === projectData.id ? response.data : p))
          );
          closeModal();
        })
        .catch(error => console.error('Erro ao atualizar projeto:', error));
    } else {
      // Criação
      api.post('/projects', projectData)
        .then(response => {
          const newProject = response.data;
          setProjects(prev => [...prev, newProject]);

          // Cria automaticamente o card correspondente
          const cardData = {
            id: newProject.id,
            titulo: newProject.titulo.replace('PROJECT', '').trim() || newProject.titulo,
            descricao: newProject.descricao,
            imageurl: ''
          };

          api.post('/cards', cardData)
            .then(cardResponse => {
              setCards(prev => [...prev, cardResponse.data]);
            })
            .catch(err => console.error('Erro ao criar o card automaticamente:', err));

          closeModal();
        })
        .catch(error => console.error('Erro ao adicionar projeto:', error));
    }
  };

  // Salva ou atualiza um card
  const handleSaveCard = (cardData) => {
    if (cardData.id) {
      // Atualização
      api.put(`/cards/${cardData.id}`, cardData)
        .then(response => {
          setCards(prev =>
            prev.map(c => (c.id === cardData.id ? response.data : c))
          );
          closeModal();
        })
        .catch(error => console.error('Erro ao atualizar card:', error));
    } else {
      // Criação
      api.post('/cards', cardData)
        .then(response => {
          const newCard = response.data;
          setCards(prev => [...prev, newCard]);

          // Cria automaticamente o projeto correspondente
          const projectData = {
            id: newCard.id,
            titulo: `PROJECT - ${newCard.titulo}`.toUpperCase(),
            descricao: newCard.descricao,
            conteudo: '',
            categoria: ''
          };

          api.post('/projects', projectData)
            .then(projResponse => {
              setProjects(prev => [...prev, projResponse.data]);
            })
            .catch(err => console.error('Erro ao criar o projeto automaticamente:', err));

          closeModal();
        })
        .catch(error => console.error('Erro ao adicionar card:', error));
    }
  };

  // Deleta projeto e o card correspondente
  const handleDeleteProject = (id) => {
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
  
  // Deleta card e o projeto correspondente
  const handleDeleteCard = (id) => {
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
    <div>
      <Header onLogout={handleLogout} />
      <div className="editor-container">
        <Sidebar />
        <main className="main-content">
          <h2>Dashboard - Tabelas do Banco de Dados</h2>

          {/* Seção de Projetos */}
          <section>
            <h3>Projetos</h3>
            <button
              onClick={() => handleEdit('project', {})}
              style={{ marginBottom: '1rem' }}
            >
              Adicionar Projeto
            </button>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Título</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Descrição</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Conteúdo</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Categoria</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id}>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {project.id}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {project.titulo}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {project.descricao}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {project.conteudo}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {project.categoria}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      <button onClick={() => handleEdit('project', project)}>
                        Editar
                      </button>
                      <button onClick={() => handleDeleteProject(project.id)}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Seção de Cards */}
          <section>
            <h3>Cards</h3>
            <button
              onClick={() => handleEdit('card', {})}
              style={{ marginBottom: '1rem' }}
            >
              Adicionar Card
            </button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Título</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Descrição</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Imagem URL</th>
                  <th style={{ border: '1px solid var(--color-border)', padding: '8px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {cards.map(card => (
                  <tr key={card.id}>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {card.id}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {card.titulo}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {card.descricao}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      {card.imageurl}
                    </td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      <button onClick={() => handleEdit('card', card)}>
                        Editar
                      </button>
                      <button onClick={() => handleDeleteCard(card.id)}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      <Footer />

      {/* Modal de Edição/Criação */}
      {editingItem && (
        <ModalEditor onClose={closeModal}>
          {editingItem.type === 'project' ? (
            <div>
              <h3>{editingItem.data.id ? "Editar Projeto" : "Adicionar Projeto"}</h3>
              <ProjectForm
                project={editingItem.data.id ? editingItem.data : null}
                onSubmit={handleSaveProject}
                onCancel={closeModal}
              />
            </div>
          ) : (
            <div>
              <h3>{editingItem.data.id ? "Editar Card" : "Adicionar Card"}</h3>
              <CardEditor
                initialCard={editingItem.data.id ? editingItem.data : null}
                onSubmit={handleSaveCard}
              />
            </div>
          )}
        </ModalEditor>
      )}
    </div>
  );
}

export default DashboardPage;
