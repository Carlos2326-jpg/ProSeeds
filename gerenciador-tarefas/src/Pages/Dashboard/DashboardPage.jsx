import React from "react";
import { useDashboard } from "../../Controllers/dashboardController";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/ui/Button";
import "./Styles/DashboardPage.css";

function DashboardPage() {
  const { dados, loading, erro, porcentagemConclusao } = useDashboard();
  const navigate = useNavigate();

  if (loading)
    return <div className="loading-screen">Carregando painel...</div>;

  return (
    <div className="dashboard-container">
      <main className="dashboard-content" style={{ padding: "20px" }}>
        {erro && <div className="error-message">{erro}</div>}

        <section
          className="metrics-grid"
          style={{ display: "flex", gap: "20px", marginBottom: "30px" }}
        >
          <div
            className="card-metric"
            style={{
              background: "#f0f4f8",
              padding: "20px",
              borderRadius: "8px",
              flex: 1,
            }}
          >
            <h3>Tarefas Pendentes</h3>
            <p
              style={{ fontSize: "32px", fontWeight: "bold", color: "#2b6cb0" }}
            >
              {dados.totalTarefas - dados.concluidas}
            </p>
            <Button text="Ver Tarefas" onClick={() => navigate("/tarefas")} />
          </div>
          <div
            className="card-metric"
            style={{
              background: "#f0f4f8",
              padding: "20px",
              borderRadius: "8px",
              flex: 1,
            }}
          >
            <h3>Progresso Geral</h3>
            <p
              style={{ fontSize: "32px", fontWeight: "bold", color: "#2f855a" }}
            >
              {porcentagemConclusao}%
            </p>
            <div
              style={{
                background: "#e2e8f0",
                borderRadius: "4px",
                height: "10px",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  background: "#48bb78",
                  height: "10px",
                  borderRadius: "4px",
                  width: `${porcentagemConclusao}%`,
                }}
              ></div>
            </div>
          </div>
        </section>

        <section
          className="events-section"
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Próximos Eventos no Calendário</h2>
          {dados.proximosEventos.length === 0 ? (
            <p style={{ color: "#718096", marginTop: "10px" }}>
              Nenhum compromisso agendado para os próximos dias.
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
              {dados.proximosEventos.map((evento) => (
                <li
                  key={evento.id}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{evento.titulo}</span>
                  <span style={{ color: "#718096" }}>
                    {new Date(evento.data).toLocaleDateString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Button
            text="Abrir Calendário"
            onClick={() => navigate("/calendario")}
            style={{ marginTop: "15px" }}
          />
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
