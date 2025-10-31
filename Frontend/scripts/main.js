import { carregarReceitas } from "./app.js";
import { obterCookie, apagarCookie, mostrarErro } from "./ui.js";

const token = obterCookie("token");
const usuarioNome = obterCookie("usuarioNome");
const usuarioId = obterCookie("usuarioId");
const usuario = token ? { id: Number(usuarioId), nome: usuarioNome } : null;

window.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.getElementById("btn-logout");
  const userInfo = document.getElementById("user-info");
  const btnLogin = document.getElementById("btn-login");
  const btnCadastro = document.getElementById("btn-cadastro");

  // Menu Exibição
  if (usuario) {
    userInfo.textContent = `👋 Olá, ${usuario.nome}`;
    btnLogout?.classList.remove("hidden");
    btnLogin?.classList.add("hidden");
    btnCadastro?.classList.add("hidden");
  }

  btnLogout?.addEventListener("click", () => {
    apagarCookie("token");
    apagarCookie("usuarioNome");
    apagarCookie("usuarioId");
    window.location.href = "index.html";
  });

  // Página Inicial
  if (document.body.contains(document.getElementById("receitas"))) {
    carregarReceitas(usuario);
  }

  // Página Publicar
  if (document.body.contains(document.getElementById("form-receita"))) {
    if (!token) {
      alert("Você precisa estar logado para publicar uma receita.");
      window.location.href = "login.html";
      return;
    }

    const form = document.getElementById("form-receita");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dados = new FormData(form);
      try {
        const res = await fetch("http://localhost:3001/api/receitas", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: dados,
        });

        if (!res.ok) throw new Error("Erro ao publicar receita");
        alert("Receita publicada com sucesso!");
        window.location.href = "index.html";
      } catch (err) {
        mostrarErro(err.message);
      }
    });
  }
});