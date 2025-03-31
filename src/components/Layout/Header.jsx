import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import './Header.css';

function Header({ onLogout }) {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1 className="header-title">Projmanage</h1>
      <nav className="header-nav">
        <button className="header-btn theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <button className="header-btn logout-btn" onClick={onLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
