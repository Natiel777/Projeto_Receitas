export function renderReceitas(receitas) {
  const container = document.getElementById("receitas");
  if (!container) return;

  if (!receitas || !receitas.length) {
    container.innerHTML = "<p>Nenhuma receita cadastrada ainda 🍽️</p>";
    return;
  }

  container.innerHTML = receitas.map(r => `
    <div class="card">
      <img src="${r.imagem || 'https://placehold.co/600x400?text=Receita'}" alt="${r.nome}">
      <div class="info">
        <h3>${r.nome}</h3>
        <p>${r.descricao || "Sem descrição disponível."}</p>
        <p><strong>Autor:</strong> ${r.autor || "Anônimo"}</p>
      </div>
    </div>
  `).join("");
}

export function mostrarErro(mensagem) {
  const container = document.getElementById("receitas");
  if (!container) return;
  container.innerHTML = `<p class="erro">${mensagem}</p>`;
}