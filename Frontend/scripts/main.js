import { carregarReceitas } from "./app.js";
import { obterCookie, apagarCookie, definirCookie, mostrarErro } from "./ui.js";
import { login, cadastrar } from "./api.js";

const token = obterCookie("token");
const usuarioNome = obterCookie("usuarioNome");
const usuarioId = obterCookie("usuarioId");
const usuario = token ? { id: Number(usuarioId), nome: usuarioNome } : null;

window.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.getElementById("btn-logout");
  const userInfo = document.getElementById("user-info");
  const btnLogin = document.getElementById("btn-login");
  const btnCadastro = document.getElementById("btn-cadastro");

  // Cabeçalho
  if (usuario) {
    userInfo.textContent = `Olá!, ${usuario.nome}`;
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
  if (document.getElementById("receitas")) {
    carregarReceitas(usuario);
  }

  // Página Login
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        const data = await login(email, senha);
        definirCookie("token", data.token);
        definirCookie("usuarioNome", data.nome);
        definirCookie("usuarioId", data.id);
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
      } catch {
        mostrarErro("Erro ao fazer login. Verifique suas credenciais.");
      }
    });
  }

  // Página Cadastro
  const formCadastro = document.getElementById("form-cadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        await cadastrar(nome, email, senha);
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } catch {
        mostrarErro("Erro ao cadastrar usuário.");
      }
    });
  }

  // Página Publicar
  const formReceita = document.getElementById("form-receita");
  if (formReceita) {
    if (!token) {
      alert("Você precisa estar logado para publicar uma receita.");
      window.location.href = "login.html";
      return;
    }

    formReceita.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dados = new FormData(formReceita);
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