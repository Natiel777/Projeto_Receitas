import jwt from "jsonwebtoken";

const JWT_SECRET = "chave_receitas_2025";
export function verificarToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ erro: "Token ausente" });

  const token = auth.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

export function gerarToken(dados) {
  return jwt.sign(dados, JWT_SECRET, { expiresIn: "2h" });
}