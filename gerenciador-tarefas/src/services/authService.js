import api from './api'; // Sua configuração do Axios

export const authService = {
  // Realiza a chamada de login e retorna os dados (Token e Usuário)
  login: async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      return response.data; // Espera-se { token: '...', usuario: { id, nome, email } }
    } catch (error) {
      // Lança o erro para ser capturado e tratado pelo Controller
      throw error.response?.data?.message || 'Erro ao realizar login. Tente novamente.';
    }
  },

  // Busca os dados do usuário logado usando o Token salvo
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Sessão inválida.';
    }
  }
};