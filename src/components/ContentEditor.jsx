import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditorActions from './EditorActions';
import './ContentEditor.css';

function ContentEditor({ value, onChange }) {
  const [text, setText] = useState(value || '');

  useEffect(() => {
    setText(value || '');
  }, [value]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onChange(newText);
  };

  // As funções agora utilizam o estado anterior para garantir a atualização correta
  const insertCopyable = () => {
    const copyable = '@@Digite seu texto copiável aqui@@';
    setText(prevText => {
      const newText = prevText + '\n' + copyable;
      onChange(newText);
      return newText;
    });
  };

  const insertImageReference = () => {
    const imagePath = '/assets/projects0001/projects0001__1.png';
    const imageMarkup = `\n<img src="${imagePath}" alt="Minha Imagem" />\n`;
    setText(prevText => {
      const newText = prevText + imageMarkup;
      onChange(newText);
      return newText;
    });
  };

  const insertYouTubeLink = () => {
    const youtubeLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    setText(prevText => {
      const newText = prevText + '\n' + youtubeLink + '\n';
      onChange(newText);
      return newText;
    });
  };

  return (
    <div className="content-editor">
      <h4 className="editor-title">Editor de Conteúdo</h4>
      <textarea
        className="editor-textarea"
        rows={10}
        value={text}
        onChange={handleTextChange}
        placeholder="Digite aqui o conteúdo..."
      />
      <EditorActions 
        onInsertCopyable={insertCopyable}
        onInsertImage={insertImageReference}
        onInsertYouTube={insertYouTubeLink}
      />
    </div>
  );
}

ContentEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ContentEditor;
