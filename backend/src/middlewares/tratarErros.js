const tratarErros = (err, req, res, next) => {
  console.error("Erro:", err.message || err);
  res.status(500).json({ erro: "Erro do Servidor Interno" });
};

module.exports = tratarErros;
