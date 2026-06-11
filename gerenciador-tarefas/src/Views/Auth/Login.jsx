import Header from "./Components/layout/Header";
import LoginForm from "./Components/Forms/LoginForm";
import Footer from "./Components/layout/Footer"

function Login() {
  return (
    <section className="login-container">
      <Header />
      <LoginForm />
      <Footer />
    </section>
  );
}

export default Login;