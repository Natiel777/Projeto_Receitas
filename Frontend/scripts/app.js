import { getReceitas } from "./api.js";
import { renderReceitas, mostrarErro } from "./ui.js";

export async function carregarReceitas() {
  try {
    const receitas = await getReceitas();
    renderReceitas(receitas);
  } catch (erro) {
    console.error(erro);
    mostrarErro("Erro ao carregar as receitas!");
  }
}