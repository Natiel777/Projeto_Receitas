# Diagramas UML do Projeto – Sistema de Receitas Online

---

📄 **Descrição:**

Este diagrama representa os atores e funcionalidades principais do sistema de **Receitas Online**.

**Atores e permissões:**

- **Visitante:** visualizar receitas, pesquisar receitas e se cadastrar.  
- **Usuário:** criar, editar, excluir receitas e ver detalhes das receitas.  
- **Administrador:** moderar receitas, gerenciar categorias e usuários.  

**Principais elementos:**

- **Atores:** Visitante, Usuário, Administrador  
- **Casos de uso:** Visualizar Receitas, Pesquisar Receitas, Cadastrar-se, Criar Receita, Editar Receita, Excluir Receita, Ver Detalhes, Gerenciar Categorias, Moderar Receitas, Gerenciar Usuários  

**Relações entre casos de uso:**

- “Visualizar Receitas” <<include>> “Ver Detalhes da Receita”  
- “Criar Receita” <<extend>> “Editar Receita”  

**Atualizado em:** 02/11/2025

---

## Diagrama de Casos de Uso

```mermaid
flowchart TD
  %% Atores
  Visitante["Visitante"]:::actor
  Usuario["Usuário"]:::actor
  Admin["Administrador"]:::actor

  %% Casos de uso
  VC-Vis([Visualizar Receitas]):::usecase
  VC-Pesq([Pesquisar Receitas]):::usecase
  VC-Cad([Cadastrar-se]):::usecase

  UC-Criar([Criar Receita]):::usecase
  UC-Editar([Editar Receita]):::usecase
  UC-Excluir([Excluir Receita]):::usecase
  UC-Detalhe([Ver Detalhes da Receita]):::usecase
  UC-Cats([Gerenciar Categorias]):::usecase
  UC-Moder([Moderar Receitas]):::usecase
  UC-Users([Gerenciar Usuários]):::usecase

  %% Ligações atores -> casos
  Visitante --> VC-Vis
  Visitante --> VC-Pesq
  Visitante --> VC-Cad

  Usuario --> UC-Criar
  Usuario --> UC-Editar
  Usuario --> UC-Excluir
  Usuario --> UC-Detalhe

  Admin --> UC-Moder
  Admin --> UC-Cats
  Admin --> UC-Users

  %% Relações entre casos
  VC-Vis -.->|inclui: Ver Detalhes| UC-Detalhe
  UC-Criar -.->|pode estender| UC-Editar

  %% Estilos
  classDef actor fill:#f9f9f9,stroke:#333,stroke-width:1px
  classDef usecase fill:#e8f6ff,stroke:#0b6b5b,stroke-width:1px,rx:18,ry:18
