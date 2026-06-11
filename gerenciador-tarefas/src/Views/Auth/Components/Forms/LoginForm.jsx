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