export function renderReceitas(receitas, usuario) {
  const container = document.getElementById("receitas");
  if (!container) return;

  if (!receitas.length) {
    container.innerHTML = "<p>Nenhuma receita cadastrada!</p>";
    return;
  }

  container.innerHTML = receitas.map(r => `
    <div class="card" data-id="${r.id}">
      <img src="${r.imagem || 'https://placehold.co/600x400?text=Receita'}" alt="${r.nome}">
      <div class="info">
        <h3>${r.nome}</h3>
        <p>${r.descricao || "Sem descrição."}</p>
        <p><strong>Autor:</strong> ${r.autor || "Anônimo"}</p>

        ${usuario && r.usuario_id === usuario.id
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

  // Event delegation
  container.removeEventListener("click", handleContainerClick);
  container.addEventListener("click", handleContainerClick);
}

export function mostrarErro(msg) {
  const el = document.getElementById("msg");
  if (el) {
    el.textContent = msg;
    el.style.color = "red";
  } else {
    alert(msg);
  }
}

// Cookies
export function definirCookie(nome, valor, dias = 1) {
  const data = new Date();
  data.setTime(data.getTime() + dias * 24 * 60 * 60 * 1000);
  document.cookie = `${nome}=${valor}; expires=${data.toUTCString()}; path=/; SameSite=Strict`;
}

export function obterCookie(nome) {
  const nomeEQ = `${nome}=`;
  const partes = document.cookie ? document.cookie.split("; ") : [];
  for (let parte of partes) {
    if (parte.startsWith(nomeEQ)) return parte.substring(nomeEQ.length);
  }
  return null;
}

export function apagarCookie(nome) {
  document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

async function handleContainerClick(e) {
  const container = e.currentTarget;
  const token = obterCookie("token");
  if (e.target.matches(".btn-excluir")) {
    const card = e.target.closest(".card");
    const id = card?.dataset?.id;
    if (!id) return;
    if (!confirm("Confirma exclusão da receita?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/receitas/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) {
        const json = await res.json().catch(()=>({ erro: "Erro ao excluir" }));
        throw new Error(json.erro || "Erro ao excluir");
      }
      dispatchAcaoConcluida();
    } catch (err) {
      mostrarErro(err.message || "Erro ao excluir receita");
    }
  }

  if (e.target.matches(".btn-avaliar")) {
    const card = e.target.closest(".card");
    const id = card?.dataset?.id;
    if (!id) return;

    const select = card.querySelector(".nota");
    const nota = select?.value;
    const comentario = null; // campo comentário não implementado no HTML atual

    if (!token) {
      mostrarErro("Você precisa estar logado para avaliar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/avaliacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ receita_id: Number(id), nota: Number(nota), comentario })
      });
      if (!res.ok) {
        const json = await res.json().catch(()=>({ erro: "Erro ao avaliar" }));
        throw new Error(json.erro || "Erro ao avaliar");
      }
      dispatchAcaoConcluida();
    } catch (err) {
      mostrarErro(err.message || "Erro ao enviar avaliação");
    }
  }
}

function dispatchAcaoConcluida() {
  window.dispatchEvent(new CustomEvent("acaoConcluida"));
}