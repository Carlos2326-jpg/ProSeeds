import React, { useState } from 'react';
import { LoginForm } from './Components/Forms/LoginForm';
import { RecuperarSenhaForm } from './Components/Forms/RecuperarSenhaForm';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import styles from './Styles/Login.css'; // Seus estilos específicos em CSS Module

export const LoginPage = () => {
  const [modoView, setModoView] = useState('login'); // 'login' ou 'recuperar'

  return (
    <section className={styles.containerLogin}>
      <Header titulo="Login" />
      <form className={styles.cardLogin}>
        {modoView === 'login' ? (
          <LoginForm onEsqueceuSenha={() => setModoView('recuperar')} />
        ) : (
          <RecuperarSenhaForm onVoltarLogin={() => setModoView('login')} />
        )}
      </form>
      <Footer />
    </section>
  );
};