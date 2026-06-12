import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Controllers/authController";
import Login from "./Views/Auth/Login";
import Temporizador from "./Pages/Temporizador";
import Metas from "./Pages/Metas";
import Progresso from "./Pages/Progresso";
import Planejamento from "./Pages/Planejamento";
import Navbar from "./Components/layout/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/temporizador" element={<Temporizador />} />
                  <Route path="/metas" element={<Metas />} />
                  <Route path="/progresso" element={<Progresso />} />
                  <Route path="/planejamento" element={<Planejamento />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
