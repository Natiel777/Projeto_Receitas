export function renderReceitas(receitas, usuario) {
  const container = document.getElementById("receitas");
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

export function definirCookie(nome, valor, dias = 1) {
  const data = new Date();
  data.setTime(data.getTime() + dias * 24 * 60 * 60 * 1000);
  document.cookie = `${nome}=${valor}; expires=${data.toUTCString()}; path=/; Secure; SameSite=Strict`;
}

export function obterCookie(nome) {
  const nomeEQ = `${nome}=`;
  const partes = document.cookie.split("; ");
  for (let parte of partes) {
    if (parte.startsWith(nomeEQ)) return parte.substring(nomeEQ.length);
  }
  return null;
}

export function apagarCookie(nome) {
  document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
}