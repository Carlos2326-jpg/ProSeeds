const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { autenticar } = require("./auth");

// GET /relatorios/produtividade
router.get("/produtividade", autenticar, async (req, res) => {
  try {
    const [sessoes] = await db.query(
      "SELECT * FROM SessaoEstudo WHERE usuario_id = ?",
      [req.usuarioId]
    );
    const totalMinutos = sessoes.reduce((acc, s) => acc + (s.duracao_minutos || 0), 0);
    res.json({
      totalHoras: +(totalMinutos / 60).toFixed(1),
      totalSessoes: sessoes.length,
      sessoes,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro interno.", erro: err.message });
  }
});

// GET /relatorios/graficos
router.get("/graficos", autenticar, async (req, res) => {
  try {
    const [sessoes] = await db.query(
      "SELECT * FROM SessaoEstudo WHERE usuario_id = ?",
      [req.usuarioId]
    );
    const [metas] = await db.query(
      "SELECT * FROM Meta WHERE usuario_id = ?",
      [req.usuarioId]
    );

    const porDisciplina = sessoes.reduce((acc, s) => {
      if (!acc[s.disciplina]) acc[s.disciplina] = 0;
      acc[s.disciplina] += s.duracao_minutos || 0;
      return acc;
    }, {});

    const barras = Object.entries(porDisciplina).map(([disciplina, minutos]) => ({
      disciplina,
      horas: +(minutos / 60).toFixed(1),
    }));

    const pizza = barras.map((item) => ({
      name: item.disciplina,
      value: item.horas,
    }));

    const progresso = metas.map((meta) => ({
      disciplina: meta.disciplina,
      alvo: meta.carga_horaria_alvo,
      cumprido: meta.horas_cumpridas,
      percentual: Math.min(
        100,
        Math.round((meta.horas_cumpridas / meta.carga_horaria_alvo) * 100)
      ),
    }));

    res.json({ barras, pizza, progresso });
  } catch (err) {
    res.status(500).json({ message: "Erro interno.", erro: err.message });
  }
});

module.exports = router;
