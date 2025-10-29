// Página inicial
import { carregarReceitas } from "./app.js";
import { cadastrarUsuario, loginUsuario } from "./api.js";

window.addEventListener("DOMContentLoaded", () => {
  carregarReceitas();

  // Formulário de cadastro
  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dados = Object.fromEntries(new FormData(formCadastro));
      try {
        const resposta = await cadastrarUsuario(dados);
        if (resposta.erro) {
          alert(resposta.erro);
        } else {
          alert("Cadastro realizado com sucesso!");
          window.location.href = "login.html";
        }
      } catch {
        alert("Erro ao conectar ao servidor");
      }
    });
  }

  // Formulário de login
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dados = Object.fromEntries(new FormData(formLogin));
      try {
        const resposta = await loginUsuario(dados);
        if (resposta.token) {
          localStorage.setItem("token", resposta.token);
          alert("Login realizado com sucesso!");
          window.location.href = "index.html";
        } else {
          alert(resposta.erro || "Falha ao fazer login");
        }
      } catch {
        alert("Erro ao conectar ao servidor");
      }
    });
  }
});