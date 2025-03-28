import React, { useState } from 'react';

/**
 * Componente de Editor Simples
 * - Permite inserir texto com "marcadores" e placeholders.
 * - Em um caso real, você poderia usar um WYSIWYG (react-quill, draft.js, etc.)
 */
function ContentEditor({ value, onChange }) {
  const [text, setText] = useState(value || '');

  // Ao digitar, atualiza estado local e notifica o componente pai
  const handleTextChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  // Exemplo de botão para inserir um "trecho copiável" ( @@texto@@ )
  const insertCopyable = () => {
    const copyable = '@@Digite seu texto copiável aqui@@';
    setText(prev => prev + '\n' + copyable);
    onChange(text + '\n' + copyable);
  };

  // Exemplo de botão para inserir link de imagem do front-end usuário
  const insertImageReference = () => {
    // Por exemplo: /assets/projects0001/projects0001__1.png
    const imagePath = '/assets/projects0001/projects0001__1.png';
    // Você pode usar outro formato, como Markdown: ![alt](imagePath)
    const imageMarkup = `\n<img src="${imagePath}" alt="Minha Imagem" />\n`;
    setText(prev => prev + imageMarkup);
    onChange(text + imageMarkup);
  };

  // Exemplo de botão para inserir link do YouTube
  const insertYouTubeLink = () => {
    // Padrão que seu front-end usuário já reconhece: "https://www.youtube.com/watch?v=ID"
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
        <button onClick={insertCopyable}>+ Texto Copiável</button>
        <button onClick={insertImageReference}>+ Imagem</button>
        <button onClick={insertYouTubeLink}>+ Vídeo YouTube</button>
      </div>
    </div>
  );
}

export default ContentEditor;
