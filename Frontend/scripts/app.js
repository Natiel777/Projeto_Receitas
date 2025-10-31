import { getReceitas } from "./api.js";
import { renderReceitas, mostrarErro } from "./ui.js";

export async function carregarReceitas(usuario) {
  try {
    const receitas = await getReceitas();
    renderReceitas(receitas, usuario);
  } catch (err) {
    mostrarErro("Erro ao carregar receitas.");
  }
}