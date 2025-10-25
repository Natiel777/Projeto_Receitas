import { getReceitas } from "Scripts/api.js";
import { renderReceitas } from "Scripts/ui.js";

// função principal
async function carregarReceitas() {
  const receitas = await getReceitas(); // busca no backend
  renderReceitas(receitas); // mostra na tela
}

// botão pra recarregar receitas
document.getElementById("btnReceitas").addEventListener("click", carregarReceitas);

// carrega receitas automaticamente ao abrir
carregarReceitas();