import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Controllers/authController';

// Importação das suas páginas (Views)
import { LoginPage } from './Views/Auth/LoginPage';
//import { CadastroPage } from './pages/Cadastro/CadastroPage';
// import { PerfilPage } from './pages/Perfil/PerfilPage';
// import { DashboardPage } from './pages/Dashboard/DashboardPage';

/**
 * 🔒 Componente de Proteção de Rotas (Regra de Negócio na View)
 * Ele verifica no Controller se o usuário está logado.
 * Se não estiver, redireciona imediatamente para o /login.
 */
const RotaProtegida = ({ children }) => {
  const { usuario, loading } = useAuth();

  // Enquanto o Controller checa se existe um token salvo, exibe uma tela de carregamento
  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  // Se não houver usuário logado, barra o acesso e joga para o Login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, permite que o componente filho seja renderizado
  return children;
};

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Rotas Públicas) */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<CadastroPage />} /> */}

        {/* Protected Routes (Rotas Privadas/Protegidas) */}
        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              {/* <DashboardPage /> */}
              <div style={{ padding: '20px' }}><h1>Bem-vindo ao Dashboard! (Logado)</h1></div>
            </RotaProtegida>
          }
        />

        <Route
          path="/perfil"
          element={
            <RotaProtegida>
              {/* <PerfilPage /> */}
              <div style={{ padding: '20px' }}><h1>Seu Perfil (Logado)</h1></div>
            </RotaProtegida>
          }
        />

        {/* Rota de fallback: Qualquer endereço inválido joga para o login ou dashboard */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;