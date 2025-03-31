// src/components/Card/CardItem.jsx
import React from 'react';

function CardItem({ card, onEdit, onDelete }) {
  const handleShowDetails = () => {
    console.log("Detalhes do card:", card);
  };

  return (
    <div className="card-item">
      <div className="card-info">
        <strong>{card.titulo}</strong> - {card.descricao}
        {card.imageurl && <p className="card-image">Imagem: {card.imageurl}</p>}
      </div>
      <div className="card-actions">
        <button onClick={handleShowDetails}>Detalhes</button>
        <button onClick={() => onEdit(card)}>Editar</button>
        <button onClick={() => onDelete(card.id)}>Excluir</button>
      </div>
    </div>
  );
}

export default CardItem;
