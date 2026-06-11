import React, { useState } from 'react';
import { LoginForm } from './Components/Forms/LoginForm';
import { RecuperarSenhaForm } from './Components/Forms/RecuperarSenhaForm';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import styles from './Login.css'; // Seus estilos específicos em CSS Module

export const LoginPage = () => {
  const [modoView, setModoView] = useState('login'); // 'login' ou 'recuperar'

  return (
    <div className={styles.containerLogin}>
      <Header />
      <div className={styles.cardLogin}>
        {modoView === 'login' ? (
          <LoginForm onEsqueceuSenha={() => setModoView('recuperar')} />
        ) : (
          <RecuperarSenhaForm onVoltarLogin={() => setModoView('login')} />
        )}
      </div>
      <Footer />
    </div>
  );
};