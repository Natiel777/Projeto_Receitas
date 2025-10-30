const API_URL = "http://localhost:3001/api";

// RECEITAS
export async function getReceitas() {
  const res = await fetch(`${API_URL}/receitas`);
  if (!res.ok) throw new Error("Erro ao carregar receitas");
  return res.json();
}

export async function publicarReceita(receita) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/receitas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(receita),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ erro: "Erro ao publicar" }));
    throw new Error(err.erro || "Falha ao publicar receita");
  }
  return res.json();
}

// USUÁRIOS
export async function cadastrarUsuario(dados) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function loginUsuario(dados) {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

// SESSÃO
export function obterUsuarioSessao() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const [, payload] = token.split(".");
    const dados = JSON.parse(atob(payload));
    return dados?.usuario || null;
  } catch {
    return null;
  }
}

export function limparSessao() {
  localStorage.removeItem("token");
}