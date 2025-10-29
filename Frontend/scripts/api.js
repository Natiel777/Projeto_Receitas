const API_URL = "http://localhost:3001/api";

export const listarUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
};
