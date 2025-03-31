// src/components/Card/CardItem.jsx
import React from 'react';

function CardItem({ card, onEdit, onDelete }) {
  const handleShowDetails = () => {
    alert(JSON.stringify(card, null, 2));
  };

  return (
    <div>
      <p>ID: {card.id}</p>
      <strong>{card.titulo}</strong> - {card.descricao}
      {card.imageurl && (
        <div style={{ marginTop: '0.5rem' }}>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            Caminho da Imagem: {card.imageurl}
          </p>
        </div>
      )}
      <div style={{ marginTop: '0.5rem' }}>
        <button
          style={{ marginRight: '0.5rem' }}
          onClick={handleShowDetails}
        >
          Detalhes
        </button>
        <button
          style={{ marginRight: '0.5rem' }}
          onClick={() => onEdit(card)}
        >
          Editar
        </button>
        <button onClick={() => onDelete(card.id)}>
          Deletar
        </button>
      </div>
    </div>
  );
}

export default CardItem;
