// ============================================================
// SERVER - Study+
// ============================================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tarefasRoutes = require("./routes/tarefas.js");
const cronogramasRoutes = require("./routes/cronogramas.js");
const authRoutes = require("./routes/auth.js");
const dashboardRoutes = require("./routes/dashboard.js");
const metasRoutes = require("./routes/metas.js");
const sessoesRoutes = require("./routes/sessoes.js");
const disciplinasRoutes = require("./routes/disciplinas.js");
const relatoriosRoutes = require("./routes/relatorios.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tarefas", tarefasRoutes);
app.use("/cronogramas", cronogramasRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/metas", metasRoutes);
app.use("/sessoes", sessoesRoutes);
app.use("/registros-tempo", sessoesRoutes);
app.use("/disciplinas", disciplinasRoutes);
app.use("/relatorios", relatoriosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
