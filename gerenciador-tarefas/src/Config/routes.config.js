import TarefasPage from "../Pages/Tarefas/TarefasPage.js";
import CalendarioPage from "../Pages/Calendario/CalendarioPage.js";

const rotasArea2 = [
  {
    path: "/tarefas",
    element: <TarefasPage />,
  },
  {
    path: "/calendario",
    element: <CalendarioPage />,
  },
];

export default rotasArea2;