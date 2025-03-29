// src/components/Card/CardList.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import CardEditor from './CardEditor';
import CardItem from './CardItem';

function CardList() {
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);

  const fetchCards = () => {
    api.get('/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Erro ao buscar cards:', error));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleAddCard = (cardData) => {
    api.post('/cards', cardData)
      .then(response => {
        const newCard = response.data;
        setCards([...cards, newCard]);

        // Cria automaticamente o projeto com base no novo card
        const projectData = {
          // Aqui tentamos usar o mesmo ID – o backend deve permitir essa inserção manual
          id: newCard.id,
          titulo: `ESSE É O PROJECT DO ${newCard.titulo.toUpperCase()}`,
          descricao: newCard.descricao,
          conteudo: '',  // Defina conforme a necessidade
          categoria: ''
        };

        api.post('/projects', projectData)
          .then(projectResponse => {
            console.log('Projeto criado automaticamente:', projectResponse.data);
            // Opcional: você pode atualizar uma lista de projetos na interface se necessário
          })
          .catch(err => console.error('Erro ao criar o projeto automaticamente:', err));
      })
      .catch(error => console.error('Erro ao adicionar card:', error));
  };

  const handleUpdateCard = (cardData) => {
    api.put(`/cards/${cardData.id}`, cardData)
      .then(response => {
        setCards(cards.map(card => card.id === cardData.id ? response.data : card));
        setEditingCard(null);
      })
      .catch(error => console.error('Erro ao atualizar card:', error));
  };

  const handleDeleteCard = (id) => {
    api.delete(`/cards/${id}`)
      .then(() => setCards(cards.filter(card => card.id !== id)))
      .catch(error => console.error('Erro ao deletar card:', error));
  };

  return (
    <div>
      <h2>Gerenciamento de Cards</h2>
      {!editingCard && (
        <CardEditor onSubmit={handleAddCard} />
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cards.map(card => (
          <li key={card.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            {editingCard && editingCard.id === card.id ? (
              <CardEditor
                initialCard={editingCard}
                onSubmit={handleUpdateCard}
              />
            ) : (
              <CardItem 
                card={card} 
                onEdit={setEditingCard} 
                onDelete={handleDeleteCard} 
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
