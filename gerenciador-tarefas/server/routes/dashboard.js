const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { autenticar } = require("./auth");

router.get("/metrica", autenticar, async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const [tarefas] = await db.query(
      "SELECT status FROM Tarefa WHERE usuario_id = ?",
      [usuarioId]
    );

    const totalTarefas = tarefas.length;
    const concluidas = tarefas.filter((t) => t.status === "concluida").length;

    const [cronogramas] = await db.query(
      "SELECT * FROM Cronograma WHERE usuario_id = ? AND data >= CURDATE() ORDER BY data ASC LIMIT 5",
      [usuarioId]
    );

    const proximosEventos = cronogramas.map((c) => ({
      id: c.id,
      titulo: `Estudo - ${c.hora_inicio} às ${c.hora_fim}`,
      data: c.data,
    }));

    res.json({ totalTarefas, concluidas, proximosEventos });
  } catch (err) {
    res.status(500).json({ message: "Erro interno.", erro: err.message });
  }
});

module.exports = router;
