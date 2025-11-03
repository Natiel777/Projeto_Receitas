## Diagrama de Sequência – Cadastro de Usuário

**Descrição:** Representa a **sequência de interações** entre os componentes do sistema durante o **processo de cadastro de usuário**. Mostra a comunicação entre o **Visitante/Usuário**, a **Interface Web**, o **UsuarioController** e o **Model Usuario**.  

**Fluxo resumido:**
1. O **Visitante** preenche o formulário de cadastro (nome, email, senha) na **Interface Web**.  
2. A **Interface Web** envia os dados para o **UsuarioController**.  
3. O **UsuarioController** cria o **objeto Usuario** e valida os dados.  
4. O **Usuario** confirma a criação da conta ao **Controller**.  
5. O **UsuarioController** retorna sucesso para a **Interface Web**.  
6. A **Interface Web** exibe mensagem de confirmação ao visitante.  

**Atualizado em:** 02/11/2025 – Equipe 3

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
