import { apiGet, apiPost, apiDelete } from './api.js';

const lista = document.getElementById('receitas-lista');
if (lista) {
  const receitas = await apiGet('/receitas');
  lista.innerHTML = receitas.map(r => `
    <div>
      <h3>${r.titulo}</h3>
      ${r.imagem ? `<img class="receita-img" src="http://localhost:3000/uploads/${r.imagem}">` : ''}
      <p><strong>Ingredientes:</strong> ${r.ingredientes}</p>
      <p><strong>Modo de preparo:</strong> ${r.modo_preparo}</p>
      <p><em>Autor: ${r.autor}</em></p>

      <input type="number" min="1" max="5" placeholder="Nota (1-5)" id="nota-${r.id}">
      <button onclick="avaliar(${r.id})">Avaliar</button>
      <button onclick="excluir(${r.id})">Excluir</button>
    </div>
  `).join('');
}

// Avaliar receita
window.avaliar = async (id) => {
  const nota = document.getElementById(`nota-${id}`).value;
  await apiPost(`/avaliar/${id}`, { nota });
  alert('Avaliação enviada!');
};

// Excluir receita
window.excluir = async (id) => {
  if (confirm('Excluir esta receita?')) {
    await apiDelete(`/receitas/${id}`);
    alert('Receita excluída!');
    location.reload();
  }
};