// ============================================================
// CARD - Card de Tarefa (seguindo wireframe)
// Study+
// ============================================================

import { useState } from "react";
import {
  toggleSubtarefa,
  excluirSubtarefa,
  criarSubtarefa,
  calcularProgresso,
  alterarStatusTarefa,
  excluirTarefa,
} from "../../Controllers/tarefaController.js";

const TarefaCard = ({
  tarefa,
  disciplinas = [],
  subtarefasState = [],
  setSubtarefas,
  setTarefas,
  onEditar,
}) => {
  const [expandido, setExpandido] = useState(false);
  const [novaSubtarefa, setNovaSubtarefa] = useState("");

  const disciplina = disciplinas.find((d) => d.id === tarefa.disciplina_id);
  const progresso = calcularProgresso(tarefa.id, subtarefasState);
  const subtarefasDaTarefa = subtarefasState.filter(
    (s) => s.tarefa_id === tarefa.id
  );

  const handleAdicionarSubtarefa = () => {
    if (!novaSubtarefa.trim()) return;
    criarSubtarefa(tarefa.id, novaSubtarefa, setSubtarefas);
    setNovaSubtarefa("");
  };

  const handleExcluirTarefa = () => {
    if (window.confirm("Deseja excluir esta tarefa?")) {
      excluirTarefa(tarefa.id, setTarefas, setSubtarefas);
    }
  };

  return (
    <div style={styles.card}>

      {/* Linha principal */}
      <div style={styles.linha}>
        <div style={styles.info}>
          <span style={styles.tituloTarefa}>{tarefa.titulo}</span>
          <div style={styles.detalhes}>
            {tarefa.prazo && (
              <span style={styles.detalheTexto}>📅 {tarefa.prazo}</span>
            )}
            {disciplina && (
              <span style={styles.detalheTexto}>📚 {disciplina.nome}</span>
            )}
            <span style={styles.detalheTexto}>
              🔰 {tarefa.prioridade}
            </span>
          </div>
        </div>

        {/* Status + Botões */}
        <div style={styles.acoes}>
          <select
            style={styles.selectStatus}
            value={tarefa.status}
            onChange={(e) =>
              alterarStatusTarefa(tarefa.id, e.target.value, setTarefas)
            }
          >
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluida">Concluída</option>
          </select>
          <div style={styles.botoes}>
            <button style={styles.btnDeletar} onClick={handleExcluirTarefa}>
              Deletar
            </button>
            <button style={styles.btnEditar} onClick={() => onEditar(tarefa)}>
              Editar
            </button>
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      {subtarefasDaTarefa.length > 0 && (
        <div style={styles.progressoContainer}>
          <div style={styles.progressoBarra}>
            <div
              style={{
                ...styles.progressoFill,
                width: `${progresso}%`,
              }}
            />
          </div>
          <span style={styles.progressoTexto}>{progresso}%</span>
        </div>
      )}

      {/* Toggle subtarefas */}
      {subtarefasDaTarefa.length > 0 && (
        <button
          style={styles.btnExpandir}
          onClick={() => setExpandido(!expandido)}
        >
          {expandido ? "▲ Ocultar subtarefas" : "▼ Ver subtarefas"}
        </button>
      )}

      {/* Subtarefas */}
      {expandido && (
        <div style={styles.subtarefas}>
          {subtarefasDaTarefa.map((sub) => (
            <div key={sub.id} style={styles.subtarefaItem}>
              <input
                type="checkbox"
                checked={sub.concluida}
                onChange={() => toggleSubtarefa(sub.id, setSubtarefas)}
              />
              <span
                style={{
                  ...styles.subtarefaTexto,
                  textDecoration: sub.concluida ? "line-through" : "none",
                  color: sub.concluida ? "#aaa" : "#333",
                }}
              >
                {sub.titulo}
              </span>
              <button
                style={styles.btnExcluirSub}
                onClick={() => excluirSubtarefa(sub.id, setSubtarefas)}
              >
                ✕
              </button>
            </div>
          ))}

          {/* Adicionar subtarefa */}
          <div style={styles.addSubtarefa}>
            <input
              style={styles.inputSub}
              type="text"
              placeholder="Nova subtarefa..."
              value={novaSubtarefa}
              onChange={(e) => setNovaSubtarefa(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdicionarSubtarefa()}
            />
            <button style={styles.btnAddSub} onClick={handleAdicionarSubtarefa}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// ESTILOS
// ============================================================
const styles = {
  card: {
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  linha: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  tituloTarefa: {
    fontWeight: "600",
    fontSize: "0.95rem",
    color: "#222",
  },
  detalhes: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  detalheTexto: {
    fontSize: "0.8rem",
    color: "#555",
  },
  acoes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
  },
  selectStatus: {
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.8rem",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  botoes: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  btnDeletar: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "5px 16px",
    fontWeight: "600",
    fontSize: "0.82rem",
    cursor: "pointer",
  },
  btnEditar: {
    backgroundColor: "#eab308",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "5px 16px",
    fontWeight: "600",
    fontSize: "0.82rem",
    cursor: "pointer",
  },
  progressoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  progressoBarra: {
    flex: 1,
    height: "6px",
    backgroundColor: "#ccc",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressoFill: {
    height: "100%",
    backgroundColor: "#4f46e5",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },
  progressoTexto: {
    fontSize: "0.78rem",
    color: "#666",
  },
  btnExpandir: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.78rem",
    color: "#555",
    textAlign: "left",
    padding: 0,
  },
  subtarefas: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    paddingTop: "8px",
    borderTop: "1px solid #ccc",
  },
  subtarefaItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  subtarefaTexto: {
    fontSize: "0.88rem",
    flex: 1,
  },
  btnExcluirSub: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#ccc",
    fontSize: "0.82rem",
  },
  addSubtarefa: {
    display: "flex",
    gap: "8px",
    marginTop: "4px",
  },
  inputSub: {
    flex: 1,
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.85rem",
  },
  btnAddSub: {
    padding: "6px 14px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default TarefaCard;