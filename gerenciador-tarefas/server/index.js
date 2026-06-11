// ============================================================
// SERVER - Study+ Área 2
// ============================================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tarefasRoutes = require("./routes/tarefas.js");
const cronogramasRoutes = require("./routes/cronogramas.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/tarefas", tarefasRoutes);
app.use("/cronogramas", cronogramasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});