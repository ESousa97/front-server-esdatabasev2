//src/services/api.js

import axios from 'axios';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { logger } from '../utils/logger';

// Obtém a URL base da variável de ambiente ou usa o fallback
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
const REQUEST_TIMEOUT_MS = 15000;

const api = axios.create({
  baseURL,
  timeout: REQUEST_TIMEOUT_MS,
  withCredentials: true,
});

const bootstrapCsrfToken = async () => {
  try {
    const response = await api.get('/csrf-token');
    const csrfToken = response?.data?.csrfToken;
    if (csrfToken) {
      api.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    }
  } catch (error) {
    logger.warn('Não foi possível obter token CSRF na inicialização.', error);
  }
};

bootstrapCsrfToken();

// Interceptor para adicionar o token de autenticação, se existir
api.interceptors.request.use(config => {
  const token = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token (mantém a lógica existente)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    // Se receber 401 e ainda não tentou refresh
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
          return Promise.reject(err);
        }
        // Pede um novo accessToken
        const res = await api.post('/auth/refresh', { refreshToken });
        // Armazena o novo accessToken
        setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, res.data.accessToken);
        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        // Refaz a requisição original com o token atualizado
        return api(originalRequest);
      } catch (_err) {
        logger.error('Refresh token falhou. Encerrando sessão.');
        removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
        removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
        // Recarrega a aplicação para forçar novo login
        if (typeof window !== 'undefined') {
          window.location.assign('/login');
        }
      }
    }
    return Promise.reject(err);
  }
);

export default api;
