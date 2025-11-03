if (!localStorage.getItem("token")) {
  alert("Faça login para acessar esta página!");
  window.location.href = "login.html";
}

const receitaId = localStorage.getItem("receitaIdAtual");

async function carregarReceita() {
  const res = await fetch("http://localhost:3000/receitas");
  const receitas = await res.json();
  const receita = receitas.find(r => r._id === receitaId);

  if (!receita) return;

  document.getElementBy