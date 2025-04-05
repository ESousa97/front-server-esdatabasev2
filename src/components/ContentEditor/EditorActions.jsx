import React from 'react';
import PropTypes from 'prop-types';
import { MdOpenInNew } from 'react-icons/md';
import {
  ClipboardCopy,
  Highlighter,
  Bold,
  Italic,
  Code,
  Code2,
  List,
  Heading1,
  Heading2,
  Image,
  Youtube,
  Link,
} from 'lucide-react';
import './EditorActions.css';

function EditorActions({
  onInsertCopyable,
  onInsertHighlight,
  onInsertImage,
  onInsertYouTube,
  onInsertBold,
  onInsertItalic,
  onInsertCodeInline,
  onInsertCodeBlock,
  onInsertList,
  onInsertHeading1,
  onInsertHeading2,
  onInsertLink,
  onOpenLivePreview,
}) {
  return (
    <div className="editor-actions">
      <button type="button" className="editor-button" onClick={onInsertCopyable} title="Texto copiável">
        <ClipboardCopy size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertHighlight} title="Destaque">
        <Highlighter size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertBold} title="Negrito" >
        <Bold size={16} strokeWidth={3.5} />
        <span className="button-label" style={{ fontWeight: 'bold' }}></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertItalic} title="Itálico">
        <Italic size={16} />
        <span className="button-label" style={{ fontStyle: 'italic' }}></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertCodeInline} title="Código Inline">
        <Code size={16} />
        <span className="button-label" style={{ fontFamily: 'monospace' }}></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertCodeBlock} title="Bloco de Código">
        <Code2 size={16} />
        <span className="button-label" style={{ fontFamily: 'monospace' }}></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertList} title="Lista">
        <List size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertHeading1} title="Título H1">
        <Heading1 size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertHeading2} title="Título H2">
        <Heading2 size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertImage} title="Imagem">
        <Image size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertYouTube} title="Vídeo YouTube">
        <Youtube size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onInsertLink} title="Link externo">
        <Link size={16} />
        <span className="button-label"></span>
      </button>
      <button type="button" className="editor-button" onClick={onOpenLivePreview} title="Live Preview">
        <MdOpenInNew size={20} />
      </button>
    </div>
  );
}

EditorActions.propTypes = {
  onInsertCopyable: PropTypes.func.isRequired,
  onInsertHighlight: PropTypes.func.isRequired,
  onInsertImage: PropTypes.func.isRequired,
  onInsertYouTube: PropTypes.func.isRequired,
  onInsertBold: PropTypes.func.isRequired,
  onInsertItalic: PropTypes.func.isRequired,
  onInsertCodeInline: PropTypes.func.isRequired,
  onInsertCodeBlock: PropTypes.func.isRequired,
  onInsertList: PropTypes.func.isRequired,
  onInsertHeading1: PropTypes.func.isRequired,
  onInsertHeading2: PropTypes.func.isRequired,
  onInsertLink: PropTypes.func.isRequired,
  onOpenLivePreview: PropTypes.func.isRequired,
};

export default EditorActions;
