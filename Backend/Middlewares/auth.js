import jwt from 'jsonwebtoken';
export function auth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ erro: 'Não autenticado' });
  try {
    req.user = jwt.verify(token, 'segredo');
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido' });
  }
}