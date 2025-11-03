const grid = document.getElementById("receitasGrid");

async function carregarReceitas() {
  const res = await fetch("http://localhost:3000/receitas");
  const receitas = await res.json();

  grid.innerHTML = "";
  receitas.forEach(r => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${r.imagem}" alt="${r.titulo}">
      <h3>${r.titulo}</h3>
      <p>${r.descricao}</p>
      <p>Média de Avaliações: ${r.media} ⭐</p>
      <button onclick="abrirDetalhe('${r._id}')">Ver detalhes</button>
    `;
    grid.appendChild(card);
  });
}

function abrirDetalhe(id) {
  localStorage.setItem("receitaIdAtual", id);
  window.location.href = "detalheReceita.html";
}

window.addEventListener("DOMContentLoaded", carregarReceitas);