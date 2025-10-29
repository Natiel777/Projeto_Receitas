export const tratarErros = (err, req, res, next) => {
  console.error("Erro no servidor:", err);
  res.status(500).json({ erro: "Erro interno no servidor" });
};
