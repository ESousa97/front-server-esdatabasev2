import React, { createContext, useState, useCallback } from 'react';

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((text, type = 'info', duration = 4000) => {
    const id = crypto.randomUUID(); // ID único mais seguro
    const toast = { id, text, type };

    setToasts((prev) => [...prev, toast]);

    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);

    return () => clearTimeout(timeout); // opcional para controle externo
  }, []);

  return (
    <FeedbackContext.Provider value={{ addToast, toasts }}>
      {children}
    </FeedbackContext.Provider>
  );
};
