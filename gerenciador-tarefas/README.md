# 🌱 ProSeeds

> _"Sua produtividade germina aqui"_

ProSeeds é um sistema web completo de gestão de estudos. O nome é um anagrama de "desespero" — mas também carrega o significado de produtividade que germina. Aqui, cada sessão de estudo é uma semente plantada.

---

## 🚀 Stack

- **Frontend:** React 19 + React Router DOM
- **Backend:** Node.js + Express
- **Banco de dados:** MySQL
- **Arquitetura:** MVC (Model-View-Controller)
- **Autenticação:** JWT (JSON Web Tokens)
- **Gráficos:** Recharts

---

## ✨ Funcionalidades

### 🔐 Autenticação

- Cadastro de usuário com senha criptografada (bcrypt)
- Login com geração de token JWT
- Proteção de rotas — acesso negado sem autenticação
- Logout com limpeza de sessão

### 📋 Tarefas

- CRUD completo de tarefas
- Subtarefas com checklist
- Filtros por status, prioridade e disciplina
- Tarefas recorrentes

### 📆 Calendário

- Visualização mensal de tarefas e cronogramas
- Navegação entre meses
- Clique no dia para ver detalhes

### ⏱ Temporizador

- Técnica **Pomodoro** — ciclos de 25min com pausas automáticas
- Técnica **Time Blocking** — cronômetro crescente livre
- Técnica **Eisenhower** — foco por prioridade
- Registro automático de sessão ao encerrar
- Notificações visuais entre fases

### 🎯 Metas

- Criação de metas por disciplina com carga horária alvo
- Barra de progresso em tempo real
- Progresso atualizado automaticamente ao encerrar sessões no Temporizador

### 📊 Progresso

- Total de horas estudadas e sessões realizadas
- Gráfico de barras — horas por disciplina
- Gráfico de pizza — distribuição do tempo
- Termômetro de metas — progresso por disciplina

### 📅 Planejamento

- Criação de cronogramas de estudo
- Recorrência diária ou semanal
- Validação de conflito de horário
- Visualização integrada no Calendário

### 🏠 Dashboard

- Resumo de tarefas pendentes e concluídas
- Barra de progresso geral
- Próximos eventos do calendário

---

## 🛠 Como rodar localmente

### Pré-requisitos

- Node.js
- MySQL (XAMPP ou instalação direta)

### 1. Clone o repositório

```bash
git clone https://github.com/Carlos2326-jpg/ProSeeds.git
cd ProSeeds/gerenciador-tarefas
```

### 2. Instale as dependências do frontend

```bash
npm install
```

### 3. Instale as dependências do backend

```bash
cd server
npm install
```

### 4. Configure o banco de dados

Acesse o phpMyAdmin ou MySQL e execute o script em `server/config/database.sql`.

Depois execute também:

```sql
CREATE TABLE IF NOT EXISTS Usuario (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  foto_perfil VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Meta (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  disciplina VARCHAR(100) NOT NULL,
  carga_horaria_alvo DECIMAL(5,1) NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  horas_cumpridas DECIMAL(5,1) DEFAULT 0,
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE IF NOT EXISTS SessaoEstudo (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  tarefa_id INTEGER,
  disciplina VARCHAR(100) NOT NULL,
  tecnica_usada VARCHAR(30),
  inicio TIMESTAMP NULL DEFAULT NULL,
  fim TIMESTAMP NULL DEFAULT NULL,
  duracao_minutos INTEGER,
  anotacao TEXT,
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);
```

### 5. Suba o backend

```bash
cd server
$env:PORT=3001; node index.js   # PowerShell
# ou
PORT=3001 node index.js         # Linux/Mac
```

### 6. Suba o frontend

```bash
cd ..
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 👥 Equipe

Desenvolvido por 3 estudantes como projeto de P2 de Engenharia de Software.

| Área   | Responsabilidade                             |
| ------ | -------------------------------------------- |
| Área 1 | Autenticação, Perfil, Dashboard              |
| Área 2 | Tarefas, Subtarefas, Calendário              |
| Área 3 | Temporizador, Metas, Progresso, Planejamento |

---

## 📌 Observações

- Recuperação de senha está estruturada no frontend mas requer configuração de servidor SMTP para funcionar
- As disciplinas são cadastradas por usuário e alimentam todos os formulários dinamicamente
- O progresso das metas é atualizado em tempo real a cada sessão encerrada no Temporizador

---

_ProSeeds — porque toda grande colheita começa com uma semente 🌱_
