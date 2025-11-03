if (!localStorage.getItem("token")) {
  alert("Faça login para acessar esta página!");
  window.location.href = "login.html";
}

const form = document.getElementById("editarPerfilForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const nome = document.getElementById("nome").value;
  const imagemFile = document.getElementById("profilePicture").files[0];

  const formData = new FormData();
  formData.append("nome", nome);
  if (imagemFile) formData.append("profilePicture", imagemFile);

  const res = await fetch("http://localhost:3000/profile/editar", {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (res.ok) {
    alert("Perfil atualizado!");
    window.location.reload();
  } else {
    const data = await res.json();
    alert(data.error || "Erro ao atualizar perfil");
  }
});

document.getElementById("excluirConta").addEventListener("click", async () => {
  if (!confirm("Deseja realmente excluir sua conta?")) return;
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/profile/excluir", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    alert("Conta excluída!");
    localStorage.removeItem("token");
    window.location.href = "index.html";
  } else {
    const data = await res.json();
    alert(data.error || "Erro ao excluir conta");
  }
});