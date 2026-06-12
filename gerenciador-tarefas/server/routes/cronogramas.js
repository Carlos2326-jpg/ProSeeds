const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { autenticar } = require("./auth");

router.get("/", autenticar, async (req, res) => {
  try {
    const [cronogramas] = await db.query(
      "SELECT * FROM Cronograma WHERE usuario_id = ?",
      [req.usuarioId]
    );
    res.json(cronogramas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar cronogramas." });
  }
});

router.post("/", autenticar, async (req, res) => {
  const { disciplina, data_inicio, data_fim, horario_inicio, horario_fim, recorrencia } = req.body;
  try {
    const [disc] = await db.query(
      "SELECT id FROM Disciplina WHERE nome = ? AND usuario_id = ?",
      [disciplina, req.usuarioId]
    );
    const disciplina_id = disc.length ? disc[0].id : null;
    const [result] = await db.query(
      "INSERT INTO Cronograma (usuario_id, disciplina_id, data, hora_inicio, hora_fim, recorrencia) VALUES (?, ?, ?, ?, ?, ?)",
      [req.usuarioId, disciplina_id, data_inicio, horario_inicio, horario_fim, recorrencia || "nenhuma"]
    );
    const [novo] = await db.query("SELECT * FROM Cronograma WHERE id = ?", [result.insertId]);
    res.status(201).json(novo[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar cronograma.", detalhe: err.message });
  }
});

router.put("/:id", autenticar, async (req, res) => {
  const { disciplina, data_inicio, data_fim, horario_inicio, horario_fim, recorrencia } = req.body;
  try {
    const [disc] = await db.query(
      "SELECT id FROM Disciplina WHERE nome = ? AND usuario_id = ?",
      [disciplina, req.usuarioId]
    );
    const disciplina_id = disc.length ? disc[0].id : null;
    await db.query(
      "UPDATE Cronograma SET disciplina_id=?, data=?, hora_inicio=?, hora_fim=?, recorrencia=? WHERE id=? AND usuario_id=?",
      [disciplina_id, data_inicio, horario_inicio, horario_fim, recorrencia || "nenhuma", req.params.id, req.usuarioId]
    );
    const [atualizado] = await db.query("SELECT * FROM Cronograma WHERE id = ?", [req.params.id]);
    res.json(atualizado[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar cronograma." });
  }
});

router.delete("/:id", autenticar, async (req, res) => {
  try {
    await db.query("DELETE FROM Cronograma WHERE id=? AND usuario_id=?", [req.params.id, req.usuarioId]);
    res.json({ mensagem: "Cronograma excluído com sucesso." });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir cronograma." });
  }
});

router.post("/validar-conflito", autenticar, async (req, res) => {
  const { horario_inicio, horario_fim, disciplina } = req.body;
  try {
    const [conflitos] = await db.query(
      "SELECT * FROM Cronograma WHERE usuario_id=? AND hora_inicio < ? AND hora_fim > ?",
      [req.usuarioId, horario_fim, horario_inicio]
    );
    res.json({ conflito: conflitos.length > 0 });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao validar conflito." });
  }
});

module.exports = router;
