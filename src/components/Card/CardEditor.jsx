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
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <h3>Editor de Card</h3>
      <div style={{ marginBottom: '0.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem' }}>Título:</label>
        <input 
          type="text" 
          value={cardData.titulo} 
          onChange={e => handleChange('titulo', e.target.value)} 
          placeholder="Insira o título do card" 
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem' }}>Imagem (URL):</label>
        <input 
          type="text" 
          value={cardData.imageurl} 
          onChange={e => handleChange('imageurl', e.target.value)} 
          placeholder="Ex.: /assets/projectsXXXX/projectsXXXX__X.png"
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button 
          onClick={presetImage} 
          style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem' }}
        >
          Preset Imagem
        </button>
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem' }}>Descrição:</label>
        <input
          type="text"
          value={cardData.descricao}
          onChange={e => handleChange('descricao', e.target.value)}
          placeholder="Insira a descrição do card"
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <button 
        onClick={handleSubmit} 
        style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Salvar Card
      </button>
    </div>
  );
}

export default CardEditor;
