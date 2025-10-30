# 🍽 Plataforma de Receitas Online

## 👥 Equipe
| Aluno | Nome |
|--------|-------|
| 1 | **Herbert** |
| 2 | **Natiel** |
| 3 | **Victor** |
| 4 | **Denner** |


---


## 🎯 Tema do Projeto
**Plataforma de Receitas Online**

Uma aplicação web onde os usuários podem:
- Criar uma conta e publicar suas receitas (com fotos, ingredientes e modo de preparo);
- Buscar receitas por nome ou ingrediente;
- Interagir com receitas de outros usuários por meio de **comentários** e **avaliações**.


---


## ⚙️ Funcionalidades Iniciais

| # | Funcionalidade | Descrição |
|---|----------------|------------|
| 1 | **Criar conta e postar receita** | Usuário pode se cadastrar e publicar uma receita com foto, título, ingredientes e modo de preparo. |
| 2 | **Buscar receitas** | Usuário pode pesquisar receitas com base no nome da receita ou em um ingrediente específico. |
| 3 | **Comentar e avaliar receitas** | Usuário pode deixar comentários ou dar uma nota (1–5 estrelas) em receitas postadas por outros usuários. |


---


## 🧩 Mapeamento das Camadas

| Camada | Responsabilidades | Tecnologias |
|--------|------------------|--------------|
| **Front-end** | Interface web para cadastro, busca, visualização e interação com receitas. | React / HTML / CSS |
| **Back-end** | Regras de negócio, autenticação, endpoints REST e integração com o banco. | Node.js + Express |
| **Banco de Dados** | Armazenar usuários, receitas, comentários e avaliações. | SQLite |


---


## 🗺 Arquitetura do Sistema

```text
┌───────────────────────────────┐
│           FRONT-END           │
│         (React / HTML)        │
│───────────────────────────────│
│ • Cadastro / Login            │ ← (1)
│ • Postar Receita              │ ← (1)
│ • Buscar Receitas             │ ← (2)
│ • Visualizar + Comentar       │ ← (3)
└──────────────┬────────────────┘
               │  HTTP (JSON via REST API)
               ▼
┌───────────────────────────────┐
│           BACK-END            │
│       (Node.js + Express)     │
│───────────────────────────────│
│ • /api/usuarios      → (1)    │
│ • /api/receitas      → (1)(2) │
│ • /api/busca         → (2)    │
│ • /api/comentarios   → (3)    │
│ • Validações e Regras de Negócio │
└──────────────┬────────────────┘
               │  SQL Queries
               ▼
┌───────────────────────────────┐
│          DATABASE             │
│           (SQLite)            │
│───────────────────────────────│
│ • usuarios(id, nome, email, senha)         │ ← (1)
│ • receitas(id, titulo, ingredientes, modo, │ ← (1)(2)
│   foto, usuario_id)                        │
│ • comentarios(id, texto, nota,             │ ← (3)
│   usuario_id, receita_id)                  │
└───────────────────────────────┘


---


🚀 Tecnologias Utilizadas

Node.js – Ambiente de execução do servidor

Express.js – Framework para rotas REST

SQLite – Banco de dados leve e local

React.js – Interface web dinâmica

Nodemon – Reinicialização automática do servidor

CORS – Controle de acesso entre front-end e back-end


---


📜 Licença

Este projeto é de uso educacional, desenvolvido pelos alunos do grupo para fins acadêmicos.