// src/components/ContentEditor.jsx
import React, { useState, useEffect } from 'react';

function ContentEditor({ value, onChange }) {
  const [text, setText] = useState(value || '');

  useEffect(() => {
    setText(value || '');
  }, [value]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const insertCopyable = () => {
    const copyable = '@@Digite seu texto copiável aqui@@';
    setText(prev => prev + '\n' + copyable);
    onChange(text + '\n' + copyable);
  };

  const insertImageReference = () => {
    const imagePath = '/assets/projects0001/projects0001__1.png';
    const imageMarkup = `\n<img src="${imagePath}" alt="Minha Imagem" />\n`;
    setText(prev => prev + imageMarkup);
    onChange(text + imageMarkup);
  };

  const insertYouTubeLink = () => {
    const youtubeLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    setText(prev => prev + '\n' + youtubeLink + '\n');
    onChange(text + '\n' + youtubeLink + '\n');
  };

  return (
    <div className="content-editor">
      <h4>Editor de Conteúdo</h4>
      <textarea
        rows={10}
        value={text}
        onChange={handleTextChange}
        placeholder="Digite aqui o conteúdo..."
      />
      <div className="editor-actions">
        <button type="button" onClick={insertCopyable}>+ Texto Copiável</button>
        <button type="button" onClick={insertImageReference}>+ Imagem</button>
        <button type="button" onClick={insertYouTubeLink}>+ Vídeo YouTube</button>
      </div>
    </div>
  );
}

export default ContentEditor;
