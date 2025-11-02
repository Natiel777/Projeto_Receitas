import { apiGet, apiPost, apiDelete, apiPut } from './api.js';

export function renderNavFromLocal(user) {
  const nav = document.getElementById('nav-links');
  if (!nav) return;
  nav.innerHTML = `
    <a href="index.html">Início</a>
    ${user && user.id
      ? `<span class="usuario-logado">Olá! ${user.nome}</span>
         <a href="publicar.html">Publicar</a>
         <a href="perfil.html">Perfil</a>
         <button id="logout-btn">Sair</button>`
      : `<a href="cadastro.html">Cadastro</a><a href="login.html">Entrar</a>`}
  `;
}

export async function carregarReceitas() {
  const lista = document.getElementById('receitas-lista');
  if (!lista) return;
  const receitas = await apiGet('/receitas');
  lista.innerHTML = receitas.length
    ? receitas.map(r => cardHTML(r)).join('')
    : '<p>Nenhuma receita publicada.</p>';
  initStars();
  initExcluirBtns();
}

export async function carregarMinhasReceitas() {
  const u = JSON.parse(localStorage.getItem('usuario') || 'null');
  const lista = document.getElementById('minhas-receitas-lista');
  if (!lista) return;
  const todas = await apiGet('/receitas');
  const minhas = todas.filter(r => String(r.autor_id) === String(u?.id));
  lista.innerHTML = minhas.length
    ? minhas.map(r => `
        <div class="receita-card" data-id="${r.id}">
          <h4>${r.titulo}</h4>
          ${r.imagem ? `<img src="http://localhost:3000/uploads/${r.imagem}">` : ''}
          <p><b>Ingredientes:</b> ${r.ingredientes}</p>
          <p><b>Modo:</b> ${r.modo_preparo}</p>
          <p>Média: ${(r.media_avaliacao || 0).toFixed(1)} ⭐</p>
          <div>
            <button class="editar" data-id="${r.id}">Editar</button>
            <button class="excluir" data-id="${r.id}">Excluir</button>
          </div>
        </div>`).join('')
    : '<p>Você não publicou nenhuma receita.</p>';

  document.querySelectorAll('.editar').forEach(btn =>
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const todas = await apiGet('/receitas');
      const r = todas.find(x => String(x.id) === id);
      if (!r) return;
      const t = prompt('Título', r.titulo) || r.titulo;
      const i = prompt('Ingredientes', r.ingredientes) || r.ingredientes;
      const m = prompt('Modo', r.modo_preparo) || r.modo_preparo;
      const res = await apiPut(`/receitas/${id}`, { titulo: t, ingredientes: i, modo_preparo: m });
      if (res.msg) {
        alert('Atualizada!');
        carregarMinhasReceitas();
      } else alert(res.erro || 'Erro');
    })
  );

  document.querySelectorAll('.excluir').forEach(btn =>
    btn.addEventListener('click', async () => {
      if (!confirm('Excluir?')) return;
      const res = await apiDelete(`/receitas/${btn.dataset.id}`);
      if (res.msg) {
        alert('Excluída!');
        carregarMinhasReceitas();
      } else alert(res.erro || 'Erro');
    })
  );
}

function cardHTML(r) {
  const media = r.media_avaliacao || 0;
  const estrelasCheias = Math.round(media);
  return `
    <div class="receita-card" data-id="${r.id}">
      <h3>${r.titulo}</h3>
      ${r.imagem ? `<img src="http://localhost:3000/uploads/${r.imagem}">` : ''}
      <p><b>Ingredientes:</b> ${r.ingredientes}</p>
      <p><b>Modo:</b> ${r.modo_preparo}</p>
      <p><i>Autor: ${r.autor}</i></p>
      <div class="media-avaliacao">
        Média: ${media.toFixed(1)} ⭐
        ${[1,2,3,4,5].map(n => n <= estrelasCheias ? '★' : '☆').join('')}
      </div>
      <div class="stars" data-id="${r.id}">
        ${[1,2,3,4,5].map(n => `<span class="star" data-value="${n}">★</span>`).join('')}
      </div>
    </div>`;
}

function initStars() {
  document.querySelectorAll('.stars').forEach(c => {
    const id = c.dataset.id;
    const stars = c.querySelectorAll('.star');
    stars.forEach((s, i) => {
      s.addEventListener('click', async () => {
        const nota = s.dataset.value;
        const res = await apiPost(`/avaliar/${id}`, { nota });
        if (res.msg) {
          alert(`Avaliou com ${nota}⭐`);
          carregarReceitas();
        }
      });
      s.addEventListener('mouseover', () => {
        stars.forEach(st => st.classList.remove('selected'));
        for (let j = 0; j <= i; j++) stars[j].classList.add('selected');
      });
      s.addEventListener('mouseout', () => stars.forEach(st => st.classList.remove('selected')));
    });
  });
}

function initExcluirBtns() {
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Excluir receita?')) return;
      const res = await apiDelete(`/receitas/${btn.dataset.id}`);
      if (res.msg) carregarReceitas();
      else alert(res.erro || 'Erro');
    });
  });
}