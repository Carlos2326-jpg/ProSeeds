// ============================================================
// LIST - Lista de Tarefas (seguindo wireframe)
// Study+
// ============================================================

import { useState } from "react";
import TarefaCard from "./TarefaCard.js";
import { filtrarTarefas } from "../../Controllers/tarefaController.js";

const TarefaList = ({
  tarefas = [],
  disciplinas = [],
  subtarefasState = [],
  setSubtarefas,
  setTarefas,
  onEditar,
  onNovaTarefa,
}) => {
  const [filtros, setFiltros] = useState({
    titulo: "",
    status: "",
    data_inicio: "",
    data_fim: "",
    prioridade: "",
  });

  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const tarefasFiltradas = filtrarTarefas(tarefas, filtros);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        {/* Cabeçalho */}
        <div style={styles.header}>
          <span style={styles.titulo}>Lista De Tarefas</span>
          <button style={styles.btnCriar} onClick={onNovaTarefa}>
            Criar
          </button>
        </div>

        {/* Filtros */}
        <div style={styles.filtros}>
          <div style={styles.filtroLinha}>
            <input
              style={styles.inputFiltro}
              type="text"
              name="titulo"
              placeholder="Tarefa"
              value={filtros.titulo}
              onChange={handleFiltro}
            />
            <select
              style={styles.inputFiltro}
              name="status"
              value={filtros.status}
              onChange={handleFiltro}
            >
              <option value="">Status</option>
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>
          <div style={styles.filtroLinha}>
            <input
              style={{ ...styles.inputFiltro, flex: 1 }}
              type="date"
              name="data_inicio"
              placeholder="Data Início"
              value={filtros.data_inicio}
              onChange={handleFiltro}
            />
            <input
              style={{ ...styles.inputFiltro, flex: 1 }}
              type="date"
              name="data_fim"
              placeholder="Data Término"
              value={filtros.data_fim}
              onChange={handleFiltro}
            />
            <select
              style={styles.inputFiltro}
              name="prioridade"
              value={filtros.prioridade}
              onChange={handleFiltro}
            >
              <option value="">Prioridade</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>

        {/* Lista */}
        {tarefasFiltradas.length === 0 ? (
          <div style={styles.vazio}>
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        ) : (
          <div style={styles.lista}>
            {tarefasFiltradas.map((tarefa) => (
              <TarefaCard
                key={tarefa.id}
                tarefa={tarefa}
                disciplinas={disciplinas}
                subtarefasState={subtarefasState}
                setSubtarefas={setSubtarefas}
                setTarefas={setTarefas}
                onEditar={onEditar}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

// ============================================================
// ESTILOS
// ============================================================
const styles = {
  wrapper: {
    backgroundColor: "#d0d0d0",
    minHeight: "100vh",
    padding: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  container: {
    backgroundColor: "#b0b0b0",
    borderRadius: "12px",
    padding: "0",
    width: "100%",
    maxWidth: "780px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#888",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  btnCriar: {
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 28px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
  },
  filtros: {
    backgroundColor: "#c8c8c8",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filtroLinha: {
    display: "flex",
    gap: "8px",
  },
  inputFiltro: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "0.88rem",
    color: "#555",
  },
  lista: {
    padding: "12px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  vazio: {
    textAlign: "center",
    padding: "40px",
    color: "#666",
    fontSize: "0.95rem",
  },
};

export default TarefaList;