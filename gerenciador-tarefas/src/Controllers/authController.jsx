import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // Verifica se já existe um token salvo ao carregar o app
  useEffect(() => {
    const verificarSessao = async () => {
      const token = localStorage.getItem('@App:token');

      if (token) {
        try {
          // Se houver token, busca os dados atualizados do usuário
          const dadosUsuario = await authService.getMe();
          setUsuario(dadosUsuario);
        } catch (err) {
          // Se o token estiver expirado, limpa tudo
          handleLogout();
        }
      }
      setLoading(false);
    };

    verificarSessao();
  }, []);

  // Lógica de execução do Login
  const handleLogin = async (email, senha) => {
    setErro('');
    setLoading(true);

    // Validação básica (Regra de Negócio no Front)
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      setLoading(false);
      return false;
    }

    try {
      const data = await authService.login(email, senha);

      // Guarda o token no localStorage para persistir a sessão
      localStorage.setItem('@App:token', data.token);

      // Atualiza o estado com o usuário logado
      setUsuario(data.usuario);

      setLoading(false);
      return true; // Login efetuado com sucesso
    } catch (err) {
      setErro(err);
      setLoading(false);
      return false; // Falha no login
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('@App:token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, erro, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para as Views consumirem o Controller facilmente
export const useAuth = () => useContext(AuthContext);