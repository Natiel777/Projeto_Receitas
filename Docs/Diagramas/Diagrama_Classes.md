## Diagrama de Classes do Projeto – Sistema de Receitas Online

**Descrição:**  
Mostra as **entidades do sistema**, seus **atributos**, **métodos** e **relacionamentos**.  
O diagrama abaixo representa a estrutura básica de um sistema de receitas online com usuários, receitas, categorias e comentários.

**Principais classes e relações:**

- **Classe `Usuario`**
  - Atributos: `id`, `nome`, `email`, `senha`
  - Métodos: `cadastrar()`, `login()`, `logout()`

- **Classe `Administrador`**
  - Atributos: `id`, `nome`, `email`, `senha`
  - Métodos: `moderarReceitas()`, `gerenciarCategorias()`, `gerenciarUsuarios()`

- **Classe `Receita`**
  - Atributos: `id`, `titulo`, `descricao`, `modoPreparo`, `ingredientes`
  - Métodos: `criarReceita()`, `editarReceita()`, `excluirReceita()`, `adicionarComentario()`, `avaliarReceita()`

- **Classe `Categoria`**
  - Atributos: `id`, `nome`
  - Métodos: `criarCategoria()`, `editarCategoria()`, `excluirCategoria()`

- **Classe `Comentario`**
  - Atributos: `id`, `texto`, `data`, `autor` (Usuario)
  - Métodos: `adicionar()`, `editar()`, `excluir()`

**Relacionamentos:**

- `Usuario "1" --> "0..*" Receita` (um usuário pode criar várias receitas)  
- `Administrador <|-- Usuario` (Administrador herda de Usuario)  
- `Receita "1" --> "0..*" Comentario` (uma receita pode ter vários comentários)  
- `Receita "1" --> "1" Categoria` (cada receita pertence a uma categoria)

**Atualizado em:** 02/11/2025 

---

```mermaid
classDiagram
    %% Models
    class Usuario {
        +int id
        +String nome
        +String email
        +String senha
        +cadastrar()
        +login()
        +logout()
    }

    class Administrador {
        +moderarReceitas()
        +gerenciarCategorias()
        +gerenciarUsuarios()
    }

    class Receita {
        +int id
        +String titulo
        +String descricao
        +String modoPreparo
        +List ingredientes
        +criarReceita()
        +editarReceita()
        +excluirReceita()
        +adicionarComentario()
        +avaliarReceita()
    }

    class Categoria {
        +int id
        +String nome
        +String descricao
        +criarCategoria()
        +editarCategoria()
        +excluirCategoria()
    }

    class Comentario {
        +int id
        +String texto
        +Date data
        +Usuario autor
        +adicionar()
        +editar()
        +excluir()
    }

    %% Controllers
    class UsuarioController {
        +registrarUsuario()
        +autenticarUsuario()
        +editarPerfil()
    }

    class ReceitaController {
        +criarReceita()
        +editarReceita()
        +excluirReceita()
        +buscarReceita()
    }

    class ComentarioController {
        +adicionarComentario()
        +editarComentario()
        +excluirComentario()
    }

    class CategoriaController {
        +criarCategoria()
        +editarCategoria()
        +excluirCategoria()
    }

    class AdminController {
        +moderarReceitas()
        +gerenciarUsuarios()
        +gerenciarCategorias()
    }

    %% Relacionamentos
    Administrador <|-- Usuario
    Receita --> Usuario : criado por
    Receita --> Categoria : pertence a
    Receita --> Comentario : possui

    %% Controllers -> Models
    UsuarioController --> Usuario
    ReceitaController --> Receita
    ComentarioController --> Comentario
    CategoriaController --> Categoria
    AdminController --> Administrador
