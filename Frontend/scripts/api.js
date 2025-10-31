const BASE_URL = "http://localhost:3001/api";

export async function getReceitas() {
  const res = await fetch(`${BASE_URL}/receitas`);
  if (!res.ok) throw new Error("Erro ao buscar receitas");
  return res.json();
}

export async function login(email, senha) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });
  if (!res.ok) throw new Error("Login inválido");
  return res.json();
}

export async function cadastrar(nome, email, senha) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });
  if (!res.ok) throw new Error("Erro ao cadastrar");
  return res.json();
}