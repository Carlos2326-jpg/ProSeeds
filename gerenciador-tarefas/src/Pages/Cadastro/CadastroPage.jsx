import React from "react";
import { useNavigate } from "react-router-dom";
import { RegistroForm } from "./Components/Forms/RegistroForm";
import Header from "../Auth/Components/layout/Header";
import Footer from "../Auth/Components/layout/Footer";

export const CadastroPage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <Header titulo="Cadastro" />
      <div>
        <RegistroForm onVoltarLogin={() => navigate("/login")} />
      </div>
      <Footer />
    </section>
  );
};
