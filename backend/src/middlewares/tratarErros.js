const tratarErros = (err, req, res, next) => {
  console.error("Erro:", err.message || err);
  res.status(500).json({ erro: "Erro interno do servidor" });
};

module.exports = tratarErros;
