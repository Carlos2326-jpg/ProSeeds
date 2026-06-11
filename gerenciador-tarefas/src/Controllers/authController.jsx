import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../Services/authService';

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

  const handleRegister = async (nome, email, senha, confirmarSenha) => {
    setErro('');
    setLoading(true);

    // Validações de Regra de Negócio no Front-end
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Todos os campos são obrigatórios.');
      setLoading(false);
      return false;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      setLoading(false);
      return false;
    }

    if (senha.length < 6) {
      setErro('A senha deve conter no mínimo 6 caracteres.');
      setLoading(false);
      return false;
    }

    try {
      const data = await authService.register(nome, email, senha);

      // Se o seu back-end já autenticar o usuário direto no cadastro trazendo o token:
      if (data.token && data.usuario) {
        localStorage.setItem('@App:token', data.token);
        setUsuario(data.usuario);
      }

      setLoading(false);
      return true; // Cadastro efetuado com sucesso
    } catch (err) {
      setErro(err);
      setLoading(false);
      return false; // Falha no cadastro
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, erro, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para as Views consumirem o Controller facilmente
export const useAuth = () => useContext(AuthContext);