import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Views/Auth/Login";
import Temporizador from "./Pages/Temporizador";
import Metas from "./Pages/Metas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/temporizador" element={<Temporizador />} />
        <Route path="/metas" element={<Metas />} />
      </Routes>
    </Router>
  );
}

export default App;
