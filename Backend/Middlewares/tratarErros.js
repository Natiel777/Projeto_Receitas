export function tratarErros(err, req, res, next) {
  console.error('Erro:', err);
  res.status(500).json({ erro: 'Erro interno' });
}