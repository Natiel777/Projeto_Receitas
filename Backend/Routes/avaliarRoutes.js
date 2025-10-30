import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

// Middleware simples para verificar token
export function verificarToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ erro: "Token ausente" });

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

// Criar/atualizar avaliação
router.post("/", verificarToken, async (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.usuario;
  const { receita_id, nota, comentario } = req.body;

  if (!receita_id || !nota || nota < 1 || nota > 5)
    return res.status(400).json({ erro: "Dados inválidos" });

  try {
    const exist = await db.get(
      "SELECT * FROM avaliacoes WHERE receita_id = ? AND usuario_id = ?",
      [receita_id, usuario.id]
    );

    if (exist) {
      await db.run(
        "UPDATE avaliacoes SET nota = ?, comentario = ? WHERE id = ?",
        [nota, comentario ?? null, exist.id]
      );
      return res.json({ mensagem: "Avaliação atualizada" });
    }

    const result = await db.run(
      "INSERT INTO avaliacoes (receita_id, usuario_id, nota, comentario) VALUES (?, ?, ?, ?)",
      [receita_id, usuario.id, nota, comentario ?? null]
    );
    res.status(201).json({ id: result.lastID, receita_id, nota, comentario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar avaliações de uma receita
router.get("/:receita_id", async (req, res) => {
  const db = req.app.locals.db;
  const { receita_id } = req.params;
  try {
    const avaliacoes = await db.all(
      `SELECT a.*, u.nome as usuario_nome
       FROM avaliacoes a
       JOIN usuarios u ON u.id = a.usuario_id
       WHERE receita_id = ?`,
      [receita_id]
    );
    res.json(avaliacoes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;