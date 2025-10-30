import { carregarReceitas } from "./app.js";
import { renderReceitas } from "./ui.js";

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  let usuario = null;
  if (token) {
    // decodificar payload simples do JWT
    const payload = JSON.parse(atob(token.split(".")[1]));
    usuario = payload;
  }

  carregarReceitas(usuario);

  // Publicar receita
  const form = document.getElementById("publicar-form");
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const formData = new FormData(form);

      if (!usuario) {
        window.location.href = "login.html";
        return;
      }

      formData.set("autor", formData.get("autor") || usuario.nome);

      try {
        const res = await fetch("/api/receitas", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData
        });

        if (!res.ok) throw new Error("Erro ao publicar receita");
        alert("Receita publicada com sucesso!");
        window.location.href = "index.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  document.getElementById("btn-cancel")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});