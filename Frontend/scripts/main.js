import { carregarReceitas } from "./app.js";
import {
  cadastrarUsuario,
  loginUsuario,
  publicarReceita,
  obterUsuarioSessao,
  limparSessao,
} from "./api.js";

// Página Inicial
window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("index.html") || path === "/" || path === "") {
    carregarReceitas();
    configurarMenu();
  }

  if (path.includes("cadastro.html")) configurarCadastro();
  if (path.includes("login.html")) configurarLogin();
  if (path.includes("publicar.html")) configurarPublicar();
});

// Funções de Configuração
function configurarCadastro() {
  const form = document.getElementById("formCadastro");
  const msg = document.getElementById("msgCadastro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form));

    try {
      const resposta = await cadastrarUsuario(dados);
      if (resposta.erro) {
        msg.textContent = resposta.erro;
        msg.className = "msg erro";
      } else {
        msg.textContent = "Cadastro realizado com sucesso!";
        msg.className = "msg sucesso";
        setTimeout(() => (window.location.href = "login.html"), 1500);
      }
    } catch {
      msg.textContent = "Erro ao conectar ao servidor.";
      msg.className = "msg erro";
    }
  });
}

function configurarLogin() {
  const form = document.getElementById("formLogin");
  const msg = document.getElementById("msgLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form));

    try {
      const resposta = await loginUsuario(dados);
      if (resposta.token) {
        localStorage.setItem("token", resposta.token);
        msg.textContent = "Login realizado com sucesso!";
        msg.className = "msg sucesso";
        setTimeout(() => (window.location.href = "index.html"), 1000);
      } else {
        msg.textContent = resposta.erro || "Falha ao fazer login";
        msg.className = "msg erro";
      }
    } catch {
      msg.textContent = "Erro ao conectar ao servidor.";
      msg.className = "msg erro";
    }
  });
}

function configurarPublicar() {
  const form = document.getElementById("formPublicar");
  const btnCancelar = document.getElementById("btnCancelar");
  const msg = document.getElementById("msgPublicar");

  const usuario = obterUsuarioSessao();
  if (!usuario) {
    alert("Você precisa estar logado para publicar uma receita.");
    window.location.href = "login.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const receita = {
      nome: fd.get("nome"),
      descricao: fd.get("descricao"),
      imagem: fd.get("imagem"),
      autor: fd.get("autor") || usuario.nome,
    };

    try {
      await publicarReceita(receita);
      msg.textContent = "Receita publicada com sucesso!";
      msg.className = "msg sucesso";
      setTimeout(() => (window.location.href = "index.html"), 1500);
    } catch (err) {
      msg.textContent = err.message || "Erro ao publicar receita.";
      msg.className = "msg erro";
      if (err.message.toLowerCase().includes("usuário inválido")) {
        limparSessao();
        window.location.href = "login.html";
      }
    }
  });

  btnCancelar.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function configurarMenu() {
  const btnLogout = document.getElementById("btnLogout");
  const linkLogin = document.getElementById("linkLogin");
  const linkCadastro = document.getElementById("linkCadastro");
  const linkPublicar = document.getElementById("linkPublicar");

  const usuario = obterUsuarioSessao();

  if (usuario) {
    linkLogin.classList.add("hidden");
    linkCadastro.classList.add("hidden");
    btnLogout.classList.remove("hidden");
    linkPublicar.classList.remove("hidden");
  } else {
    linkLogin.classList.remove("hidden");
    linkCadastro.classList.remove("hidden");
    btnLogout.classList.add("hidden");
    linkPublicar.classList.add("hidden");
  }

  btnLogout.addEventListener("click", () => {
    limparSessao();
    window.location.reload();
  });
}