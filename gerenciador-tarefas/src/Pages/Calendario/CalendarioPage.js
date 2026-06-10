// ============================================================
// PAGE - Calendário
// Study+
// ============================================================

import { useState, useEffect } from "react";
import Calendario from "../../Components/Calendario/Calendario.js";
import { cronogramaService, tarefaService } from "../../Services/tarefaService.js";
import { disciplinas } from "../../Services/model.js";

const CalendarioPage = () => {
  const [tarefas, setTarefas] = useState([]);
  const [cronogramas, setCronogramas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [cronogramaEditando, setCronogramaEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const [filtros, setFiltros] = useState({
    disciplina_id: "",
    recorrencia: "",
    status: "",
    data_inicio: "",
    data_fim: "",
    prioridade: "",
  });

  const [form, setForm] = useState({
    disciplina_id: "",
    tarefa_id: "",
    data: "",
    hora_inicio: "",
    hora_fim: "",
    recorrencia: "nenhuma",
  });

  // Carrega tarefas e cronogramas do backend
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const tarefasData = await tarefaService.listar({ usuario_id: 1 });
        setTarefas(tarefasData);
        const cronogramasData = await cronogramaService.listar(1);
        setCronogramas(cronogramasData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setCarregando(false);
      }
    };
    carregarDados();
  }, []);

  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!form.data) return alert("Data é obrigatória!");
    try {
      if (cronogramaEditando) {
        await cronogramaService.atualizar(cronogramaEditando.id, form);
        setCronogramas((prev) =>
          prev.map((c) => (c.id === cronogramaEditando.id ? { ...c, ...form } : c))
        );
      } else {
        const novo = await cronogramaService.criar({ ...form, usuario_id: 1 });
        setCronogramas((prev) => [...prev, novo]);
      }
    } catch (err) {
      console.error("Erro ao salvar cronograma:", err);
      alert("Erro ao salvar cronograma. Verifique se o servidor está rodando.");
    }
    setModalAberto(false);
    setCronogramaEditando(null);
    setForm({ disciplina_id: "", tarefa_id: "", data: "", hora_inicio: "", hora_fim: "", recorrencia: "nenhuma" });
  };

  const handleEditar = (cronograma) => {
    setCronogramaEditando(cronograma);
    setForm({
      disciplina_id: cronograma.disciplina_id,
      tarefa_id: cronograma.tarefa_id,
      data: cronograma.data,
      hora_inicio: cronograma.hora_inicio,
      hora_fim: cronograma.hora_fim,
      recorrencia: cronograma.recorrencia,
    });
    setModalAberto(true);
  };

  const handleExcluir = async (id) => {
    try {
      await cronogramaService.excluir(id);
      setCronogramas((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao excluir cronograma:", err);
      alert("Erro ao excluir cronograma.");
    }
  };

  const cronogramasFiltrados = cronogramas.filter((c) => {
    if (filtros.disciplina_id && c.disciplina_id !== Number(filtros.disciplina_id)) return false;
    if (filtros.recorrencia && c.recorrencia !== filtros.recorrencia) return false;
    return true;
  });

  if (carregando) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p>Carregando calendário...</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        {/* Filtros */}
        <div style={styles.filtros}>
          <div style={styles.filtroLinha}>
            <select style={styles.inputFiltro} name="disciplina_id" value={filtros.disciplina_id} onChange={handleFiltro}>
              <option value="">Disciplina</option>
              {disciplinas.map((d) => (<option key={d.id} value={d.id}>{d.nome}</option>))}
            </select>
            <select style={styles.inputFiltro} name="recorrencia" value={filtros.recorrencia} onChange={handleFiltro}>
              <option value="">Recorrência</option>
              <option value="nenhuma">Nenhuma</option>
              <option value="diaria">Diária</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
            <select style={styles.inputFiltro} name="status" value={filtros.status} onChange={handleFiltro}>
              <option value="">Status</option>
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>
          <div style={styles.filtroLinha}>
            <input style={styles.inputFiltro} type="date" name="data_inicio" value={filtros.data_inicio} onChange={handleFiltro} />
            <input style={styles.inputFiltro} type="date" name="data_fim" value={filtros.data_fim} onChange={handleFiltro} />
            <select style={styles.inputFiltro} name="prioridade" value={filtros.prioridade} onChange={handleFiltro}>
              <option value="">Prioridade</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div style={styles.conteudo}>

          {/* Calendário */}
          <div style={styles.calendarioWrapper}>
            <Calendario tarefas={tarefas} cronogramas={cronogramas} disciplinas={disciplinas} />
          </div>

          {/* Lista de Cronogramas */}
          <div style={styles.listaCronogramas}>
            <div style={styles.listaHeader}>
              <span style={styles.listaTitulo}>Lista{"\n"}Cronogramas</span>
              <button style={styles.btnCriar} onClick={() => { setCronogramaEditando(null); setModalAberto(true); }}>
                Criar
              </button>
            </div>
            <div style={styles.listaItens}>
              {cronogramasFiltrados.length === 0 ? (
                <p style={styles.vazio}>Nenhum cronograma.</p>
              ) : (
                cronogramasFiltrados.map((c) => {
                  const tarefa = tarefas.find((t) => t.id === Number(c.tarefa_id));
                  const disciplina = disciplinas.find((d) => d.id === Number(c.disciplina_id));
                  return (
                    <div key={c.id} style={styles.cronogramaCard}>
                      <div style={styles.cronogramaInfo}>
                        <span style={styles.cronogramaNome}>{tarefa ? tarefa.titulo : "Sem tarefa"}</span>
                        <span style={styles.cronogramaDetalhe}>{disciplina ? disciplina.nome : ""} · {c.recorrencia}</span>
                        <span style={styles.cronogramaDetalhe}>{c.hora_inicio} - {c.hora_fim}</span>
                      </div>
                      <div style={styles.cronogramaBotoes}>
                        <button style={styles.btnDeletar} onClick={() => handleExcluir(c.id)}>Deletar</button>
                        <button style={styles.btnEditar} onClick={() => handleEditar(c)}>Editar</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <span style={styles.modalTitulo}>{cronogramaEditando ? "Editar Cronograma" : "Criar Cronograma"}</span>
            </div>
            <div style={styles.modalForm}>
              <select style={styles.inputModal} name="disciplina_id" value={form.disciplina_id} onChange={handleFormChange}>
                <option value="">Disciplina</option>
                {disciplinas.map((d) => (<option key={d.id} value={d.id}>{d.nome}</option>))}
              </select>
              <select style={styles.inputModal} name="tarefa_id" value={form.tarefa_id} onChange={handleFormChange}>
                <option value="">Tarefa</option>
                {tarefas.map((t) => (<option key={t.id} value={t.id}>{t.titulo}</option>))}
              </select>
              <input style={styles.inputModal} type="date" name="data" value={form.data} onChange={handleFormChange} />
              <div style={styles.linhaModal}>
                <input style={styles.inputModal} type="time" name="hora_inicio" value={form.hora_inicio} onChange={handleFormChange} />
                <input style={styles.inputModal} type="time" name="hora_fim" value={form.hora_fim} onChange={handleFormChange} />
              </div>
              <select style={styles.inputModal} name="recorrencia" value={form.recorrencia} onChange={handleFormChange}>
                <option value="nenhuma">Sem recorrência</option>
                <option value="diaria">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </select>
              <div style={styles.modalBotoes}>
                <button style={styles.btnCriarModal} onClick={handleSalvar}>{cronogramaEditando ? "Salvar" : "Criar"}</button>
                <button style={styles.btnCancelarModal} onClick={() => { setModalAberto(false); setCronogramaEditando(null); }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: { backgroundColor: "#d0d0d0", minHeight: "100vh", padding: "24px", display: "flex", justifyContent: "center" },
  container: { backgroundColor: "#c0c0c0", borderRadius: "12px", width: "100%", maxWidth: "1000px", overflow: "hidden", padding: "16px", display: "flex", flexDirection: "column", gap: "16px" },
  filtros: { display: "flex", flexDirection: "column", gap: "8px" },
  filtroLinha: { display: "flex", gap: "8px" },
  inputFiltro: { flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd", backgroundColor: "#fff", fontSize: "0.88rem", color: "#555" },
  conteudo: { display: "flex", gap: "16px", alignItems: "flex-start" },
  calendarioWrapper: { flex: 2 },
  listaCronogramas: { flex: 1, backgroundColor: "#d8d8d8", borderRadius: "8px", overflow: "hidden" },
  listaHeader: { backgroundColor: "#888", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  listaTitulo: { color: "#fff", fontWeight: "600", fontSize: "0.9rem", whiteSpace: "pre-line" },
  btnCriar: { backgroundColor: "#22c55e", color: "#fff", border: "none", borderRadius: "20px", padding: "6px 20px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem" },
  listaItens: { padding: "12px", display: "flex", flexDirection: "column", gap: "8px" },
  vazio: { color: "#888", fontSize: "0.85rem", textAlign: "center", padding: "20px 0" },
  cronogramaCard: { backgroundColor: "#e8e8e8", borderRadius: "6px", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" },
  cronogramaInfo: { display: "flex", flexDirection: "column", gap: "2px", flex: 1 },
  cronogramaNome: { fontSize: "0.88rem", fontWeight: "600", color: "#222" },
  cronogramaDetalhe: { fontSize: "0.75rem", color: "#666" },
  cronogramaBotoes: { display: "flex", flexDirection: "column", gap: "4px" },
  btnDeletar: { backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "20px", padding: "4px 14px", fontWeight: "600", fontSize: "0.78rem", cursor: "pointer" },
  btnEditar: { backgroundColor: "#eab308", color: "#fff", border: "none", borderRadius: "20px", padding: "4px 14px", fontWeight: "600", fontSize: "0.78rem", cursor: "pointer" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { backgroundColor: "#fff", borderRadius: "12px", width: "100%", maxWidth: "420px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
  modalHeader: { backgroundColor: "#888", padding: "12px 20px" },
  modalTitulo: { color: "#fff", fontWeight: "600", fontSize: "1rem" },
  modalForm: { padding: "20px", display: "flex", flexDirection: "column", gap: "12px" },
  inputModal: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "0.9rem", width: "100%", boxSizing: "border-box" },
  linhaModal: { display: "flex", gap: "12px" },
  modalBotoes: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" },
  btnCriarModal: { padding: "12px", borderRadius: "20px", border: "none", backgroundColor: "#22c55e", color: "#fff", fontWeight: "700", fontSize: "1rem", cursor: "pointer" },
  btnCancelarModal: { padding: "12px", borderRadius: "20px", border: "none", backgroundColor: "#ef4444", color: "#fff", fontWeight: "700", fontSize: "1rem", cursor: "pointer" },
};

export default CalendarioPage;