import React from 'react';
import { AuthProvider } from './Controllers/authController';
import Router from './routes'; // Seu arquivo de rotas atual

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;