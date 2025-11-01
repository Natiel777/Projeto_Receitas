# 🍽 Plataforma de Receitas Online

## 👥 Equipe
| Aluno | Nome |
|--------|-------|
| 1 | **Natiel** |
| 2 | **Herbert** |
| 3 | **Victor** |
| 4 | **Denner** |


---


## 🎯 Tema do Projeto
**Plataforma de Receitas Online**

Uma aplicação web onde os usuários podem:
- Criar uma conta e publicar suas receitas (com fotos, ingredientes e modo de preparo);
- Buscar receitas por nome ou ingrediente;
- Interagir com receitas de outros usuários por meio de **avaliações**.


---


## ⚙️ Funcionalidades Iniciais

| # | Funcionalidade | Descrição |
|---|----------------|------------|
| 1 | **Criar conta e postar receita** | Usuário pode se cadastrar e publicar uma receita com foto, título, ingredientes e modo de preparo. |
| 2 | **Buscar receitas** | Usuário pode pesquisar receitas com base no nome da receita ou em um ingrediente específico. |
| 3 | **Avaliar receitas** | Usuário pode deixar uma nota (1–5 estrelas) em receitas postadas por outros usuários. |


---


## 🧩 Mapeamento das Camadas

| Camada | Responsabilidades | Tecnologias |
|--------|------------------|--------------|
| **Front-end** | Interface web para cadastro, busca, visualização e interação com receitas. | HTML / JS / CSS |
| **Back-end** | Regras de negócio, autenticação, endpoints REST e integração com o banco. | Node.js + Express |
| **Banco de Dados** | Armazenar usuários, receitas, imagens e avaliações. | SQLite |


---


## 🗺 Arquitetura do Sistema

```text
┌───────────────────────────────┐
│           FRONT-END           │
│         (HTML + JS + CSS)        │
│───────────────────────────────│
│ • Cadastro / Login          │ ← (1)
│ • Postar Receita            │ ← (1)
│ • Buscar Receitas           │ ← (2)
│ • Visualizar + Avaliar      │ ← (3)
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
│ • /api/avaliação     → (3)    │
│ • Validações e Regras de Negócio │
└──────────────┬────────────────┘
               │  SQL
               ▼
┌───────────────────────────────┐
│          DATABASE             │
│           (SQLite)            │
│───────────────────────────────│
│ • usuarios(id, nome, email, senha)         │ ← (1)
│ • receitas(id, titulo, ingredientes, modo, │ ← (1)(2)
│   imagem, usuario_id)                        │
│ • avaliação(id,nota,             │ ← (3)
│   usuario_id, receita_id)                  │
└───────────────────────────────┘


---


📜 Licença

Este projeto é de uso educacional, desenvolvido pelos alunos do grupo para fins acadêmicos.