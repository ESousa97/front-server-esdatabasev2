import axios from 'axios';

// Use a variável de ambiente; se não estiver definida, usa "/api" (útil para desenvolvimento local)
const baseURL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Interceptador para adicionar o token se disponível
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await api.post('/auth/refresh', { refreshToken });
        localStorage.setItem('accessToken', res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (_err) {
        console.error('Refresh token falhou');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
