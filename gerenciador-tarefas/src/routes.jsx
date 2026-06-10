import { Routes, Route, Navigate } from "react-router-dom";
import TarefasPage from "./Pages/Tarefas/TarefasPage.js";
import CalendarioPage from "./Pages/Calendario/CalendarioPage.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tarefas" />} />
      <Route path="/tarefas" element={<TarefasPage />} />
      <Route path="/calendario" element={<CalendarioPage />} />
    </Routes>
  );
};

export default AppRoutes;