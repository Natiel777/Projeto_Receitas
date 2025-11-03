// Excluir receita
async function excluirReceita(id) {
  const token = localStorage.getItem("token");
  if (!confirm("Deseja realmente excluir esta receita?")) return;

  const res = await fetch(`http://localhost:3000/receitas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    alert("Receita excluída!");
    window.location.href = "index.html";
  } else {
    const data = await res.json();
    alert(data.error || "Erro ao excluir receita");
  }
}

// Editar receita
async function editarReceita(id, titulo, descricao, imagemFile) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("titulo", titulo);
  formData.append("descricao", descricao);
  if (imagemFile) formData.append("imagem", imagemFile);

  const res = await fetch(`http://localhost:3000/receitas/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (res.ok) {
    alert("Receita atualizada!");
    window.location.reload();
  } else {
    const data = await res.json();
    alert(data.error || "Erro ao atualizar receita");
  }
}