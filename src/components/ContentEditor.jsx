import React, { useState } from 'react';

function ContentEditor({ value, onChange }) {
  const [text, setText] = useState(value || '');

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
    <div style={{ marginBottom: '1rem' }}>
      <h4>Editor de Conteúdo</h4>
      <textarea
        rows={10}
        cols={60}
        value={text}
        onChange={handleTextChange}
        placeholder="Digite aqui o conteúdo..."
      />
    <div style={{ marginTop: '8px' }}>
      <button type="button" onClick={insertCopyable}>+ Texto Copiável</button>
      <button type="button" onClick={insertImageReference}>+ Imagem</button>
      <button type="button" onClick={insertYouTubeLink}>+ Vídeo YouTube</button>
    </div>
    </div>
  );
}

export default ContentEditor;
