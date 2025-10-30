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

// Publicar receita
import { publicarReceita, obterUsuarioSessao, limparSessao } from "scripts/api.js";
import { carregarReceitas } from "scripts/app.js";
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("publicar-form");

// Validar sessão
  const usuario = obterUsuarioSessao();
  if (!usuario) {
    // não logado -> redireciona para cadastro
    window.location.href = "cadastro.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const receita = {
      nome: (fd.get("nome") || "").toString().trim(),
      descricao: (fd.get("descricao") || "").toString().trim(),
      imagem: (fd.get("imagem") || "").toString().trim(),
      autor: (fd.get("autor") || usuario.nome).toString().trim(),
      usuario_id: usuario.id
    };

    try {
      await publicarReceita(receita);
// Redireciona para página inicial
      window.location.href = "index.html";
    } catch (err) {
      alert(err.message || "Erro ao publicar receita");
// Se credenciais expiradas/usuário inválido, limpar sessão e redirecionar
      if (err.message && err.message.toLowerCase().includes("usuario_id inválido")) {
        limparSessao();
        window.location.href = "login.html";
      }
    }
  });

  document.getElementById("btn-cancel").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

// Função para publicar receita
export async function publicarReceita(receita) {
  const res = await fetch("/api/receitas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(receita),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ erro: "Erro ao publicar" }));
    throw new Error(err.erro || "Falha ao publicar receita");
  }
  return res.json();
}

// Obter receitas do usuário
export async function obterMinhasReceitas(usuario_id) {
  const res = await fetch(`/api/receitas/mine?usuario_id=${encodeURIComponent(usuario_id)}`);
  if (!res.ok) throw new Error("Erro ao buscar receitas do usuário");
  return res.json();
}
