export const renderUsuarios = (usuarios) => {
  const container = document.getElementById("app");
  container.innerHTML = "<h2>Usuários</h2>" + usuarios.map(u => `<p>${u.nome} (${u.email})</p>`).join("");
};
