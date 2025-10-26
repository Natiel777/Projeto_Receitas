const API_BASE_URL = "http://localhost:5000/api";

export async function getReceitas() {
    try {
        const response = await fetch(`${API_BASE_URL}/receitas`);
        if (!response.ok) {
            console.error(`Erro ao buscar receitas: Status ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error("Erro de conexão com o servidor:", error);
        return null;
    }
}

export async function fazerLogin(nome, senha) {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, senha })
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error("Erro na comunicação com a API de login:", error);
        return { success: false, data: { mensagem: "Erro de rede" } };
    }
}

export async function fazerCadastro(nome, senha) {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, senha })
        });

        const data = await response.json();
        return { success: response.ok, data };

    } catch (error) {
        console.error("Erro na comunicação com a API de cadastro:", error);
        return { success: false, data: { mensagem: "Erro de rede" } };
    }
}

export async function listarUsuariosApi() {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`);
        if (!response.ok) {
             console.error(`Erro ao listar usuários: Status ${response.status}`);
             return null;
        }
        return await response.json();
    } catch (error) {
        console.error("Erro de conexão com o servidor ao listar usuários:", error);
        return null;
    }
}