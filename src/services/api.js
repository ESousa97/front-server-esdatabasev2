import axios from 'axios';

// Obtém a URL base da variável de ambiente ou usa o fallback
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL,
  withCredentials: true, // importante para enviar cookies (CSRF, refreshToken, etc.)
});

// Obtém o token CSRF ao iniciar a aplicação
api.get('/csrf-token')
  .then(response => {
    // Extrai o token retornado pela rota
    const csrfToken = response.data.csrfToken;

    // Define o header para todas as próximas requisições
    api.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  })
  .catch(error => {
    console.error('Erro ao obter token CSRF:', error);
  });

// Interceptor para adicionar o token de autenticação, se existir
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
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
        const refreshToken = localStorage.getItem('refreshToken');
        // Pede um novo accessToken
        const res = await api.post('/auth/refresh', { refreshToken });
        // Armazena o novo accessToken
        localStorage.setItem('accessToken', res.data.accessToken);
        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        // Refaz a requisição original com o token atualizado
        return api(originalRequest);
      } catch (_err) {
        console.error('Refresh token falhou');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Recarrega a aplicação para forçar novo login
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
