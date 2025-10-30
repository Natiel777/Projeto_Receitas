export function renderReceitas(receitas, usuarioLogado) {
  const container = document.getElementById("receitas");
  if (!receitas.length) {
    container.innerHTML = "<p>Nenhuma receita cadastrada ainda 🍽️</p>";
    return;
  }

  container.innerHTML = receitas.map(r => `
    <div class="card" data-id="${r.id}">
      <img src="${r.imagem || 'https://placehold.co/600x400?text=Receita'}" alt="${r.nome}">
      <div class="info">
        <h3>${r.nome}</h3>
        <p>${r.descricao || "Sem descrição disponível."}</p>
        <p><strong>Autor:</strong> ${r.autor || "Anônimo"}</p>

        ${usuarioLogado && r.usuario_id === usuarioLogado.id
          ? `<button class="btn-excluir">Excluir</button>` : ""}

        <div class="avaliacao">
          <label>Avaliar:</label>
          <select class="nota">
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐⭐</option>
            <option value="3">3 ⭐⭐⭐</option>
            <option value="4">4 ⭐⭐⭐⭐</option>
            <option value="5">5 ⭐⭐⭐⭐⭐</option>
          </select>
          <button class="btn-avaliar">Enviar</button>
        </div>
      </div>
    </div>
  `).join("");

  // Excluir
  container.querySelectorAll(".btn-excluir").forEach(btn => {
    btn.addEventListener("click", async e => {
      const card = e.target.closest(".card");
      const id = card.dataset.id;
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`/api/receitas/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Não foi possível excluir");
        card.remove();
        alert("Receita excluída!");
      } catch (err) {
        alert(err.message);
      }
    });
  });

  // Avaliar
  container.querySelectorAll(".btn-avaliar").forEach(btn => {
    btn.addEventListener("click", async e => {
      const card = e.target.closest(".card");
      const id = card.dataset.id;
      const nota = card.querySelector(".nota").value;
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/avaliacoes", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ receita_id: id, nota: parseInt(nota) })
        });
        if (!res.ok) throw new Error("Erro ao enviar avaliação");
        alert("Avaliação enviada!");
      } catch (err) {
        alert(err.message);
      }
    });
  });
}