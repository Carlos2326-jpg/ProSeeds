import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistroForm } from './Components/Forms/RegistroForm';
import Header from '../Auth/Components/layout/Header';
import Footer from '../Auth/Components/layout/Footer';
import styles from '../Auth/Styles/Login.css'; // Reaproveitando a estrutura de grid do card

export const CadastroPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.containerLogin}>
      <Header titulo="Cadastro" />
      <form className={styles.cardLogin}>
        <RegistroForm onVoltarLogin={() => navigate('/login')} />
      </form>
      <Footer />
    </section>
  );
};