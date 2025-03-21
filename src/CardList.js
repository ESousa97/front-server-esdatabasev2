// src/CardList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardList() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ titulo: '', descricao: '', imageurl: '' });
  const [editingCard, setEditingCard] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Carrega todos os cards
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

  // Cria um novo card
  const addCard = () => {
    axios.post('/api/cards', newCard)
      .then(response => {
        setCards([...cards, response.data]);
        setNewCard({ titulo: '', descricao: '', imageurl: '' });
      })
      .catch(error => console.error('Erro ao adicionar card:', error));
  };

  // Deleta um card
  const deleteCard = (id) => {
    axios.delete(`/api/cards/${id}`)
      .then(() => {
        setCards(cards.filter(card => card.id !== id));
      })
      .catch(error => console.error('Erro ao deletar card:', error));
  };

  // Inicia a edição de um card
  const startEditing = (card) => {
    setEditingCard(card);
    setUpdatedData(card);
  };

  // Atualiza um card existente
  const updateCard = (id) => {
    axios.put(`/api/cards/${id}`, updatedData)
      .then(response => {
        setCards(cards.map(card => card.id === id ? response.data : card));
        setEditingCard(null);
        setUpdatedData({});
      })
      .catch(error => console.error('Erro ao atualizar card:', error));
  };

  return (
    <div>
      <h2>Gerenciamento de Cards</h2>
      <div>
        <input
          type="text"
          placeholder="Título"
          value={newCard.titulo}
          onChange={(e) => setNewCard({ ...newCard, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newCard.descricao}
          onChange={(e) => setNewCard({ ...newCard, descricao: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          value={newCard.imageurl}
          onChange={(e) => setNewCard({ ...newCard, imageurl: e.target.value })}
        />
        <button onClick={addCard}>Adicionar Card</button>
      </div>
      <ul>
        {cards.map(card => (
          <li key={card.id} style={{ marginBottom: '1rem' }}>
            {editingCard && editingCard.id === card.id ? (
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
                <input
                  type="text"
                  value={updatedData.imageurl}
                  onChange={(e) => setUpdatedData({ ...updatedData, imageurl: e.target.value })}
                />
                <button onClick={() => updateCard(card.id)}>Salvar</button>
                <button onClick={() => setEditingCard(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <strong>{card.titulo}</strong> - {card.descricao} <br />
                {card.imageurl && (
                  <img src={card.imageurl} alt={card.titulo} style={{ maxWidth: '200px' }} />
                )}
                <br />
                <button onClick={() => deleteCard(card.id)}>Deletar</button>
                <button onClick={() => startEditing(card)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
