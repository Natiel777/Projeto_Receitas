import express from "express";
import { verificarToken } from "../Middlewares/auth.js";

const router = express.Router();

// Criar/atualizar avaliação
router.post("/", verificarToken, async (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.usuario;
  const { receita_id, nota, comentario } = req.body;

  if (!receita_id || !nota || nota < 1 || nota > 5) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  try {
    // Tenta atualizar se já existe
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

    // Caso não exista, cria nova avaliação
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
