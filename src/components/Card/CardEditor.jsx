// src/components/Card/CardEditor.jsx
import React, { useState } from 'react';

function CardEditor({ initialCard, onSubmit }) {
  const [cardData, setCardData] = useState(
    initialCard || { titulo: '', descricao: '', imageurl: '' }
  );

  const handleChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(cardData);
  };

  const presetImage = () => {
    const preset = '/assets/projects0001/projects0001__2.png';
    handleChange('imageurl', preset);
  };

  return (
    <div className="card-editor">
      <h3>Editor de Card</h3>
      <div className="form-group">
        <label>Título:</label>
        <input 
          type="text" 
          value={cardData.titulo} 
          onChange={e => handleChange('titulo', e.target.value)} 
          placeholder="Insira o título do card" 
        />
      </div>
      <div className="form-group">
        <label>Imagem (URL):</label>
        <input 
          type="text" 
          value={cardData.imageurl} 
          onChange={e => handleChange('imageurl', e.target.value)} 
          placeholder="Ex.: /assets/projectsXXXX/projectsXXXX__X.png"
        />
        <button onClick={presetImage} className="btn-secondary">Preset Imagem</button>
      </div>
      <div className="form-group">
        <label>Descrição:</label>
        <input
          type="text"
          value={cardData.descricao}
          onChange={e => handleChange('descricao', e.target.value)}
          placeholder="Insira a descrição do card"
        />
      </div>
      <button onClick={handleSubmit} className="btn-primary">Salvar Card</button>
    </div>
  );
}

export default CardEditor;
