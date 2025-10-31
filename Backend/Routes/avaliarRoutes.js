import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "minha_chave_secreta_segura_receitas_2025";

// Middleware
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token ausente" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
}

// Criar/atualizar avaliação
router.post("/", verificarToken, async (req, res) => {
  const db = req.app.locals.db;
  const { receita_id, nota, comentario } = req.body;
  const usuario_id = req.usuario.id;

  if (!receita_id || !nota) return res.status(400).json({ erro: "Dados inválidos" });

  const existe = await db.get(
    "SELECT * FROM avaliacoes WHERE receita_id = ? AND usuario_id = ?",
    [receita_id, usuario_id]
  );

  if (existe) {
    await db.run("UPDATE avaliacoes SET nota = ?, comentario = ? WHERE id = ?", [
      nota,
      comentario ?? null,
      existe.id,
    ]);
    return res.json({ mensagem: "Atualizada" });
  }

  await db.run(
    "INSERT INTO avaliacoes (receita_id, usuario_id, nota, comentario) VALUES (?, ?, ?, ?)",
    [receita_id, usuario_id, nota, comentario ?? null]
  );
  res.status(201).json({ mensagem: "Avaliação criada" });
});

export default router;