// ============================================================
// PAGE - Página Principal de Tarefas
// Study+
// ============================================================

import { useState, useEffect } from "react";
import TarefaList from "../../Components/Tarefas/TarefaList.js";
import TarefaForm from "../../Components/Forms/TarefaForm.js";
import { tarefaService, subtarefaService } from "../../Services/tarefaService.js";
import { disciplinas } from "../../Services/model.js";

const TarefasPage = () => {
  const [tarefas, setTarefas] = useState([]);
  const [subtarefas, setSubtarefas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Carrega tarefas e subtarefas do backend ao abrir a página
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const tarefasData = await tarefaService.listar({ usuario_id: 1 });
        setTarefas(tarefasData);

        // Carrega subtarefas de cada tarefa
        const todasSubtarefas = [];
        for (const tarefa of tarefasData) {
          const subs = await subtarefaService.listarPorTarefa(tarefa.id);
          todasSubtarefas.push(...subs);
        }
        setSubtarefas(todasSubtarefas);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const handleNovaTarefa = () => {
    setTarefaEditando(null);
    setModalAberto(true);
  };

  const handleEditar = (tarefa) => {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  };

  const handleSalvar = async (dados, subtarefasForm = []) => {
    try {
      if (tarefaEditando) {
        await tarefaService.atualizar(tarefaEditando.id, dados);
        setTarefas((prev) =>
          prev.map((t) => (t.id === tarefaEditando.id ? { ...t, ...dados } : t))
        );
      } else {
        const novaTarefa = await tarefaService.criar({ ...dados, usuario_id: 1 });
        setTarefas((prev) => [...prev, novaTarefa]);

        // Salva subtarefas no backend
        for (const s of subtarefasForm) {
          const novaSub = await subtarefaService.criar(novaTarefa.id, s.titulo);
          setSubtarefas((prev) => [...prev, novaSub]);
        }
      }
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
      alert("Erro ao salvar tarefa. Verifique se o servidor está rodando.");
    }

    setModalAberto(false);
    setTarefaEditando(null);
  };

  const handleCancelar = () => {
    setModalAberto(false);
    setTarefaEditando(null);
  };

  if (carregando) {
    return (
      <div style={styles.carregando}>
        <p>Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <TarefaList
        tarefas={tarefas}
        disciplinas={disciplinas}
        subtarefasState={subtarefas}
        setSubtarefas={setSubtarefas}
        setTarefas={setTarefas}
        onEditar={handleEditar}
        onNovaTarefa={handleNovaTarefa}
      />
      {modalAberto && (
        <TarefaForm
          tarefaExistente={tarefaEditando}
          disciplinas={disciplinas}
          onSalvar={handleSalvar}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#d0d0d0",
  },
  carregando: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontSize: "1rem",
    color: "#555",
  },
};

export default TarefasPage;