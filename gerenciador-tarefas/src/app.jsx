import React from 'react';
import { AuthProvider } from './Controllers/authController';
import RouterComponent from './routes'; // Importa o seu arquivo unificado com BrowserRouter

function App() {
  return (
    <AuthProvider>
      <RouterComponent />
    </AuthProvider>
  );
}

export default App;