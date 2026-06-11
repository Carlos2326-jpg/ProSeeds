// ============================================================
// FORM - Modal Criar / Editar Tarefa (seguindo wireframe)
// Study+
// ============================================================

import { useState, useEffect } from "react";

const TarefaForm = ({ tarefaExistente = null, disciplinas = [], onSalvar, onCancelar }) => {
  const [form, setForm] = useState({
    titulo: "",
    disciplina_id: "",
    descricao: "",
    prioridade: "media",
    status: "pendente",
    prazo: "",
    recorrente: false,
  });

  const [novaSubtarefa, setNovaSubtarefa] = useState("");
  const [subtarefasForm, setSubtarefasForm] = useState([]);

  useEffect(() => {
    if (tarefaExistente) {
      setForm({
        titulo: tarefaExistente.titulo || "",
        disciplina_id: tarefaExistente.disciplina_id || "",
        descricao: tarefaExistente.descricao || "",
        prioridade: tarefaExistente.prioridade || "media",
        status: tarefaExistente.status || "pendente",
        prazo: tarefaExistente.prazo || "",
        recorrente: tarefaExistente.recorrente || false,
      });
    }
  }, [tarefaExistente]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdicionarSubtarefa = () => {
    if (!novaSubtarefa.trim()) return;
    setSubtarefasForm((prev) => [
      ...prev,
      { id: Date.now(), titulo: novaSubtarefa, concluida: false },
    ]);
    setNovaSubtarefa("");
  };

  const handleRemoverSubtarefa = (id) => {
    setSubtarefasForm((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo.trim()) return alert("Título é obrigatório!");

    // Monta o payload final tratando os tipos de dados para o MySQL
    const dadosFormatados = {
      ...form,
      // Se tiver vazio, envia null. Se tiver selecionado, força virar um Número Inteiro.
      disciplina_id: form.disciplina_id === "" ? null : parseInt(form.disciplina_id, 10),
    };

    // Repassa os dados já higienizados para a TarefasPage processar
    onSalvar(dadosFormatados, subtarefasForm);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        {/* Cabeçalho */}
        <div style={styles.header}>
          <span style={styles.headerTitulo}>
            {tarefaExistente ? "Editar Tarefa" : "Criar Tarefa"}
          </span>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Linha 1 — Título + Disciplina */}
          <div style={styles.linha}>
            <input
              style={styles.input}
              type="text"
              name="titulo"
              placeholder="Título"
              value={form.titulo}
              onChange={handleChange}
            />
            <select
              style={styles.input}
              name="disciplina_id"
              value={form.disciplina_id}
              onChange={handleChange}
            >
              <option value="">Disciplina</option>
              {disciplinas.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Linha 2 — Descrição */}
          <textarea
            style={styles.textarea}
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            rows={3}
          />

          {/* Linha 3 — Prioridade + Status */}
          <div style={styles.linha}>
            <select
              style={styles.input}
              name="prioridade"
              value={form.prioridade}
              onChange={handleChange}
            >
              <option value="">Prioridade</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
            <select
              style={styles.input}
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="">Status</option>
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>

          {/* Linha 4 — Subtarefas + Prazo */}
          <div style={styles.linha}>
            <div style={styles.subtarefasBox}>
              <div style={styles.subtarefasInput}>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  type="text"
                  placeholder="Subtarefas"
                  value={novaSubtarefa}
                  onChange={(e) => setNovaSubtarefa(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdicionarSubtarefa())}
                />
                <button
                  type="button"
                  style={styles.btnAddSub}
                  onClick={handleAdicionarSubtarefa}
                >
                  +
                </button>
              </div>
              {subtarefasForm.map((s) => (
                <div key={s.id} style={styles.subtarefaItem}>
                  <span style={styles.subtarefaTexto}>• {s.titulo}</span>
                  <button
                    type="button"
                    style={styles.btnRemoverSub}
                    onClick={() => handleRemoverSubtarefa(s.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div style={styles.prazoBox}>
              <input
                style={styles.input}
                type="date"
                name="prazo"
                placeholder="Prazo"
                value={form.prazo}
                onChange={handleChange}
              />

              {/* Recorrente */}
              <label style={styles.checkLabel}>
                <input
                  type="checkbox"
                  name="recorrente"
                  checked={form.recorrente}
                  onChange={handleChange}
                />
                Recorrente
              </label>
            </div>
          </div>

          {/* Botões */}
          <div style={styles.botoes}>
            <button type="submit" style={styles.btnCriar}>
              {tarefaExistente ? "Salvar" : "Criar"}
            </button>
            <button type="button" style={styles.btnCancelar} onClick={onCancelar}>
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// ============================================================
// ESTILOS
// ============================================================
const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  header: {
    backgroundColor: "#888",
    padding: "12px 20px",
  },
  headerTitulo: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
  },
  form: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  linha: {
    display: "flex",
    gap: "12px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.9rem",
    backgroundColor: "#fff",
  },
  textarea: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.9rem",
    resize: "vertical",
    fontFamily: "inherit",
  },
  subtarefasBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  subtarefasInput: {
    display: "flex",
    gap: "6px",
  },
  btnAddSub: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
  subtarefaItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.85rem",
    color: "#444",
  },
  subtarefaTexto: {
    flex: 1,
  },
  btnRemoverSub: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#ccc",
    fontSize: "0.8rem",
  },
  prazoBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.88rem",
    color: "#555",
    cursor: "pointer",
  },
  botoes: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "4px",
  },
  btnCriar: {
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#22c55e",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
  },
  btnCancelar: {
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default TarefaForm;