const form = document.getElementById("editarPerfilForm");
const excluirBtn = document.getElementById("excluirConta");

async function carregarPerfil() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch("http://localhost:3000/profile/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const user = await res.json();
  document.getElementById("nome").value = user.nome;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("nome", document.getElementById("nome").value);
  const fileInput = document.getElementById("profilePicture");
  if (fileInput.files[0]) formData.append("profilePicture", fileInput.files[0]);

  const res = await fetch("http://localhost:3000/profile/editar", {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  const data = await res.json();
  alert("Perfil atualizado com sucesso!");
});

excluirBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

  await fetch("http://localhost:3000/profile/excluir", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  alert("Conta excluída!");
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

window.addEventListener("DOMContentLoaded", carregarPerfil);