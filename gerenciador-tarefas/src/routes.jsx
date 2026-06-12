import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Controllers/authController";

// Auth
import { LoginPage } from "./Pages/Auth/LoginPage";
import { CadastroPage } from "./Pages/Cadastro/CadastroPage";
import { RecuperarSenhaPage } from "./Pages/Auth/RecuperarSenhaPage";
import { ValidarCodigoPage } from "./Pages/Auth/ValidarCodigoPage";
import { ResetarSenhaPage } from "./Pages/Auth/ResetarSenhaPage";

// Páginas internas
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import TarefasPage from "./Pages/Tarefas/TarefasPage";
import CalendarioPage from "./Pages/Calendario/CalendarioPage";

// Área 3
import Temporizador from "./Pages/Temporizador";
import Metas from "./Pages/Metas";
import Progresso from "./Pages/Progresso";
import Planejamento from "./Pages/Planejamento";
import Navbar from "./Components/layout/Navbar";

const RotaProtegida = ({ children }) => {
  const { usuario, loading } = useAuth();
  if (loading) return <div className="loading-screen">Carregando...</div>;
  if (!usuario) return <Navigate to="/login" replace />;
  return children;
};

const RotaProtegidaComNav = ({ children }) => {
  return (
    <RotaProtegida>
      <Navbar />
      {children}
    </RotaProtegida>
  );
};

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CadastroPage />} />
        <Route path="/forgot-password" element={<RecuperarSenhaPage />} />
        <Route path="/validate-code" element={<ValidarCodigoPage />} />
        <Route path="/reset-password" element={<ResetarSenhaPage />} />

        {/* Rotas protegidas — Áreas 1 e 2 */}
        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <DashboardPage />
            </RotaProtegida>
          }
        />
        <Route
          path="/tarefas"
          element={
            <RotaProtegida>
              <TarefasPage />
            </RotaProtegida>
          }
        />
        <Route
          path="/calendario"
          element={
            <RotaProtegida>
              <CalendarioPage />
            </RotaProtegida>
          }
        />
        <Route
          path="/perfil"
          element={
            <RotaProtegida>
              <div style={{ padding: "20px" }}>
                <h1>Seu Perfil</h1>
              </div>
            </RotaProtegida>
          }
        />

        {/* Rotas protegidas — Área 3 */}
        <Route
          path="/temporizador"
          element={
            <RotaProtegidaComNav>
              <Temporizador />
            </RotaProtegidaComNav>
          }
        />
        <Route
          path="/metas"
          element={
            <RotaProtegidaComNav>
              <Metas />
            </RotaProtegidaComNav>
          }
        />
        <Route
          path="/progresso"
          element={
            <RotaProtegidaComNav>
              <Progresso />
            </RotaProtegidaComNav>
          }
        />
        <Route
          path="/planejamento"
          element={
            <RotaProtegidaComNav>
              <Planejamento />
            </RotaProtegidaComNav>
          }
        />

        {/* Fallbacks */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
