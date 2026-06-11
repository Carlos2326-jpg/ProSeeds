import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Controllers/authController';

// 📌 IMPORTAÇÃO DAS VIEWS (PÁGINAS)
import { LoginPage } from './Pages/Auth/LoginPage';
import { CadastroPage } from './Pages/Cadastro/CadastroPage';
// import DashboardPage from './Pages/Dashboard/DashboardPage';
import TarefasPage from './Pages/Tarefas/TarefasPage';       // 🔥 ATIVADO
import CalendarioPage from './Pages/Calendario/CalendarioPage'; // 🔥 ATIVADO

/**
 * 🔒 Componente de Proteção de Rotas (Controller -> View)
 * Verifica no controlador se o usuário está autenticado.
 */
const RotaProtegida = ({ children }) => {
  const { usuario, loading } = useAuth();

  // Enquanto o Controller checa se existe um token salvo
  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  // Se não houver usuário logado, barra o acesso e joga para o Login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 ROTAS PÚBLICAS */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CadastroPage />} />

        {/* 🔒 ROTAS PROTEGIDAS (Exigem Autenticação) */}
        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <div style={{ padding: '20px' }}><h1>Bem-vindo ao Dashboard!</h1></div>
              {/* <DashboardPage /> */}
            </RotaProtegida>
          }
        />

        <Route
          path="/tarefas"
          element={
            <RotaProtegida>
              <TarefasPage /> {/* 🔥 ATIVADO — Renderiza sua tela de tarefas */}
            </RotaProtegida>
          }
        />

        <Route
          path="/calendario"
          element={
            <RotaProtegida>
              <CalendarioPage /> {/* 🔥 ATIVADO — Renderiza sua tela de calendário */}
            </RotaProtegida>
          }
        />

        <Route
          path="/perfil"
          element={
            <RotaProtegida>
              <div style={{ padding: '20px' }}><h1>Seu Perfil</h1></div>
            </RotaProtegida>
          }
        />

        {/* 🔄 REDIRECIONAMENTOS DE FALLBACK */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Qualquer endereço inválido joga para o login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;