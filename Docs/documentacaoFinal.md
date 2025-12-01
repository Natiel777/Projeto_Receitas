# Documentação Final do Projeto

**Nome do Projeto:**  Sua Receita
**Equipe:**  Natiel e Herbert
**Disciplina:** Projeto Integrador 2  
**Instituição:** IFCE – Campus Maranguape  
**Semestre:**  Terceiro

---

# Sumário

1. [Introdução](#1-introdução)  
   1.1 [Objetivo do Documento](#11-objetivo-do-documento)  
   1.2 [Público-alvo](#12-público-alvo)  

2. [Visão Geral do Sistema](#2-visão-geral-do-sistema)  
   2.1 [Descrição Resumida](#21-descrição-resumida)  
   2.2 [Funcionalidades Principais](#22-funcionalidades-principais)  
   2.3 [Escopo do Sistema](#23-escopo-do-sistema)  

3. [Requisitos do Sistema](#3-requisitos-do-sistema)  
   3.1 [Requisitos Funcionais](#31-requisitos-funcionais)  
   3.2 [Requisitos Não Funcionais](#32-requisitos-não-funcionais)  

4. [Arquitetura e Tecnologias Utilizadas](#4-arquitetura-e-tecnologias-utilizadas)  
   4.1 [Arquitetura Geral](#41-arquitetura-geral)  
   4.2 [Tecnologias Utilizadas](#42-tecnologias-utilizadas)  
   4.3 [Padrões e Boas Práticas Adotados](#43-padrões-e-boas-práticas-adotados)  

5. [Diagramas do Sistema](#5-diagramas-do-sistema)  
   5.1 [Diagrama de Casos de Uso](#51-diagrama-de-casos-de-uso)  
   5.2 [Diagrama de Classes / Modelo de Dados](#52-diagrama-de-classes--modelo-de-dados)  
   5.3 [Diagrama de Sequência (Opcional)](#53-diagrama-de-sequência-opcional)  
   5.4 [Diagrama de Navegação (Opcional)](#54-diagrama-de-navegação-opcional)  

6. [Descrição dos Módulos e Componentes](#6-descrição-dos-módulos-e-componentes)  
   6.1 [Organização das Pastas](#61-organização-das-pastas)  
   6.2 [Módulos do Sistema](#62-módulos-do-sistema)  
   6.3 [Fluxo de uma Operação Importante](#63-fluxo-de-uma-operação-importante)  

7. [Guia de Instalação e Execução](#7-guia-de-instalação-e-execução)  
   7.1 [Pré-requisitos](#71-pré-requisitos)  
   7.2 [Como Clonar o Repositório](#72-como-clonar-o-repositório)  
   7.3 [Instalação e Execução do Back-end](#73-instalação-e-execução-do-back-end)  
   7.4 [Instalação e Execução do Front-end](#74-instalação-e-execução-do-front-end)  
   7.5 [Variáveis de Ambiente](#75-variáveis-de-ambiente)  

8. [Manual do Usuário](#8-manual-do-usuário)  
   8.1 [Tela Inicial](#81-tela-inicial)  
   8.2 [Login e Cadastro](#82-login-e-cadastro)  
   8.3 [Cadastro de Trilhas / Receitas](#83-cadastro-de-trilhas--receitas)  
   8.4 [Edição e Exclusão](#84-edição-e-exclusão)  
   8.5 [Erros Comuns e Soluções](#85-erros-comuns-e-soluções)
   
9. [Decisões de Projeto e Limitações](#9-decisões-de-projeto-e-limitações)  
   9.1 [Decisões Importantes](#91-decisões-importantes)  
   9.2 [Limitações da Versão Atual](#92-limitações-da-versão-atual)  

10. [Testes Unitários com Jest](#10-testes-unitários-com-jest)  
    10.1 [Objetivo dos Testes](#101-objetivo-dos-testes)  
    10.2 [Tecnologias Utilizadas](#102-tecnologias-utilizadas)  
    10.3 [Como Executar os Testes](#103-como-executar-os-testes)  
    10.4 [Organização dos Arquivos de Teste](#104-organização-dos-arquivos-de-teste)  
    10.5 [Testes Implementados no Projeto](#105-testes-implementados-no-projeto)  
    10.6 [Exemplo de Teste Criado](#106-exemplo-de-teste-criado)  
    10.7 [Benefícios dos Testes Unitários](#107-benefícios-dos-testes-unitários)

11. [Referências](#11-referencias)

---

# 1. Introdução

## 1.1 Objetivo do Documento

> Este documento compila a documentação técnica e operacional do sistema [Sua Receita], abordando sua visão geral, requisitos, arquitetura, diagramas essenciais, módulos, procedimentos de instalação e um guia básico de uso. O objetivo é proporcionar aos desenvolvedores, professores e avaliadores uma compreensão completa da estrutura e do funcionamento do projeto.

## 1.2 Público-alvo

- Programadores que pretendem continuar o desenvolvimento do sistema
- Professores e avaliadores que analisarão o projeto
- Usuários finais (somente nas partes que explicam como utilizar o sistema)
---

# 2. Visão Geral do Sistema

## 2.1 Descrição Resumida

O sistema Sua Receita foi criado para resolver a dificuldade que muitas pessoas têm em organizar, encontrar e compartilhar receitas culinárias de forma prática. Hoje, grande parte das receitas acaba dispersa em anotações, prints ou sites diferentes, dificultando o acesso rápido e a reutilização. O sistema centraliza tudo em um único ambiente, permitindo cadastro, busca e visualização organizada das receitas.
O público-alvo inclui qualquer pessoa interessada em culinária — desde usuários comuns que desejam guardar suas receitas favoritas até estudantes e profissionais que precisam documentar e apresentar pratos de maneira estruturada. Além disso, o sistema também atende desenvolvedores e avaliadores que desejam analisar sua estrutura técnica, já que foi pensado como um projeto acadêmico completo.
O contexto de uso abrange tanto o cotidiano das pessoas, que podem acessar suas receitas de forma rápida e prática, quanto o ambiente acadêmico, onde o sistema serve como demonstração de boas práticas de desenvolvimento web. Assim, ele funciona bem tanto como uma ferramenta pessoal quanto como um projeto educativo e avaliativo.

## 2.2 Funcionalidades Principais

- Cadastro e autenticação de usuários (login, logout)
- Criação, edição e exclusão de receitas
- Upload de imagens para ilustrar as receitas
- Listagem completa de receitas cadastradas
- Busca de receitas por nome ou ingrediente
- Exibição detalhada de cada receita (ingredientes, modo de preparo, foto)
- Interface responsiva para uso em computador e celular
- Sistema de notificações fq64
- Cookies para salvar preferências e manter sessão
- Organização visual clara e intuitiva das páginas

## 2.3 Escopo do Sistema

**Sistema Faz:**

- Cadastro e login de usuários
- Criação de receitas com nome, ingredientes, modo de preparo e imagem
- Listagem de todas as receitas cadastradas
- Edição e exclusão de receitas
- Busca de receitas por nome
- Upload de imagens
- Exibição detalhada das receitas
- Interface responsiva
- Sistema de comentários em receitas
- Avaliação de receitas por estrelas
- Filtrar receitas por categorias (ex.: doces, massas, bebidas)
- Integração com redes sociais para compartilhamento automático

**Sistema não Faz:**

- Favoritar ou curtir receitas
- Chat ou conversa direta entre usuários
- Modo offline
- Sistema de recomendações personalizadas
- Criação de refeicões
- Exportar receitas para PDF ou outros formatos
- Área administrativa avançada (dashboard completo, relatórios, controle de permissões)
- Cadastro de múltiplas fotos por receita (galeria)
- Upload de vídeos mostrando o preparo
- Impressão formatada de receitas diretamente pela interface
- Histórico de visualizações ou monitoramento de engajamento
- Cadastro de perfis com níveis de acesso diferenciados (ex.: admin, editor, visitante)
- Suporte a múltiplos idiomas
- Modo de acessibilidade avançada (leitura automática, alto contraste adaptativo, etc.)
- Suporte a criação de menus semanais / plano alimentar

---

# 3. Requisitos do Sistema

## 3.1 Requisitos Funcionais

- **RF01 - Cadastro de usuário:**  
  *Como visitante, quero criar uma conta informando nome, e-mail e senha, para poder acessar os recursos exclusivos da plataforma.*
- **RF02 - Login de usuário:**  
  *Como usuário cadastrado, quero acessar minha conta através de e-mail e senha, para utilizar minhas funcionalidades personalizadas.*
- **RF03 - Publicação de receitas:**  
  *Como usuário autenticado, quero publicar receitas com título, ingredientes, modo de preparo e imagem, para compartilhar minhas criações com outras pessoas.*
- **RF04 - Edição de receitas:**  
  *Como autor de uma receita, quero editar ou excluir minhas publicações, para manter meu conteúdo atualizado.*
- **RF05 - Busca de receitas:**  
  *Como usuário, quero buscar receitas por nome ou ingrediente, para encontrar facilmente o que desejo fazer.*
- **RF06 - Exibição de receitas:**  
  *Como usuário, quero visualizar uma lista de receitas com foto, título e autor, para escolher uma que me interesse.*
- **RF07 - Comentários em receitas:**  
  *Como usuário autenticado, quero comentar em receitas de outros usuários, para compartilhar minha opinião ou dicas.*
- **RF08 - Avaliação de receitas:**  
  *Como usuário, quero avaliar receitas com uma nota de 1 a 5 estrelas, para ajudar outros a identificar as melhores.*
- **RF09 - Perfil do usuário:**  
  *Como usuário, quero editar meu perfil e visualizar minhas receitas publicadas, para gerenciar minha presença na plataforma.*
- **RF10 - Logout:**  
  *Como usuário autenticado, quero encerrar minha sessão de forma segura, para proteger minha conta.*



## 3.2 Requisitos Não Funcionais

- **RNF01 - Usabilidade:**  
  *Como usuário, quero que a interface seja simples e responsiva, para utilizar a plataforma com facilidade em qualquer dispositivo.*
- **RNF02 - Desempenho:**  
  *Como usuário, quero que as buscas e carregamento de receitas sejam rápidos, para não perder tempo esperando.*
- **RNF03 - Segurança:**  
  *Como usuário, quero que minhas senhas sejam armazenadas de forma criptografada, para garantir minha privacidade.*
- **RNF04 - Confiabilidade:**  
  *Como autor, quero que apenas eu possa editar ou excluir minhas receitas, para manter o controle do meu conteúdo.*
- **RNF05 - Escalabilidade:**  
  *Como administrador, quero que a plataforma suporte muitos usuários e receitas, para garantir estabilidade conforme o crescimento.*
- **RNF06 - Manutenibilidade:**  
  *Como desenvolvedor, quero que o sistema siga boas práticas de organização (como MVC), para facilitar futuras atualizações.*
- **RNF07 - Persistência:**  
  *Como usuário, quero que todos os meus dados fiquem salvos de forma durável no banco de dados, para não perder minhas informações.*


# 4. Arquitetura e Tecnologias Utilizadas

## 4.1 Arquitetura Geral

O sistema Sua Receita segue uma arquitetura baseada no modelo cliente–servidor. O front-end foi desenvolvido em React, responsável por toda a interface visual, navegação entre páginas e interação direta com o usuário. A aplicação consome a API através de requisições HTTP e apresenta os dados de forma organizada e responsiva.

No back-end, o sistema utiliza Node.js com Express, estruturado como uma API REST que gerencia todas as operações de usuários e receitas, incluindo cadastro, listagem, edição, exclusão, comentários e avaliações. O banco de dados utilizado é SQLite/Postgresql, acessado por meio do Prisma ORM, garantindo consultas seguras, migrations e uma camada consistente de acesso aos dados. Além disso, o upload de imagens é realizado por integração com serviços externos como o Cloudinary.

## 4.2 Tecnologias Utilizadas

Liste por camadas.

**Front-end:**

- React
- Vite
- React Router DOM
- Tailwind CSS
- PostCSS + Autoprefixer
- React Icons
- Lucide-react
- Heroicons
- ESLint (com plugins para React, Hooks e Refresh)

**Back-end:**

- Node.js
- Express
- PostgreSQL/SQLite
- Prisma ORM
- Multer (upload de arquivos)
- Cloudinary + Multer Storage Cloudinary
- JWT (jsonwebtoken)
- Bcryptjs
- Cookie-parser
- CORS
- Crypto
- Nodemailer + SendGrid Transport
- Leo-profanity
- Dotenv

## 4.3 Padrões e Boas Práticas Adotados

**O back-end segue uma arquitetura organizada em camadas, onde cada parte do sistema possui uma responsabilidade bem definida:**

- Routes → Recebem as requisições HTTP e direcionam para o controller correto.
- Controllers → Contêm a lógica de entrada e saída das requisições (req/res), chamando serviços ou Prisma.
- Middlewares → Utilizados para autenticação, tratamento de erros, logs e integração com Cloudinary.
- Prisma (ORM) → Centraliza o acesso ao banco de dados através do schema.prisma.
- Config → Arquivos de configuração, como conexão com o banco via Prisma.
- Tests → Estrutura de testes utilizando Jest e Supertest para validar partes críticas da API.

**O front-end também foi estruturado em módulos funcionais, seguindo um padrão semelhante ao do back-end, com responsabilidades bem separadas:**

- Public – Armazena arquivos de acesso público e recursos base da aplicação, como o HTML inicial e arquivos estáticos.
- Assets – Centraliza recursos visuais, incluindo imagens, ícones, logos e outros elementos estáticos utilizados na interface.
- Auth – Contém a lógica de autenticação da aplicação, como hooks de login/logout, validação de sessão e gerenciamento de tokens.
- Components – Guarda todos os componentes reutilizáveis da interface, como botões, headers, footers, cards, formulários e elementos UI gerais.
- Pages – Concentra as páginas completas da aplicação, cada uma representando uma rota (Home, Perfil, Receitas, etc.).
- Services – Responsável pela comunicação com o back-end, incluindo funções de requisições HTTP e integração com a API.
- Utils – Agrupa funções auxiliares e utilidades, como validadores, formatações, máscaras, helpers e pequenas lógicas compartilhadas.

---

# 5. Diagramas do Sistema

> Os diagramas podem ser incluídos como imagens ou usando sintaxe Mermaid em Markdown.

## 5.1 Diagrama de Casos de Uso


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
```

## 5.2 Diagrama de Classes / Modelo de Dados

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
```

## 5.3 Diagrama de Sequência (Opcional)

```mermaid
sequenceDiagram
    participant Visitante
    participant InterfaceWeb
    participant UsuarioController
    participant Usuario

    Visitante->>InterfaceWeb: Preenche formulário (nome, email, senha)
    InterfaceWeb->>UsuarioController: Envia dados do cadastro
    UsuarioController->>Usuario: Cria objeto e valida dados
    Usuario-->>UsuarioController: Confirma criação da conta
    UsuarioController-->>InterfaceWeb: Retorna sucesso
    InterfaceWeb-->>Visitante: Exibe mensagem de confirmação
```
---

# 6. Descrição dos Módulos e Componentes

## 6.1 Organização das Pastas

Explique como o projeto está organizado no repositório.  

Exemplo:

**Back-end:**

    /backend
       /prisma
       /src
        /config       
        /controllers
        /middlewares
        /routes
      /tests
      /uploads
      .env
      .gitignore
      babel.config.js
      jest.config.js
      package.json
      prisma.config.ts
      server.js

**Front-end:**

    /frontend
      /public
      /src
        /assets
        /auth
        /components
        /pages
        /services 
        /utils
        app.jsx
        index.css
        main.jsx
      eslint.config.js
      index.html
      package.json
      postcss.config.js
      tailwind.config.js
      vite.config.js

## 6.2 Módulos do Sistema


**Módulo de Autenticação**

Este módulo é responsável por todo o processo de gerenciamento de usuários.

Entre suas funções estão:

- Cadastro de novos usuários
- Login com validação de credenciais
- Geração e verificação de tokens JWT
- Controle de sessão do usuário
- Proteção de rotas privadas no back-end e no front-end
- Sanitização e validação de dados (como uso de leo-profanity)

**Módulo de Receitas**

É o núcleo principal da aplicação, responsável por toda a gestão de receitas.

Suas funcionalidades incluem:

- Cadastro de receitas com nome, ingredientes, preparo e imagem
- Edição de receitas já existentes
- Listagem geral de receitas
- Visualização de detalhes
- Exclusão de receitas
- Upload de imagens utilizando Cloudinary
- Sistema de avaliação por estrelas
- Comentários nas receitas

**Módulo de Dashboard**

Este módulo é responsável por oferecer ao usuário uma visão geral da plataforma assim que ele acessa o sistema.
Pode incluir:

- Destaques de receitas
- Receitas recentes ou mais bem avaliadas
- Sugestões personalizadas
- Informações do usuário logado
- Navegação central para as principais áreas da aplicação

## 6.3 Fluxo de uma Operação Importante

### Fluxo da Operação: Cadastro de Receita

1. O usuário acessa a tela de cadastro de receitas.  
No front-end, o usuário entra na página onde existe um formulário para adicionar uma nova receita.

2. O usuário preenche os campos obrigatórios.  

Ele informa:

Nome da receita
Ingredientes
Modo de preparo
Foto (opcional)
Categoria 

3. O front-end envia uma requisição POST à API.  
Ao clicar em Salvar, o front-end chama o serviço responsável, enviando um JSON contendo os dados da receita (ou multipart/form-data se houver foto).


4. O back-end valida os dados.  

O servidor verifica:

- Se todos os campos obrigatórios foram preenchidos;
- Se o usuário está autenticado (caso a rota seja protegida);
- Se o formato dos dados está correto.
- Se falhar, retorna um erro apropriado (400, 401, etc).

5. Os dados são salvos no banco de dados.  
Após passar pela validação, o back-end cria um novo registro de receita utilizando o ORM ou queries diretas.
Se houver imagem, ela é enviada para o Cloudinary e o link é salvo junto.

6. O back-end retorna uma resposta de sucesso.  
7. O front-end exibe uma mensagem de confirmação.
 redireciona o usuário para a lista de receitas  

---

# 7. Guia de Instalação e Execução

## 7.1 Pré-requisitos

Antes de instalar e executar o projeto, certifique-se de que o ambiente possui os seguintes requisitos:

### Node.js  
- Versão mínima recomendada: **18.x** ou superior  
- Necessário para rodar tanto o back-end quanto o front-end

### npm ou yarn  
- O **npm** já acompanha o Node.js por padrão  
- Opcionalmente, é possível utilizar **yarn** como gerenciador de pacotes

### Git  
- Utilizado para clonar o repositório do projeto e gerenciar versões do código

### Banco de Dados  
- O sistema utiliza **Prisma ORM**, compatível com múltiplos bancos  
- Durante o desenvolvimento, pode ser usado:  
  - **SQLite** (padrão em ambientes simples)  
  - **PostgreSQL** (caso configurado no `.env`)

### Dependências Complementares  
- **Prisma CLI** (instalado automaticamente via `npm install`)  
- **Cloudinary** (conta opcional para upload de imagens)  
- Ferramenta para testes de API (opcional):  
  - Insomnia  
  - Postman  
  - Thunder Client (VS Code)

## 7.2 Como Clonar o Repositório

Exemplo:

    https://github.com/Natiel777/Projeto_Receitas.git

Depois, informe como entrar na pasta correta:

    cd Projeto_Receitas

## 7.3 Instalação e Execução do Back-end


    cd backend (Entra no diretório onde está localizado o código do servidor.)
    npm install (Baixa e instala todas as bibliotecas listadas no package.json para que o back-end funcione corretamente.)
    npx prisma generate (Cria ou atualiza o Prisma Client, permitindo que o servidor acesse o banco de dados.)
    npx prisma migrate dev (Cria as tabelas definidas no schema.prisma, Aplica migrações pendentes e Mantém o banco de dados sincronizado com o código)
    npm start (Inicia a API usando o arquivo principal server.js ).


## 7.4 Instalação e Execução do Front-end

    cd frontend (Entra no diretório onde está o código do seu front-end (React) )
    npm install (Instalar as dependências do projeto)
    npm start (iniciar o servidor de desenvolvimento)

## 7.5 Variáveis de Ambiente

Liste as variáveis necessárias (se existirem) e um exemplo de arquivo `.env` (sem expor senhas reais):

Exemplo:

      CLOUDINARY_API_SECRET=9teN36Ll1MnEAG1FgmqBDE9J9wQ
      CLOUDINARY_CLOUD_NAME=dgtmxawby
      DATABASE_URL=postgresql://sua_receita_db_user:WErQrgzwk4AoUddTJAJNO6PZ2dawVdSo@dpg-d4k66k0gjchc739vb580-a/sua_receita_db
      EMAIL_USER=suareceita.resetsenha@gmail.com
      FRONTEND_URL=https://www-suareceita.onrender.com
      JWT_SECRET=abc123def456ghi789jkl012mno345pq
      NODE_ENV=production
      SENDGRID_API_KEY=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

O .env deve ser criado Na raiz da pasta do back-end

---

# 8. Manual do Usuário

> Esta seção é voltada para o usuário final. Use linguagem simples e, se possível, prints de tela.

## 8.1 Tela Inicial

Descreva o que o usuário vê ao acessar o sistema pela primeira vez.

- Menu home
- Barra de navegação com logo e menu hambúguer 
- Lista com receitas mais recentes
- Campo para busca de receitas
- rodapé

## 8.2 Login e Cadastro

Explique como:

### Criar uma conta 
Clique no menu hambúguer que esta localizado barra de navegção do Dashboard e clique na opção registrar.

Preencha os campos obrigatórios:

- Nome
- E-mail válido
- Senha

No final clicar no botão "Criar Conta"

### Fazer login  
Clique no menu hambúguer que esta localizado barra de navegção do Dashboard e clique na opção Entrar.

Preencha os campos obrigatórios:

- E-mail utilizado
- Senha

No final clicar no botão "Entrar"

## 8.3 Cadastro de  Receitas

 Clique no menu hambúguer que esta localizado barra de navegção do Dashboard e clique na opção Nova Receita (Deve estar autenticado).

 Preencha os campos obrigatórios:

 – Título da receita.
 - Categoria da receita
 - Ingredientes
 - Modo de preparo
 - Imagem (Opcional)


## 8.4 Edição e Exclusão

Acesse o Dashboard ou pelo menu hambúguer pela opção Minhas Receitas para ter acesso a receita a ser editada ou excluida (Você deve estar autenticado).

- Clicar no botão editar ou excluir  
- Alterar os campos desejados ou excluir.  
- Salvar as alterações.  

## 8.5 Erros Comuns e Soluções

Liste alguns erros simples que o usuário pode encontrar e o que fazer:

- “Preencha todos os campos obrigatórios.” – Solução: revisar o formulário.  
- “Formato inválido” – Solução: verificar se o dado segue o formato esperado.  
- “E-mail ou senha incorretos.” – Solução: conferir credenciais ou recuperar senha.
- “Erro ao enviar imagem.” – Solução: checar formato/tamanho da imagem e tentar novamente.
- “Nenhuma receita encontrada.” – Solução: revisar a busca ou atualizar a página.
---

# 9. Decisões de Projeto e Limitações

## 9.1 Decisões Importantes

- React – escolhido pela facilidade de criar interfaces dinâmicas e reutilização de componentes.
- Node.js + Express – usado para construir uma API rápida e escalável, com fácil integração com o front-end.
- Prisma (ORM) – utilizado para simplificar operações com o banco de dados, facilitar migrations e validações.
- Outras decisões – arquitetura modular, separação de responsabilidades (routes, controllers, services), uso de Tailwind CSS para estilização rápida e consistente.

## 9.2 Limitações da Versão Atual

- Funcionalidades planejadas que ficaram de fora: sistema de favoritos/curtidas em receitas.
- Melhorias desejadas: filtros avançados por ingredientes e interface mais interativa.
- Restrições técnicas: upload de imagens limitado a formatos específicos; algumas validações realizadas apenas no front-end.

---

# 10. Testes Unitários com Jest

Esta seção apresenta os testes unitários implementados com o framework **Jest**, conforme estudado na Semana 6 da disciplina. Esses testes permitem validar partes importantes da lógica do sistema e garantir que funções essenciais continuem funcionando corretamente mesmo após alterações no código.

## 10.1 Objetivo dos Testes

Os testes unitários foram criados para:

- Validar funções isoladas do sistema;
- Verificar cenários de erro e entradas inválidas;
- Garantir que regras principais se comportem corretamente;
- Detectar regressões quando o código é modificado;
- Aumentar a confiabilidade geral do sistema.

## 10.2 Tecnologias Utilizadas

- Jest — framework de testes unitários para JavaScript;
- Node.js — ambiente para execução dos testes.

## 10.3 Como Executar os Testes

Antes de rodar os testes, instale as dependências:

    npm install

Para executar os testes:

    npm test

Ou, caso o script tenha outro nome:

    npm run test

O Jest reconhece automaticamente arquivos com os seguintes padrões:

    *.test.js
    *.spec.js

## 10.4 Organização dos Arquivos de Teste

Os arquivos de teste foram organizados em uma das pastas:

    /backend/tests


A estrutura típica de um teste é:

    describe("nomeDaFuncao", () => {
      test("deve executar o comportamento esperado", () => {
        // código do teste
      });
    });

## 10.5 Testes Implementados no Projeto

Os testes desenvolvidos incluem:

- Verificação de campos obrigatórios;
- Checagem de dados vazios ou inválidos;
- Testes de funções de regra de negócio;
- Testes de funções utilitárias internas;
- Verificação de comportamentos esperados em operações essenciais.

Exemplos de verificações comuns:

- Nome vazio deve retornar erro;
- Funções devem retornar valores corretos;
- Validações devem detectar campos inválidos.

## 10.6 Exemplo de Teste Criado

      describe("Login de Usuário", () => {
         const email = `teste_login_${Date.now()}@mail.com`;
         const senha = "123456";

       test("Deve realizar o login com credenciais válidas e retornar um token (Status 200)", async () => {
    const res = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha });

## 10.7 Benefícios dos Testes Unitários

Os principais benefícios percebidos foram:

- Mais segurança ao refatorar o código;
- Menor chance de erros passarem despercebidos;
- Verificação automática dos comportamentos esperados;
- Melhor entendimento das regras internas do sistema;
- Maior qualidade geral do software entregue.

# 11. Referências

Liste os materiais utilizados como base:

- DOMÍNGUEZ, A. H. *Engenharia de Software.* UAB – Universidade Federal de Alagoas, 2010.  
- GUDWIN, R. R. *Engenharia de Software: Uma Visão Prática.* Faculdade de Engenharia Elétrica e de Computação – UNICAMP, 2015.  
- CALAZANS, A. T. S. *Engenharia e Projeto de Sistemas.* Instituto Federal de Brasília, 2011.  
- Documentações oficiais das tecnologias utilizadas (React, Node.js, Express, SQLite, etc.).  
- Outras fontes em meio eletrônico, inclusive ferramentas de Inteligência Artificial utilizadas como apoio durante o desenvolvimento do projeto.

---

_Fim da documentação._
