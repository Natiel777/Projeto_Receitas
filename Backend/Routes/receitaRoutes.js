import express from "express";
import { verificarToken } from "../Middlewares/auth.js";
import { upload } from "../Middlewares/upload.js";

const router = express.Router();

// Buscar receitas
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  const { q } = req.query;

  try {
    let receitas;
    if (q && q.trim() !== "") {
      const termo = `%${q.trim().toLowerCase()}%`;
      receitas = await db.all(
        `SELECT r.*, u.nome AS autor
         FROM receitas r
         LEFT JOIN usuarios u ON r.usuario_id = u.id
         WHERE LOWER(r.nome) LIKE ? 
            OR LOWER(r.descricao) LIKE ? 
            OR LOWER(u.nome) LIKE ?`,
        [termo, termo, termo]
      );
    } else {
      receitas = await db.all(`
        SELECT r.*, u.nome AS autor
        FROM receitas r
        LEFT JOIN usuarios u ON r.usuario_id = u.id
      `);
    }

    // Corrige caminho das imagens
    receitas = receitas.map(r => ({
      ...r,
      imagem: r.imagem ? `http://localhost:3001${r.imagem}` : null
    }));

    res.json(receitas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar receita
router.post("/", verificarToken, upload.single("imagem"), async (req, res) => {
  const db = req.app.locals.db;
  const { nome, descricao } = req.body;
  const usuario_id = req.usuario.id;
  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

  if (!nome) return res.status(400).json({ erro: "Campo nome obrigatório" });

  try {
    const autorObj = await db.get("SELECT nome FROM usuarios WHERE id = ?", [usuario_id]);
    const autor = autorObj?.nome || "Anônimo";

    const result = await db.run(
      `INSERT INTO receitas (nome, descricao, autor, imagem, usuario_id)
       VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao ?? null, autor, imagem, usuario_id]
    );

    res.status(201).json({
      id: result.lastID,
      nome,
      descricao,
      autor,
      imagem: imagem ? `http://localhost:3001${imagem}` : null
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Excluir receita
router.delete("/:id", verificarToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const usuario_id = req.usuario.id;

  const receita = await db.get("SELECT * FROM receitas WHERE id = ?", [id]);
  if (!receita) return res.status(404).json({ erro: "Não encontrada" });
  if (receita.usuario_id !== usuario_id)
    return res.status(403).json({ erro: "Sem permissão" });

  await db.run("DELETE FROM receitas WHERE id = ?", [id]);
  res.json({ mensagem: "Removida com sucesso" });
});

export default router;