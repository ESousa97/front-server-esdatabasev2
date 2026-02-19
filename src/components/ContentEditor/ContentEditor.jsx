import React, { useState, useEffect, useRef } from 'react';
import EditorActions from './EditorActions';
import './ContentEditor.css';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { setStorageItem } from '../../utils/storage';

function ContentEditor({ value, onChange, textareaId }) {
  const [text, setText] = useState(value || '');
  const textareaRef = useRef(null);

  useEffect(() => {
    setText(value || '');
  }, [value]);

  // Atualiza o localStorage a cada mudança
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.LIVE_PREVIEW_CONTENT, text);
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onChange(newText);
  };

  const insertAroundSelection = (prefix, suffix = '') => {
    if (!textareaRef.current) return;
    const { selectionStart, selectionEnd } = textareaRef.current;
    const selected = text.slice(selectionStart, selectionEnd);
    const newText =
      text.slice(0, selectionStart) +
      prefix +
      selected +
      suffix +
      text.slice(selectionEnd);
    setText(newText);
    onChange(newText);
    setTimeout(() => {
      const pos = selectionStart + prefix.length + selected.length + suffix.length;
      textareaRef.current.setSelectionRange(pos, pos);
      textareaRef.current.focus();
    }, 0);
  };

  // Funções de inserção
  const insertCopyable = () => insertAroundSelection('@@', '@@');
  const insertHighlight = () => insertAroundSelection(':::', ':::');
  const insertBold = () => insertAroundSelection('**', '**');
  const insertItalic = () => insertAroundSelection('*', '*');
  const insertCodeInline = () => insertAroundSelection('`', '`');
  const insertCodeBlock = () => insertAroundSelection('\n```js\n', '\n```\n');
  const insertList = () => insertAroundSelection('- ');
  const insertHeading1 = () => insertAroundSelection('# ');
  const insertHeading2 = () => insertAroundSelection('## ');
  const insertLink = () => insertAroundSelection('[texto](https://link.com)');
  const insertImageReference = () =>
    insertAroundSelection('![Descrição](/assets/projects0001/projects0001__1.png)');
  const insertYouTubeLink = () =>
    insertAroundSelection('https://www.youtube.com/watch?v=dQw4w9WgXcQ\n');

  // Abre a rota do preview em uma nova guia
  const handleOpenLivePreview = () => {
    setStorageItem(STORAGE_KEYS.LIVE_PREVIEW_CONTENT, text);
    window.open('/live-preview', '_blank');
  };

  return (
    <div className="content-editor">
      <h4 className="editor-title">Editor de Conteúdo</h4>
      <div className="editor-pane">
        <textarea
          id={textareaId}
          ref={textareaRef}
          className="editor-textarea"
          rows={12}
          value={text}
          onChange={handleTextChange}
          placeholder="Digite aqui o conteúdo..."
        />
        <EditorActions
          onInsertCopyable={insertCopyable}
          onInsertHighlight={insertHighlight}
          onInsertImage={insertImageReference}
          onInsertYouTube={insertYouTubeLink}
          onInsertBold={insertBold}
          onInsertItalic={insertItalic}
          onInsertCodeInline={insertCodeInline}
          onInsertCodeBlock={insertCodeBlock}
          onInsertList={insertList}
          onInsertHeading1={insertHeading1}
          onInsertHeading2={insertHeading2}
          onInsertLink={insertLink}
          onOpenLivePreview={handleOpenLivePreview}
        />
      </div>
    </div>
  );
}

export default ContentEditor;
