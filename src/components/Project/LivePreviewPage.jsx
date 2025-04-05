import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { Box, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'highlight.js/styles/atom-one-dark.css';

import {
  MainContent,
  MarkdownStyles,
  ContentContainer,
  StyledCopyButton,
} from './LivePreviewStyles';

function LivePreviewPage() {
  const [content, setContent] = useState(localStorage.getItem('livePreviewContent') || '');
  const [videoLoaded, setVideoLoaded] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  // Atualiza o conteúdo se o localStorage mudar (ex.: de outra aba)
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'livePreviewContent') {
        setContent(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado!'))
      .catch((error) => console.error('Erro ao copiar conteúdo:', error));
  };

  const handleLoadVideo = (videoId) => setVideoLoaded(videoId);
  const toggleExpand = () => setIsExpanded(prev => !prev);

  const renderVideo = (videoId) => (
    videoLoaded === videoId ? (
      <Box
        sx={{
          position: 'relative',
          height: isExpanded ? '85vh' : '30vh',
          transition: 'height 0.8s ease',
          boxShadow: '0 8px 8px var(--color-shadow)',
          m: 1,
          borderRadius: '8px',
        }}
      >
        <iframe
          title="Video Embed"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
          }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&vq=hd1080`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        <Button
          variant="contained"
          onClick={toggleExpand}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'var(--color-warning)',
            color: '#fff',
            px: 1.5,
            borderRadius: '4px',
            textTransform: 'none',
            boxShadow: '0 2px 4px var(--color-shadow)',
            '&:hover': { backgroundColor: '#c51162' },
          }}
        >
          {isExpanded ? 'Minimizar' : 'Expandir'}
        </Button>
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '4vh' }}>
        <Button
          variant="outlined"
          onClick={() => handleLoadVideo(videoId)}
          sx={{ px: 1, fontSize: '0.9rem', boxShadow: '0 2px 4px var(--color-shadow)' }}
        >
          Carregar Vídeo
        </Button>
      </Box>
    )
  );

  const safeContent = content || '';
  const createMarkup = (html) => ({ __html: DOMPurify.sanitize(html) });

  // Converte marcação ::: em span de destaque
  const highlightedMarkdown = safeContent.replace(
    /:::(.+?):::/g,
    (_, match) => `<span class="highlight-text">${match.trim()}</span>`
  );
  const processedContent = marked.parse(highlightedMarkdown);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = DOMPurify.sanitize(processedContent);

  // Aplica classes para blocos de código
  tempDiv.querySelectorAll('code').forEach((codeEl) => {
    const text = codeEl.textContent.trim();
    const isCode = /[=(){}[\];]/.test(text);
    if (isCode) {
      codeEl.classList.add('code-real');
    } else {
      codeEl.classList.add('code-inline-text');
    }
  });

  // Ajusta links para abrirem em nova aba
  tempDiv.querySelectorAll('a').forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // Converte os nós processados em elementos React
  const children = Array.from(tempDiv.childNodes).map((node, index) => {
    const textContent = node.textContent || '';

    // Renderiza links com o HTML interno (que receberá os estilos definidos em MarkdownStyles > & a)
    if (node.nodeName.toLowerCase() === 'a') {
      return (
        <ContentContainer key={`link-${index}`}>
          <a
            href={node.getAttribute('href')}
            target="_blank"
            rel="noopener noreferrer"
            dangerouslySetInnerHTML={{ __html: node.innerHTML }}
          />
        </ContentContainer>
      );
    }

    // Renderiza vídeos do YouTube
    const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const videoMatch = textContent.match(videoRegex);
    if (videoMatch) {
      return (
        <ContentContainer key={`video-${index}`}>
          {renderVideo(videoMatch[1])}
        </ContentContainer>
      );
    }

    // Renderiza botões de cópia usando a marcação @@
    if (textContent.includes('@@')) {
      const split = textContent.split(/@@(.*?)@@/);
      const processed = split.map((part, i) => {
        if (i % 2 === 0) {
          return part.trim() === '' ? null : (
            <span key={`text-${index}-${i}`} dangerouslySetInnerHTML={createMarkup(marked.parse(part))} />
          );
        }
        return (
          <StyledCopyButton key={`copy-${index}-${i}`} onClick={() => handleCopy(part)}>
            {part}
          </StyledCopyButton>
        );
      });
      return <ContentContainer key={`copy-wrap-${index}`}>{processed}</ContentContainer>;
    }

    // Renderiza imagens
    if (node.nodeName.toLowerCase() === 'img') {
      return (
        <ContentContainer key={`img-${index}`} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
      );
    }

    // Renderização padrão
    return (
      <ContentContainer
        key={`html-${index}`}
        dangerouslySetInnerHTML={createMarkup(node.outerHTML)}
      />
    );
  });

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [children]);

  return (
    <MainContent>
      <ToastContainer autoClose={5000} />
      <MarkdownStyles ref={contentRef}>
        {children}
      </MarkdownStyles>
    </MainContent>
  );
}

export default LivePreviewPage;
