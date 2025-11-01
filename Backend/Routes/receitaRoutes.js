import express from "express";
import { verificarToken } from "../Middlewares/auth.js";
import { upload } from "../Middlewares/upload.js";

const router = express.Router();

// Listar receitas ou buscar por termo
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  const { q } = req.query;

  try {
    if (q && q.trim() !== "") {
      const termo = `%${q.trim().toLowerCase()}%`;
      const receitas = await db.all(
        `SELECT * FROM receitas 
         WHERE LOWER(nome) LIKE ? 
            OR LOWER(descricao) LIKE ? 
            OR LOWER(autor) LIKE ?`,
        [termo, termo, termo]
      );
      return res.json(receitas);
    }

    const receitas = await db.all("SELECT * FROM receitas");
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar nova
router.post("/", verificarToken, upload.single("imagem"), async (req, res) => {
  const db = req.app.locals.db;
  const { nome, descricao, autor } = req.body;
  const usuario_id = req.usuario.id;
  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

  if (!nome) return res.status(400).json({ erro: "Campo nome obrigatório" });

  try {
    const result = await db.run(
      `INSERT INTO receitas (nome, descricao, autor, imagem, usuario_id)
       VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao ?? null, autor ?? null, imagem, usuario_id]
    );

    res.status(201).json({
      id: result.lastID,
      nome,
      descricao,
      autor,
      imagem,
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Excluir
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