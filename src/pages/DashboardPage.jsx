// src/pages/DashboardPage.jsx
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

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout(); // Atualiza o estado de autenticação
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro no logout:", error);
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

  // Salva ou atualiza um projeto e cria automaticamente o card correspondente
  const handleSaveProject = (projectData) => {
    if (projectData.id) {
      // Atualização
      api.put(`/projects/${projectData.id}`, projectData)
        .then(response => {
          setProjects(projects.map(p => p.id === projectData.id ? response.data : p));
          // Se desejar atualizar o card também, pode ser implementado aqui
          closeModal();
        })
        .catch(error => console.error('Erro ao atualizar projeto:', error));
    } else {
      // Criação de novo projeto
      api.post('/projects', projectData)
        .then(response => {
          const newProject = response.data;
          setProjects([...projects, newProject]);

          // Cria automaticamente o card correspondente
          const cardData = {
            id: newProject.id, // assume que o backend permite definir o ID
            titulo: newProject.titulo.replace('PROJECT', '').trim() || newProject.titulo,
            descricao: newProject.descricao,
            imageurl: '' // defina um valor padrão se necessário
          };

          api.post('/cards', cardData)
            .then(cardResponse => {
              setCards([...cards, cardResponse.data]);
            })
            .catch(err => console.error('Erro ao criar o card automaticamente:', err));

          closeModal();
        })
        .catch(error => console.error('Erro ao adicionar projeto:', error));
    }
  };

  // Salva ou atualiza um card e cria automaticamente o projeto correspondente
  const handleSaveCard = (cardData) => {
    if (cardData.id) {
      // Atualização
      api.put(`/cards/${cardData.id}`, cardData)
        .then(response => {
          setCards(cards.map(c => c.id === cardData.id ? response.data : c));
          // Se desejar atualizar o projeto correspondente, pode ser adicionado aqui
          closeModal();
        })
        .catch(error => console.error('Erro ao atualizar card:', error));
    } else {
      // Criação de novo card
      api.post('/cards', cardData)
        .then(response => {
          const newCard = response.data;
          setCards([...cards, newCard]);

          // Cria automaticamente o projeto correspondente
          const projectData = {
            id: newCard.id, // assume que o backend permite definir o ID
            titulo: `PROJECT - ${newCard.titulo}`.toUpperCase(),
            descricao: newCard.descricao,
            conteudo: '',
            categoria: ''
          };

          api.post('/projects', projectData)
            .then(projResponse => {
              setProjects([...projects, projResponse.data]);
            })
            .catch(err => console.error('Erro ao criar o projeto automaticamente:', err));

          closeModal();
        })
        .catch(error => console.error('Erro ao adicionar card:', error));
    }
  };

// Deletar projeto e o card correspondente
const handleDeleteProject = (id) => {
    Promise.all([
      api.delete(`/projects/${id}`),
      api.delete(`/cards/${id}`)
    ])
      .then(() => {
        setProjects(projects.filter(p => p.id !== id));
        setCards(cards.filter(c => c.id !== id));
      })
      .catch(error => console.error('Erro ao deletar projeto e/ou card correspondente:', error));
  };
  
  // Deletar card e o projeto correspondente
  const handleDeleteCard = (id) => {
    Promise.all([
      api.delete(`/cards/${id}`),
      api.delete(`/projects/${id}`)
    ])
      .then(() => {
        setCards(cards.filter(c => c.id !== id));
        setProjects(projects.filter(p => p.id !== id));
      })
      .catch(error => console.error('Erro ao deletar card e/ou projeto correspondente:', error));
  };  

  return (
    <div>
      <Header onLogout={handleLogout} /> {/* Passa a função de logout correta */}
      <div className="editor-container">
        <Sidebar />
        <main className="main-content">
          <h2>Dashboard - Tabelas do Banco de Dados</h2>

          {/* Seções de projetos e cards */}
          <section>
            <h3>Projetos</h3>
            <button onClick={() => handleEdit('project', {})} style={{ marginBottom: '1rem' }}>
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
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{project.id}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{project.titulo}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{project.descricao}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{project.conteudo}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{project.categoria}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      <button onClick={() => handleEdit('project', project)}>Editar</button>
                      <button onClick={() => handleDeleteProject(project.id)}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h3>Cards</h3>
            <button onClick={() => handleEdit('card', {})} style={{ marginBottom: '1rem' }}>
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
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{card.id}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{card.titulo}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{card.descricao}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>{card.imageurl}</td>
                    <td style={{ border: '1px solid var(--color-border)', padding: '8px' }}>
                      <button onClick={() => handleEdit('card', card)}>Editar</button>
                      <button onClick={() => handleDeleteCard(card.id)}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
      <Footer />

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
