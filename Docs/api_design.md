# 📘 Design de API – Suas Receitas

Documento de planejamento da API REST do projeto.  
Define recursos, endpoints, formatos de requisição e respostas (JSON), antes da implementação.

---

## ✅ 1. Recursos da API

| Recurso | Descrição |
|---------|------------|
| `/usuarios`    | Cadastro, autenticação e gerenciamento de usuários (criação de perfil, login, edição, exclusão). |
| `/receitas` | CRUD de receitas: publicação, edição, listagem e exibição de detalhes. Também pode incluir imagens, ingredientes e modo de preparo. |
| `/categorias` | Organização e classificação das receitas (ex.: sobremesas, massas, carnes). |
| `/comentários` | Sistema de comentários nas receitas: usuários podem comentar, editar e excluir seus próprios comentários. |
| `/avaliações` | Avaliação das receitas por usuários, com nota (ex.: 1 a 5 estrelas) e média de avaliações da receita. |

---

## ✅ 2. Endpoints por Recurso

### 👤 Usuários

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Usuário | POST | `/usuarios` | Criar novo usuário |
| Usuário | GET | `/usuarios` | Listar usuários |
| Usuário | GET | `/usuarios/{id}` | Buscar usuário específico |
| Usuário | PUT | `/usuarios/{id}` | Atualizar usuário completo |
| Usuário | PATCH | `/usuarios/{id}` | Atualizar parcialmente |
| Usuário | DELETE | `/usuarios/{id}` | Remover usuário |

---

### 📘 Receitas

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Receita | POST | `/receitas` | Criar nova receita |
| Receita | GET | `/receitas` | Listar receitas |
| Receita | GET | `/receitas/{id}` | Buscar receita específica |
| Receita | PUT | `/receitas/{id}` | Atualizar receita |
| Receita | PATCH | `/receitas/{id}` | Atualizar parcialmente |
| Receita | DELETE | `/receitas/{id}` | Remover receita |

---

### 💬 Comentários

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Comentário | POST | `/comentarios` | Criar comentário |
| Comentário | GET | `/comentarios` | Listar comentários |
| Comentário | GET | `/comentarios/{id}` | Buscar comentário específico |
| Comentário | PUT | `/comentarios/{id}` | Atualizar comentário |
| Comentário | DELETE | `/comentarios/{id}` | Remover comentário |

---

### ⭐ Avaliações

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Avaliação | POST | `/avaliacoes` | Criar avaliação |
| Avaliação | GET | `/avaliacoes` | Listar avaliações |
| Avaliação | GET | `/avaliacoes/{id}` | Buscar avaliação específica |
| Avaliação | PUT | `/avaliacoes/{id}` | Atualizar avaliação |
| Avaliação | DELETE | `/avaliacoes/{id}` | Remover avaliação |

---

### 🏷️ Categorias

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Categoria | GET | `/categorias` | Listar categorias |
| Categoria | POST | `/categorias` | Criar nova categoria |
| Categoria | GET | `/categorias/{id}` | Buscar categoria específica |
| Categoria | PUT | `/categorias/{id}` | Atualizar categoria |
| Categoria | DELETE | `/categorias/{id}` | Remover categoria |

---

### 🔐 Autenticação

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Auth | POST | `/auth/register` | Registrar usuário |
| Auth | POST | `/auth/login` | Login |
| Auth | POST | `/auth/logout` | Logout |
| Auth | POST | `/auth/refresh` | Renovar token |
| Auth | POST | `/auth/recover` | Recuperar senha |

---

### 🔎 Busca

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Busca | GET | `/busca` | Buscar receitas com filtros |

---

### 🗂️ Uploads

| Recurso | Verbo | Endpoint | Descrição |
|---------|-------|----------|-----------|
| Upload | POST | `/uploads` | Enviar arquivo |
| Upload | DELETE | `/uploads/{id}` | Remover arquivo |

---

## ✅ 3. Estrutura de Requests e Responses (JSON)

# 👤 Usuários

**POST `/usuarios` — Criar usuário**

### Request Body (JSON):

```json
{
  "nome": "...",
  "email": "...",
  "senha": "..."
}

```

### Resposta 201 Created:

```json
{
  "id": 1,
  "nome": "...",
  "email": "...",
  "createdAt": "...",
  "updatedAt": "..."
}


```

