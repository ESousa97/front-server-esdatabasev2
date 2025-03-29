import React from 'react';

function CardItem({ card, onEdit, onDelete }) {
  return (
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
        <button onClick={() => onEdit(card)} style={{ marginRight: '0.5rem' }}>Editar</button>
        <button onClick={() => onDelete(card.id)}>Deletar</button>
      </div>
    </div>
  );
}

export default CardItem;
