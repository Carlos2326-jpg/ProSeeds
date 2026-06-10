// ============================================================
// CALENDÁRIO - Visualização Mensal (seguindo wireframe)
// Study+
// ============================================================

import { useState } from "react";
import { gerarDatasRecorrentes } from "../../Controllers/tarefaController.js";

const diasSemana = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];
const mesesNome = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const Calendario = ({ tarefas = [], cronogramas = [], disciplinas = [] }) => {
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const irMesAnterior = () => {
    if (mes === 0) { setMes(11); setAno(ano - 1); }
    else setMes(mes - 1);
  };

  const irProximoMes = () => {
    if (mes === 11) { setMes(0); setAno(ano + 1); }
    else setMes(mes + 1);
  };

  const gerarDiasMes = () => {
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const diasMesAnterior = new Date(ano, mes, 0).getDate();
    const dias = [];

    // Dias do mês anterior (preenchimento)
    for (let i = primeiroDia - 1; i >= 0; i--) {
      dias.push({ dia: diasMesAnterior - i, mesAtual: false });
    }
    // Dias do mês atual
    for (let i = 1; i <= totalDias; i++) {
      dias.push({ dia: i, mesAtual: true });
    }
    // Dias do próximo mês (preenchimento)
    const restante = 42 - dias.length;
    for (let i = 1; i <= restante; i++) {
      dias.push({ dia: i, mesAtual: false });
    }
    return dias;
  };

  const getTarefasDoDia = (dia, mesAtual) => {
    if (!mesAtual) return [];
    const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const tarefasPrazo = tarefas.filter((t) => t.prazo === dataStr);
    const tarefasRecorrentes = cronogramas
      .filter((c) => gerarDatasRecorrentes(c).includes(dataStr))
      .map((c) => tarefas.find((t) => t.id === c.tarefa_id))
      .filter(Boolean);

    const ids = new Set(tarefasPrazo.map((t) => t.id));
    const todas = [...tarefasPrazo];
    tarefasRecorrentes.forEach((t) => { if (!ids.has(t.id)) todas.push(t); });
    return todas;
  };

  const hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  const dias = gerarDiasMes();

  const tarefasDiaSelecionado = diaSelecionado
    ? getTarefasDoDia(diaSelecionado, true)
    : [];

  return (
    <div style={styles.container}>

      {/* Cabeçalho do mês */}
      <div style={styles.cabecalhoMes}>
        <button style={styles.btnNav} onClick={irMesAnterior}>‹</button>
        <span style={styles.tituloMes}>{mesesNome[mes]}/{ano}</span>
        <button style={styles.btnNav} onClick={irProximoMes}>›</button>
      </div>

      {/* Grid do calendário */}
      <div style={styles.grid}>

        {/* Dias da semana */}
        {diasSemana.map((d) => (
          <div key={d} style={styles.cabecalhoDia}>{d}</div>
        ))}

        {/* Células dos dias */}
        {dias.map((item, index) => {
          const dataStr = item.mesAtual
            ? `${ano}-${String(mes + 1).padStart(2, "0")}-${String(item.dia).padStart(2, "0")}`
            : null;
          const isHoje = dataStr === hojeStr;
          const isSelecionado = item.mesAtual && item.dia === diaSelecionado;
          const tarefasDia = getTarefasDoDia(item.dia, item.mesAtual);

          return (
            <div
              key={index}
              style={{
                ...styles.celula,
                backgroundColor: isSelecionado
                  ? "#d0d7ff"
                  : isHoje
                  ? "#fff"
                  : item.mesAtual
                  ? "#fff"
                  : "#f5f5f5",
                cursor: item.mesAtual ? "pointer" : "default",
                opacity: item.mesAtual ? 1 : 0.4,
              }}
              onClick={() => item.mesAtual && setDiaSelecionado(item.dia)}
            >
              <span
                style={{
                  ...styles.numeroDia,
                  color: isHoje ? "#4f46e5" : item.mesAtual ? "#333" : "#aaa",
                  fontWeight: isHoje ? "700" : "400",
                }}
              >
                {String(item.dia).padStart(2, "0")}
              </span>
              {tarefasDia.length > 0 && (
                <div style={styles.pontinhos}>
                  {tarefasDia.slice(0, 3).map((t, i) => (
                    <span key={i} style={styles.ponto} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Painel do dia selecionado */}
      {diaSelecionado && tarefasDiaSelecionado.length > 0 && (
        <div style={styles.painel}>
          <p style={styles.painelTitulo}>
            Tarefas em {String(diaSelecionado).padStart(2, "0")}/{String(mes + 1).padStart(2, "0")}/{ano}
          </p>
          {tarefasDiaSelecionado.map((t) => {
            const disciplina = disciplinas.find((d) => d.id === t.disciplina_id);
            return (
              <div key={t.id} style={styles.tarefaItem}>
                <span style={styles.tarefaTitulo}>{t.titulo}</span>
                {disciplina && (
                  <span style={styles.tarefaDisciplina}>{disciplina.nome}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================
// ESTILOS
// ============================================================
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #ddd",
  },
  cabecalhoMes: {
    backgroundColor: "#555",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tituloMes: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.2rem",
  },
  btnNav: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0 8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    borderTop: "1px solid #eee",
  },
  cabecalhoDia: {
    textAlign: "center",
    padding: "10px 0",
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#555",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #eee",
    borderRight: "1px solid #eee",
  },
  celula: {
    padding: "8px 6px",
    minHeight: "56px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    borderBottom: "1px solid #eee",
    borderRight: "1px solid #eee",
  },
  numeroDia: {
    fontSize: "0.88rem",
  },
  pontinhos: {
    display: "flex",
    gap: "3px",
  },
  ponto: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
  },
  painel: {
    padding: "12px 16px",
    backgroundColor: "#f9f9f9",
    borderTop: "1px solid #eee",
  },
  painelTitulo: {
    fontWeight: "600",
    fontSize: "0.88rem",
    color: "#444",
    marginBottom: "8px",
  },
  tarefaItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
  tarefaTitulo: {
    fontSize: "0.88rem",
    color: "#333",
    fontWeight: "500",
  },
  tarefaDisciplina: {
    fontSize: "0.78rem",
    color: "#888",
  },
};

export default Calendario;