### Resposta 400 Bad Request:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Email já está em uso."
}
```

### **POST `/auth/login` — Login**

### Request Body (JSON):
```json
{
  "email": "...",
  "senha": "..."
}
 ```


### Resposta 200 OK:
```json
{
  "token": "...",
  "usuario": {
    "id": 1,
    "nome": "...",
    "email": "..."
  }
}
```

### Resposta 401 Unauthorized:
```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Email ou senha incorretos."
}
```

---
# 📘 Receitas

**POST `/receitas` — Criar receita**

### **Request Body (JSON):**
```json
{
  "titulo": "...",
  "descricao": "...",
  "ingredientes": "...",
  "preparo": "...",
  "categoriaId": 1,
  "usuarioId": 1
}
```

### Resposta 201 Created:

```json
{
  "id": 1,
  "titulo": "...",
  "descricao": "...",
  "ingredientes": "...",
  "preparo": "...",
  "categoriaId": 1,
  "usuarioId": 1,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Resposta 400 Bad Request: 

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Título é obrigatório."
}
```
---

# 💬 Comentários


**POST `/comentarios` — Criar comentário**

### Request Body (JSON):

```json
{
  "texto": "...",
  "usuarioId": 1,
  "receitaId": 1
}
```
### Resposta 201 Created:

```json
{
  "id": 1,
  "texto": "...",
  "usuarioId": 1,
  "receitaId": 1,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Resposta 400 Bad Request:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Texto do comentário é obrigatório."
}
```
---

# ⭐ Avaliações

**POST `/avaliacoes` — Criar avaliação**

### Request Body (JSON):

```json
{
  "nota": 5,
  "comentario": "...",
  "usuarioId": 1,
  "receitaId": 1
}
```

### Resposta 201 Created:

```json
{
  "id": 1,
  "nota": 5,
  "comentario": "...",
  "usuarioId": 1,
  "receitaId": 1,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Resposta 400 Bad Request:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "A nota deve ser um valor entre 1 e 5."
}
```
---

# 🏷️ Categorias

**POST `/categorias` — Criar categoria**

### Request Body (JSON):

```json
{
  "nome": "Sobremesas"
}
```

### Resposta 201 Created:

```json
{
  "id": 1,
  "nome": "Sobremesas",
  "createdAt": "...",
  "updatedAt": "..."
}
```
### Resposta 400 Bad Request:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Nome da categoria é obrigatório."
}
```
---

# 🔐 Autenticação

**POST `/auth/login` — Login**

### Request Body (JSON):

```json
{
  "email": "...",
  "senha": "..."
}
```
### Resposta 200 OK:

```json
{
  "token": "...",
  "usuario": {
    "id": 1,
    "nome": "...",
    "email": "..."
  }
}
```

### Resposta 401 Unauthorized:

```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Email ou senha incorretos."
}
```
---

## 4. Status Codes por Rota

| Rota / Endpoint | Sucesso | Erros Possíveis |
|-----------------|---------|------------------|
| **POST /auth/login** | 200 OK | 400 (dados ausentes) <br> 401 (email ou senha incorretos) |
| **POST /usuarios** | 201 Created | 400 (dados inválidos) <br> 409 (email já cadastrado) |
| **GET /usuarios/{id}** | 200 OK | 404 (usuário não encontrado) |
| **PUT /usuarios/{id}** ou **PATCH /usuarios/{id}** | 200 OK ou 204 No Content | 400 (dados inválidos) <br> 404 (usuário não encontrado) |
| **DELETE /usuarios/{id}** | 204 No Content | 404 (usuário não encontrado) |
| **POST /receitas** | 201 Created | 400 (dados inválidos) <br> 401 (não autenticado) |
| **GET /receitas** | 200 OK | — |
| **GET /receitas/{id}** | 200 OK | 404 (receita não encontrada) |
| **PUT /receitas/{id}** | 200 OK | 400 (dados inválidos) <br> 401 (não autenticado) <br> 404 (receita não encontrada) |
| **DELETE /receitas/{id}** | 204 No Content | 401 (não autenticado) <br> 404 (receita não encontrada) |
| **GET /categorias** | 200 OK | — |
| **POST /categorias** | 201 Created | 400 (dados inválidos) <br> 409 (categoria já existe) |
| **POST /comentarios** | 201 Created | 400 (texto obrigatório) <br> 401 (não autenticado) <br> 404 (receita não encontrada) |
| **GET /receitas/{id}/comentarios** | 200 OK | 404 (receita não encontrada) |
| **POST /avaliacoes** | 201 Created | 400 (nota inválida) <br> 401 (não autenticado) <br> 404 (receita não encontrada) |
| **GET /receitas/{id}/avaliacoes** | 200 OK | 404 (receita não encontrada) |
| **GET /search?query=...** | 200 OK | 400 (query ausente) |
| **POST /uploads** | 201 Created | 400 (nenhum arquivo enviado) <br> 413 (arquivo muito grande) <br> 415 (tipo de arquivo não suportado) |

---
