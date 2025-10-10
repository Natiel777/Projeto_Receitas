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

## ⚙ Funcionalidades Iniciais

| # | Funcionalidade | Descrição |
|---|----------------|------------|
| 1 | **Criar conta e postar receita** | Usuário pode se cadastrar e publicar uma receita com foto, título, ingredientes e modo de preparo. |
| 2 | **Buscar receitas por nome ou ingrediente** | Usuário pode pesquisar receitas com base no nome da receita ou em um ingrediente específico. |
| 3 | **Comentar ou avaliar receitas** | Usuário pode deixar comentários ou dar uma nota (ex: 1–5 estrelas) em receitas postadas por outros usuários. |


---

## 🧩 Mapeamento Inicial das Camadas

| Camada | Responsabilidades | Tecnologias sugeridas |
|--------|-------------------|------------------------|
| **Front-end** | Interface web para o usuário interagir (cadastro, busca, visualização e comentários). | React |
| **Back-end** | Gerenciar regras de negócio, autenticação, endpoints REST e comunicação com o banco. | Node.js + Express |
| **Banco de Dados** | Armazenar informações de usuários, receitas, comentários e avaliações. | SQL |

---

## 🗺 Esboço Inicial da Arquitetura
```plaintext
          ┌────────────────────────────────┐
          │           FRONT-END            │
          │            (React)             │
          │────────────────────────────────│
          │ - Página de cadastro/login     │   ← (1) Criar conta
          │ - Formulário de receita        │   ← (1) Postar receita
          │ - Campo de busca               │   ← (2) Buscar receitas
          │ - Tela de receita + comentários│   ← (3) Avaliar/Comentar
          └──────────────┬─────────────────┘
                         │  Requisições HTTP (JSON via API REST)
                         ▼
          ┌──────────────────────────────────┐
          │             BACK-END             │
          │       (Node.js + Express)        │
          │──────────────────────────────────│
          │ - Rotas /api/usuarios            │ ← (1) Cadastro/Login
          │ - Rotas /api/receitas            │ ← (1) Postar receita
          │ - Rotas /api/busca               │ ← (2) Buscar por nome/ingrediente
          │ - Rotas /api/comentarios         │ ← (3) Comentários/Avaliações
          │ - Regras de negócio e validações |
          └──────────────┬───────────────────┘
                         │  Consultas SQL
                         ▼
          ┌───────────────────────────────────────┐
          │            BANCO DE DADOS             │
          │            (MySQL / SQLite)           │
          │───────────────────────────────────────│
          │ Tabelas:                              │
          │  • usuarios (id, nome, senha)         │ ← (1)
          │  • receitas (id, titulo, ingredientes,│ ← (1)(2)
          │     modo, foto, autor_id)             │
          │  • comentarios (id, texto, nota,      │ ← (3)
          │     usuario_id, receita_id)           │
          └───────────────────────────────────────┘

