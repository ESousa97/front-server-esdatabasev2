import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Container principal – usa a cor de fundo definida na paleta
export const MainContent = styled('div')(() => ({
  maxWidth: '90%',
  margin: '0 auto',
  padding: '16px',
  backgroundColor: 'var(--color-bg)',
}));

// Estilos para o conteúdo renderizado, com marcações e efeitos
export const MarkdownStyles = styled('div')(({ theme }) => ({
  '& h1': {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing(1.5),
    color: 'var(--color-heading)',
    borderBottom: `2px solid var(--color-border)`,
    paddingBottom: theme.spacing(0.5),
  },
  '& h2': {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.25),
    color: 'var(--color-heading)',
  },
  '& h3': {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: 'var(--color-heading)',
  },
  '& p': {
    fontSize: '1rem',
    lineHeight: 1.7,
    marginBottom: theme.spacing(1),
    color: 'var(--color-text)',
  },
  // Estilização dos links – efeito de sublinhado animado
  '& a': {
    textDecoration: 'none',
    position: 'relative',
    color: 'var(--color-link)',
    fontWeight: 600,
    transition: 'color 0.3s ease-in-out',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -2,
      height: 2,
      width: 0,
      backgroundColor: 'var(--color-link)',
      transition: 'width 0.3s ease-in-out',
    },
    '&:hover': {
      color: theme.palette.mode === 'light' ? '#3b82f6' : '#93c5fd',
      '&::after': {
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#3b82f6' : '#93c5fd',
      },
    },
    '&:focus': {
      outline: '2px dashed var(--color-link)',
      outlineOffset: '4px',
    },
  },
  '& img': {
    maxWidth: '1000px',
    width: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  // Estilo para os trechos destacados usando :::content:::
  '& .highlight-text': {
    backgroundColor: theme.palette.mode === 'dark' ? '#232323' : '#f1f1f1',
    color: theme.palette.mode === 'dark' ? '#4dd0e1' : '#c62828',
    fontFamily: 'inherit',
    fontStyle: 'italic',
    fontWeight: 'bold',
    padding: '2px 6px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    border: `1px dashed ${theme.palette.divider}`,
    display: 'inline-block',
  },
  '& code': {
    backgroundColor: 'var(--color-neutral)', // você pode definir no index.css ex: #8a91c1
    color: 'var(--color-badge-text)',         // ex: #1e3a8a ou similar
    fontFamily: 'monospace',
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 500,
    wordBreak: 'break-word',
    display: 'inline-block',
    margin: '0 2px',
  },

}));

// Container para blocos de conteúdo individuais
export const ContentContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 0),
  lineHeight: 1.5,
  color: 'var(--color-text)',
}));

// Botão para copiar texto, usando a cor de sucesso
export const StyledCopyButton = styled(Button)(() => ({
  borderRadius: '8px',
  padding: '6px 12px',
  margin: '4px',
  backgroundColor: 'var(--color-success)',
  color: '#fff',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2ea68a',
  },
}));
