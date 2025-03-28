// src/CardList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardEditor from './CardEditor';

function CardList() {
  const [cards, setCards] = useState([]);
  // Armazena o card que está em modo de edição
  const [editingCard, setEditingCard] = useState(null);

  // Busca os cards do back-end
  const fetchCards = () => {
    axios.get('/api/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => console.error('Erro ao buscar cards:', error));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Cria um novo card (quando não está em edição)
  const handleAddCard = (cardData) => {
    axios.post('/api/cards', cardData)
      .then(response => {
        setCards([...cards, response.data]);
      })
      .catch(error => console.error('Erro ao adicionar card:', error));
  };

  // Atualiza um card existente
  const handleUpdateCard = (cardData) => {
    axios.put(`/api/cards/${cardData.id}`, cardData)
      .then(response => {
        setCards(cards.map(card => card.id === cardData.id ? response.data : card));
        setEditingCard(null);
      })
      .catch(error => console.error('Erro ao atualizar card:', error));
  };

  // Remove um card
  const handleDeleteCard = (id) => {
    axios.delete(`/api/cards/${id}`)
      .then(() => {
        setCards(cards.filter(card => card.id !== id));
      })
      .catch(error => console.error('Erro ao deletar card:', error));
  };

  return (
    <div>
      <h2>Gerenciamento de Cards</h2>

      {/* Se nenhum card estiver em edição, exibe o editor para criar um novo */}
      {!editingCard && (
        <CardEditor onSubmit={handleAddCard} />
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cards.map(card => (
          <li key={card.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            {editingCard && editingCard.id === card.id ? (
              // Modo de edição: usa o mesmo CardEditor com os dados iniciais
              <CardEditor
                initialCard={editingCard}
                onSubmit={handleUpdateCard}
              />
            ) : (
              <div>
                <strong>{card.titulo}</strong> - {card.descricao}
                {card.imageurl && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <p style={{ fontStyle: 'italic', color: '#555' }}>
                      Caminho da Imagem: {card.imageurl}
                    </p>
                  </div>
                )}
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => setEditingCard(card)} style={{ marginRight: '0.5rem' }}>Editar</button>
                  <button onClick={() => handleDeleteCard(card.id)}>Deletar</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
