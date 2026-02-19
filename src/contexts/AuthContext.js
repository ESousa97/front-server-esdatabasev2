//src/contexts/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { removeStorageItem, getStorageItem } from '../utils/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    () => !!getStorageItem(STORAGE_KEYS.ACCESS_TOKEN)
  );

  const login = () => setAuthenticated(true);
  const logout = () => {
    removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
