import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Controllers/authController';

// 📌 IMPORTAÇÃO DAS VIEWS (PÁGINAS)
import { LoginPage } from './Pages/Auth/LoginPage';
import { CadastroPage } from './Pages/Cadastro/CadastroPage';

// 🔑 Páginas do Fluxo de Recuperação de Senha
import { RecuperarSenhaPage } from './Pages/Auth/RecuperarSenhaPage'; // Passo 1: Pede E-mail
import { ValidarCodigoPage } from './Pages/Auth/ValidarCodigoPage';   // Passo 2: Pede Código
import { ResetarSenhaPage } from './Pages/Auth/ResetarSenhaPage';     // Passo 3: Altera a Senha

// 📊 Páginas Internas (Protegidas)
import DashboardPage from './Pages/Dashboard/DashboardPage'; // 🔥 IMPORTAÇÃO ATIVADA AQUI
import TarefasPage from './Pages/Tarefas/TarefasPage';
import CalendarioPage from './Pages/Calendario/CalendarioPage';

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

        {/* 🔄 Fluxo de Recuperação de Senha Separado por Telas */}
        <Route path="/forgot-password" element={<RecuperarSenhaPage />} />
        <Route path="/validate-code" element={<ValidarCodigoPage />} />
        <Route path="/reset-password" element={<ResetarSenhaPage />} />

        {/* 🔒 ROTAS PROTEGIDAS (Exigem Autenticação) */}
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