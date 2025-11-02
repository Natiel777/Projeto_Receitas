// Detecta URL do Backend
const BASE_URL = window.location.origin.includes("localhost")
  ? "http://localhost:3001/api"  // backend local
  : `${window.location.origin}/api`;

// Função para buscar receitas
export async function getReceitas() {
  const res = await fetch(`${BASE_URL}/receitas`);
  if (!res.ok) throw new Error("Erro ao buscar receitas");
  return res.json();
}

export async function buscarReceitas(q) {
  const res = await fetch(`${BASE_URL}/receitas?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Erro ao buscar receitas");
  return res.json();
}

// Função login
export async function login(email, senha) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });
  if (!res.ok) throw new Error("Login inválido");
  return res.json();
}

// Função cadastro
export async function cadastrar(nome, email, senha) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });
  if (!res.ok) throw new Error("Erro ao cadastrar");
  return res.json();
}