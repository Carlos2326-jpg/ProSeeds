import React, { useState } from 'react';
import { useAuth } from '../../../../Controllers/authController';
import Button from '../../../../Components/ui/Button';
import Input from '../../../../Components/ui/Input';
import '../../Styles/CadastroPage.css'

export const RegistroForm = ({ onVoltarLogin }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Consome a função de cadastro e estados de controle
  const { handleRegister, erro, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sucesso = await handleRegister(nome, email, senha, confirmarSenha);
    if (sucesso) {
      // Redireciona para o dashboard após o cadastro com sucesso
      window.location.href = '/dashboard';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {erro && <div className="error-message">{erro}</div>}

      <article className="form-group">
        <img src="#" className="img-forms" />

        <Input
          type="text"
          name="nome"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </article>

      <article className="form-group">
        <img src="#" className="img-forms" />

        <Input
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </article>

      <article className="form-group">
        <img src="#" className="img-forms" />

        <Input
          type="password"
          name="senha"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </article>

      <article className="form-group">
        <img src="#" className="img-forms" />

        <Input
          type="password"
          name="confirmarSenha"
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
      </article>

      <Button type="submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar Conta'}
      </Button>

      <article className="form-actions">
        <span onClick={onVoltarLogin} style={{ cursor: 'pointer' }}>
          Já tem uma conta? Acesse aqui
        </span>
      </article>
    </form>
  );
};