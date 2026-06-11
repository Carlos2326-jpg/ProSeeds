const express = require("express");
const router = express.Router();
const CronogramaModel = require("../models/cronogramaModel.js");

router.get("/", async (req, res) => {
  try {
    const cronogramas = await CronogramaModel.listar(req.query.usuario_id || 1);
    res.json(cronogramas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar cronogramas." });
  }
});

router.post("/", async (req, res) => {
  try {
    const cronograma = await CronogramaModel.criar(req.body);
    res.status(201).json(cronograma);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar cronograma." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cronograma = await CronogramaModel.atualizar(req.params.id, req.body);
    res.json(cronograma);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar cronograma." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await CronogramaModel.excluir(req.params.id);
    res.json({ mensagem: "Cronograma excluído com sucesso." });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir cronograma." });
  }
});

module.exports = router;