import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "troque_essa_chave_para_producao";

export function verificarToken(req, res, next) {
  const auth = req.headers.authorization || req.query.token || req.headers["x-access-token"];
  if (!auth) return res.status(401).json({ erro: "Token não fornecido" });

  // header: "Bearer <token>"
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // payload contém { usuario: { id, nome, email } }
    req.usuario = payload.usuario;
    next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}