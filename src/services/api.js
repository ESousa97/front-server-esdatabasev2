import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Obter CSRF token ao iniciar a aplicação
api.get('/csrf-token')
  .then(response => {
    const csrfToken = response.data.csrfToken;
    // Define o header para todas as requisições
    api.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  })
  .catch(error => {
    console.error('Erro ao obter token CSRF:', error);
  });

// Interceptor para adicionar o token de autenticação se disponível
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor para refresh token (mantém sua lógica existente)
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
