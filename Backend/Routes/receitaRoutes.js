import express from "express";
import { verificarToken } from "../Middlewares/auth.js";
import { upload } from "../Middlewares/upload.js";

const router = express.Router();

// Listar todas as receitas
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  try {
    const receitas = await db.all("SELECT * FROM receitas");
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar nova receita com upload de imagem
router.post("/", verificarToken, upload.single("imagem"), async (req, res) => {
  const db = req.app.locals.db;
  const { nome, descricao, autor } = req.body;
  const usuario_id = req.usuario.id;

  if (!nome) return res.status(400).json({ erro: "Campo 'nome' é obrigatório" });

  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

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
      imagem
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

  try {
    const receita = await db.get("SELECT * FROM receitas WHERE id = ?", [id]);
    if (!receita) return res.status(404).json({ erro: "Receita não encontrada" });
    if (receita.usuario_id !== usuario_id)
      return res.status(403).json({ erro: "Você não pode excluir esta receita" });

    await db.run("DELETE FROM receitas WHERE id = ?", [id]);
    res.json({ mensagem: "Receita removida com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Buscar receita por ID
router.get("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    const receita = await db.get("SELECT * FROM receitas WHERE id = ?", [id]);
    if (!receita) return res.status(404).json({ erro: "Receita não encontrada" });
    res.json(receita);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Servir imagens estáticas
router.use("/uploads", express.static("Backend/Middlewares/uploads"));

export default router;