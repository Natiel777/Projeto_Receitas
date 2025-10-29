const API_URL = "http://localhost:3001/api";

export async function getReceitas() {
  const res = await fetch(`${API_URL}/receitas`);
  if (!res.ok) throw new Error("Erro ao carregar receitas");
  return res.json();
}

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
