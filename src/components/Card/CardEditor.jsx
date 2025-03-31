import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CardEditor.css';

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
      <h3 className="card-editor__title">Editor de Card</h3>

      <div className="card-editor__group">
        <label className="card-editor__label">Título:</label>
        <input
          className="card-editor__input"
          type="text"
          value={cardData.titulo}
          onChange={e => handleChange('titulo', e.target.value)}
          placeholder="Insira o título do card"
        />
      </div>

      <div className="card-editor__group">
        <label className="card-editor__label">Imagem (URL):</label>
        <input
          className="card-editor__input"
          type="text"
          value={cardData.imageurl}
          onChange={e => handleChange('imageurl', e.target.value)}
          placeholder="Ex.: /assets/projectsXXXX/projectsXXXX__X.png"
        />
        <button
          className="card-editor__preset"
          onClick={presetImage}
        >
          Preset Imagem
        </button>
      </div>

      <div className="card-editor__group">
        <label className="card-editor__label">Descrição:</label>
        <input
          className="card-editor__input"
          type="text"
          value={cardData.descricao}
          onChange={e => handleChange('descricao', e.target.value)}
          placeholder="Insira a descrição do card"
        />
      </div>

      <button
        className="card-editor__submit"
        onClick={handleSubmit}
      >
        Salvar Card
      </button>
    </div>
  );
}

CardEditor.propTypes = {
  initialCard: PropTypes.shape({
    titulo: PropTypes.string,
    descricao: PropTypes.string,
    imageurl: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default CardEditor;
