<<<<<<< HEAD
import React, { useState } from 'react';
import { useAuth } from '../../../../Controllers/authController';
import Button from '../../../../Components/ui/Button';
import Input from '../../../../Components/ui/Input';
import '../../Styles/LoginForm.css';

export const LoginForm = ({ onEsqueceuSenha }) => {
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
        <span>
          Deseja criar uma conta?
        </span>
      </article>
    </form>
  );
};
=======
import Input from "../Ui/Input";
import Button from "../../../../Components/ui/Button";
import "../../Styles/LoginForm.css";

function LoginForm() {
  return (
    <section className="forms">
      <article className="input-group">
        <img src="../../Images/usuario-do-circulo.png" alt="" className="img-forms" />
        <Input
          id="username"
          type="text"
          name="username"
          label="Usuário:"
          placeholder="Digite seu usuário"
          required
        />
      </article>

      <article className="input-group">
        <img src="../../Images/trancar.png" alt="" className="img-forms" />
        <Input
          id="password"
          type="password"
          name="password"
          label="Senha:"
          placeholder="Digite sua senha"
          required
        />
      </article>

      <Button
        text="Entrar"
        type="submit"
        imgSrc="../../Images/entrar.png"
        imgPosition="right"
      />

      <article className="article-group">
        <a href="#">Esqueceu sua senha?</a>

        <a href="#">Deseja se cadastrar?</a>
      </article>
    </section>
  );
}

export default LoginForm;
>>>>>>> d4c0fed24bcc47a443a87c4fdb6fe4b57be81bec
