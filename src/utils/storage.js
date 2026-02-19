const hasStorage = () => typeof window !== 'undefined' && !!window.localStorage;

export const getStorageItem = (key) => {
  if (!hasStorage()) return null;
  return window.localStorage.getItem(key);
};

export const setStorageItem = (key, value) => {
  if (!hasStorage()) return;
  window.localStorage.setItem(key, value);
};

export const removeStorageItem = (key) => {
  if (!hasStorage()) return;
  window.localStorage.removeItem(key);
};

export const getJsonStorageItem = (key, fallback = null) => {
  const value = getStorageItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
};
