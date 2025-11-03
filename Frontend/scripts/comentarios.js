const receitaId = localStorage.getItem("receitaIdAtual");
const listaComentarios = document.getElementById("listaComentarios");
const btnComentar = document.getElementById("btnComentar");
const novoComentario = document.getElementById("novoComentario");

async function carregarComentarios() {
  const res = await fetch(`http://localhost:3000/comentarios/${receitaId}`, { credentials: "include" });
  const data = await res.json();
  listaComentarios.innerHTML = data.map(c => `<p><b>${c.usuario_nome}</b>: ${c.texto}</p>`).join("");
}

btnComentar.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  if (!token) return alert("Faça login para comentar");

  await fetch(`http://localhost:3000/comentarios/${receitaId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ texto: novoComentario.value })
  });

  novoComentario.value = "";
  carregarComentarios();
});

window.addEventListener("DOMContentLoaded", carregarComentarios);