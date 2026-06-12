import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const links = [
  { path: "/dashboard", label: "🏠 Dashboard" },
  { path: "/tarefas", label: "✅ Tarefas" },
  { path: "/calendario", label: "📆 Calendário" },
  { path: "/temporizador", label: "⏱ Temporizador" },
  { path: "/metas", label: "🎯 Metas" },
  { path: "/progresso", label: "📊 Progresso" },
  { path: "/planejamento", label: "📅 Planejamento" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Study+</div>
      <div className="navbar-links">
        {links.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            className={({ isActive }) =>
              isActive ? "nav-link ativo" : "nav-link"
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
