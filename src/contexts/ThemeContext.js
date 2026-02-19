// src/contexts/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStorageItem, setStorageItem } from '../utils/storage';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return getStorageItem(STORAGE_KEYS.THEME) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setStorageItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
