const cookieParser = require('cookie-parser');

function auth(req, res, next) {
  const usuarioId = req.cookies['usuarioId'] || req.headers['x-usuario-id'];
  if(!usuarioId) return res.status(401).json({ erro:'Não autorizado' });
  req.usuario = { id: parseInt(usuarioId) };
  next();
}

module.exports = { auth, cookieParser };