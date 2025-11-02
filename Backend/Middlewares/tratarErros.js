function tratarErros(err, req, res, next){
  console.error(err);
  res.status(500).json({ erro: err.message });
}

module.exports = { tratarErros };