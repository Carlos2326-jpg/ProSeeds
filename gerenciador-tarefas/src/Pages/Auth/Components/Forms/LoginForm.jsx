import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Controllers/authController';
import Button from '../../../../Components/ui/Button';
import Input from '../../../../Components/ui/Input';
import '../../Styles/LoginForm.css';

export const LoginForm = ({ onEsqueceuSenha }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Consome as funções e estados vindos do Controller
  const { handleLogin, erro, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sucesso = await handleLogin(email, senha);
    if (sucesso) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">

      {erro && <div className="error-message">{erro}</div>}

      <article className="form-group">
        <img src="#" className="img-forms" />

        <Input
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 🔥 Conecta com o useState
        />
      </article>

      <article className="form-group">
        <img src="#" className="img-forms" />

        <Input
          type="password"
          name="senha"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} // 🔥 Conecta com o useState
        />
      </article>

      <Button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Acessar'}
      </Button>

      <article className="form-actions">
        <span onClick={onEsqueceuSenha} style={{ cursor: 'pointer' }}>
          Esqueceu a senha?
        </span>
        <span onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
          Deseja criar uma conta?
        </span>
      </article>
    </form >
  );
};
