# 🍽 Projeto: Plataforma de Receitas Online

---

## 👥 Equipe

- **Aluno 1:** Herbert  
- **Aluno 2:** Natiel  
- **Aluno 3:** Victor  
- **Aluno 4:** Denner  

---

## 🎯 Tema do Projeto

**Plataforma de Receitas**

Uma aplicação web onde os usuários podem criar uma conta, postar suas receitas (com fotos, ingredientes e modo de preparo), buscar receitas por nome ou ingrediente, e interagir avaliando ou comentando as receitas de outros usuários.

---

## ⚙️ Funcionalidades Iniciais

| # | Funcionalidade | Descrição |
|---|----------------|------------|
| 1 | **Criar conta e postar receita** | Usuário pode se cadastrar e publicar uma receita com foto, título, ingredientes e modo de preparo. |
| 2 | **Buscar receitas por nome ou ingrediente** | Usuário pode pesquisar receitas com base no nome da receita ou em um ingrediente específico. |
| 3 | **Comentar ou avaliar receitas** | Usuário pode deixar comentários ou dar uma nota (ex: 1–5 estrelas) em receitas postadas por outros usuários. |

---

## 🧩 Mapeamento das Camadas

| Camada | Responsabilidades | Tecnologias |
|--------|-------------------|--------------|
| **Front-end** | Interface web para cadastro, busca, visualização e interação com receitas. | React / HTML |
| **Back-end** | Regras de negócio, autenticação, endpoints REST e integração com o banco. | Node.js + Express |
| **Banco de Dados** | Armazenar usuários, receitas, comentários e avaliações. | MySQL / SQLite |

---

## 🗺 Arquitetura do Sistema

```plaintext
┌───────────────────────────────┐
│           FRONT-END           │
│            (React / HTML)            │
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
│       (MySQL / SQLite)        │
│───────────────────────────────│
│ • usuarios(id, nome, senha)             │ ← (1)
│ • receitas(id, titulo, ingredientes,    │ ← (1)(2)
│   modo, foto, autor_id)                 │
│ • comentarios(id, texto, nota,          │ ← (3)
│   usuario_id, receita_id)               │
└───────────────────────────────┘