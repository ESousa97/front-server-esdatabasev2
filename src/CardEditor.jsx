// src/CardEditor.jsx
import React, { useState } from 'react';
import ContentEditor from './ContentEditor';

/**
 * CardEditor
 * Permite inserir ou editar um card.
 * Campos:
 *  - titulo: Título do card.
 *  - imageurl: URL da imagem (por exemplo, /assets/cards/meucard.png).
 *  - descricao: Descrição rica com marcações.
 *
 * Props:
 *  - initialCard: Dados iniciais (para edição).
 *  - onSubmit: Função chamada ao salvar com os dados do card.
 */
function CardEditor({ initialCard, onSubmit }) {
  const [cardData, setCardData] = useState(
    initialCard || { titulo: '', descricao: '', imageurl: '' }
  );

  const handleChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Aqui você pode incluir validações se necessário
    onSubmit(cardData);
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
          placeholder="Ex.: /assets/cards/meucard.png"
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem' }}>Descrição:</label>
        <ContentEditor 
          value={cardData.descricao}
          onChange={(val) => handleChange('descricao', val)}
        />
      </div>
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>
        Salvar Card
      </button>
    </div>
  );
}

export default CardEditor;
