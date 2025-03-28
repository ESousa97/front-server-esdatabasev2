// src/CardManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardEditor from './CardEditor';

function CardManagement() {
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Função para buscar os cards do back-end
  const fetchCards = () => {
    axios.get('/api/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Erro ao buscar cards:', error));
  };

  useEffect(() => {
    fetchCards();
  }, [refresh]);

  // Função chamada quando o CardEditor envia os dados (novo ou editado)
  const handleCardSubmit = (cardData) => {
    // Se o cardData tiver um id, é atualização; caso contrário, criação
    if (cardData.id) {
      axios.put(`/api/cards/${cardData.id}`, cardData)
        .then(response => {
          setCards(cards.map(card => card.id === cardData.id ? response.data : card));
          setRefresh(prev => !prev);
        })
        .catch(error => console.error('Erro ao atualizar card:', error));
    } else {
      axios.post('/api/cards', cardData)
        .then(response => {
          setCards([...cards, response.data]);
          setRefresh(prev => !prev);
        })
        .catch(error => console.error('Erro ao adicionar card:', error));
    }
  };

  // Exemplo de interface para listagem (pode ser customizada)
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Gerenciamento de Cards</h2>
      
      {/* Editor para criar novo card */}
      <CardEditor onSubmit={handleCardSubmit} />

      {/* Lista de Cards */}
      <ul>
        {cards.map(card => (
          <li key={card.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            <strong>{card.titulo}</strong> - {card.descricao}
            {card.imageurl && (
              <div>
                <img src={card.imageurl} alt={card.titulo} style={{ maxWidth: '200px' }} />
              </div>
            )}
            {/* Aqui você pode adicionar botões de edição ou deleção */}
            <button onClick={() => handleCardSubmit({ ...card })}>Editar</button>
            <button onClick={() => {
              axios.delete(`/api/cards/${card.id}`)
                .then(() => setRefresh(prev => !prev))
                .catch(error => console.error('Erro ao deletar card:', error));
            }}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardManagement;
