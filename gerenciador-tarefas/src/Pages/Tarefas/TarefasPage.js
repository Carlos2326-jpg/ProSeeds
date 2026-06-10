// ============================================================
// PAGE - Página Principal de Tarefas (atualizada)
// Study+
// ============================================================

import { useState } from "react";
import TarefaList from "../../Components/Tarefas/TarefaList.js";
import TarefaForm from "../../Components/Forms/TarefaForm.js";
import {
  criarTarefa,
  editarTarefa,
  criarSubtarefa,
} from "../../Controllers/tarefaController.js";
import {
  tarefas as tarefasIniciais,
  subtarefas as subtarefasIniciais,
  disciplinas,
} from "../../Services/model.js";

const TarefasPage = () => {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [subtarefas, setSubtarefas] = useState(subtarefasIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);

  const handleNovaTarefa = () => {
    setTarefaEditando(null);
    setModalAberto(true);
  };

  const handleEditar = (tarefa) => {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  };

  const handleSalvar = (dados, subtarefasForm = []) => {
    if (tarefaEditando) {
      editarTarefa(tarefaEditando.id, dados, setTarefas);
    } else {
      const novaTarefa = criarTarefa(
        { ...dados, usuario_id: 1 },
        setTarefas
      );
      // Salva subtarefas criadas no formulário
      subtarefasForm.forEach((s) => {
        criarSubtarefa(novaTarefa.id, s.titulo, setSubtarefas);
      });
    }
    setModalAberto(false);
    setTarefaEditando(null);
  };

  const handleCancelar = () => {
    setModalAberto(false);
    setTarefaEditando(null);
  };

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
};

export default TarefasPage;