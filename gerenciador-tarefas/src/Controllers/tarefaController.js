// ============================================================
// CONTROLLER - Área 2: Tarefas, Subtarefas, Recorrência e Calendário
// Study+
// ============================================================

import {
  tarefas,
  subtarefas,
  cronogramas,
  novaTarefaBase,
  novaSubtarefaBase,
  novoCronogramaBase,
} from "../Services/model.js";

// ============================================================
// TAREFAS
// ============================================================

export const getTarefas = (usuario_id) => {
  return tarefas.filter((t) => t.usuario_id === usuario_id);
};

export const getTarefaPorId = (id) => {
  return tarefas.find((t) => t.id === id);
};

export const criarTarefa = (dados, setTarefas) => {
  const nova = {
    ...novaTarefaBase,
    ...dados,
    id: Date.now(),
    criado_em: new Date().toISOString().split("T")[0],
  };
  setTarefas((prev) => [...prev, nova]);
  return nova;
};

export const editarTarefa = (id, dados, setTarefas) => {
  setTarefas((prev) =>
    prev.map((t) => (t.id === id ? { ...t, ...dados } : t))
  );
};

export const excluirTarefa = (id, setTarefas, setSubtarefas) => {
  setTarefas((prev) => prev.filter((t) => t.id !== id));
  // Remove subtarefas vinculadas
  setSubtarefas((prev) => prev.filter((s) => s.tarefa_id !== id));
};

export const alterarStatusTarefa = (id, novoStatus, setTarefas) => {
  // novoStatus: "pendente" | "em_andamento" | "concluida"
  setTarefas((prev) =>
    prev.map((t) => (t.id === id ? { ...t, status: novoStatus } : t))
  );
};

// ============================================================
// SUBTAREFAS
// ============================================================

export const getSubtarefasPorTarefa = (tarefa_id, subtarefasState) => {
  return subtarefasState.filter((s) => s.tarefa_id === tarefa_id);
};

export const criarSubtarefa = (tarefa_id, titulo, setSubtarefas) => {
  const nova = {
    ...novaSubtarefaBase,
    id: Date.now(),
    tarefa_id,
    titulo,
  };
  setSubtarefas((prev) => [...prev, nova]);
  return nova;
};

export const toggleSubtarefa = (id, setSubtarefas) => {
  setSubtarefas((prev) =>
    prev.map((s) => (s.id === id ? { ...s, concluida: !s.concluida } : s))
  );
};

export const excluirSubtarefa = (id, setSubtarefas) => {
  setSubtarefas((prev) => prev.filter((s) => s.id !== id));
};

// ============================================================
// PROGRESSO DA TAREFA (RF04 / FS08)
// ============================================================

export const calcularProgresso = (tarefa_id, subtarefasState) => {
  const subs = subtarefasState.filter((s) => s.tarefa_id === tarefa_id);
  if (subs.length === 0) return 0;
  const concluidas = subs.filter((s) => s.concluida).length;
  return Math.round((concluidas / subs.length) * 100);
};

// ============================================================
// RECORRÊNCIA E CRONOGRAMA (RF06 / FB05 / FB06)
// ============================================================

export const getCronogramas = (usuario_id, cronogramasState) => {
  return cronogramasState.filter((c) => c.usuario_id === usuario_id);
};

export const criarCronograma = (dados, setCronogramas) => {
  const novo = {
    ...novoCronogramaBase,
    ...dados,
    id: Date.now(),
  };
  setCronogramas((prev) => [...prev, novo]);
  return novo;
};

export const excluirCronograma = (id, setCronogramas) => {
  setCronogramas((prev) => prev.filter((c) => c.id !== id));
};

// Gera datas repetidas baseado na recorrência para exibir no calendário
export const gerarDatasRecorrentes = (cronograma, meses = 3) => {
  const datas = [];
  const inicio = new Date(cronograma.data);
  const fim = new Date();
  fim.setMonth(fim.getMonth() + meses);

  let atual = new Date(inicio);

  while (atual <= fim) {
    datas.push(atual.toISOString().split("T")[0]);

    if (cronograma.recorrencia === "diaria") {
      atual.setDate(atual.getDate() + 1);
    } else if (cronograma.recorrencia === "semanal") {
      atual.setDate(atual.getDate() + 7);
    } else if (cronograma.recorrencia === "mensal") {
      atual.setMonth(atual.getMonth() + 1);
    } else {
      break; // sem recorrência, só uma data
    }
  }

  return datas;
};

// ============================================================
// FILTROS (FS05)
// ============================================================

export const filtrarTarefas = (tarefasState, filtros) => {
  let resultado = [...tarefasState];

  if (filtros.status) {
    resultado = resultado.filter((t) => t.status === filtros.status);
  }
  if (filtros.prioridade) {
    resultado = resultado.filter((t) => t.prioridade === filtros.prioridade);
  }
  if (filtros.disciplina_id) {
    resultado = resultado.filter(
      (t) => t.disciplina_id === filtros.disciplina_id
    );
  }

  return resultado;
};