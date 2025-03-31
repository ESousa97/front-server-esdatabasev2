// src/components/Layout/Header.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header({ onLogout }) {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <header style={{
      background: 'var(--color-bg)',
      borderBottom: '1px solid var(--color-border)',
      color: 'var(--color-text)',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>Projmanage</h1>
      <nav>
        <button onClick={toggleTheme} style={{ marginRight: '1rem' }}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <button onClick={onLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
