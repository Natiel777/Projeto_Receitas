import express from "express";
import { verificarToken } from "../Middlewares/auth.js";
const router = express.Router();

// Listar todas as receitas
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  try {
    // Seleciona receitas e, caso exista, busca autor no usuário
    const receitas = await db.all(`
      SELECT r.*, u.nome AS usuario_nome
      FROM receitas r
      LEFT JOIN usuarios u ON u.id = r.usuario_id
      ORDER BY r.id DESC
    `);

    // Mapeia para o formato que o front espera (autor)
    const resultado = receitas.map(r => ({
      id: r.id,
      nome: r.nome,
      descricao: r.descricao,
      autor: r.autor || r.usuario_nome || "Anônimo",
      imagem: r.imagem,
      usuario_id: r.usuario_id
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar nova receita (exige autenticação)
router.post("/", verificarToken, async (req, res) => {
  const db = req.app.locals.db;
  const { nome, descricao, autor, imagem } = req.body;
  // obter usuário do token
  const usuario = req.usuario; // definido pelo middleware

  if (!nome) return res.status(400).json({ erro: "Campo 'nome' é obrigatório" });

  try {
    const autorFinal = autor ?? usuario.nome ?? null;
    const usuario_id = usuario.id ?? null;

    const result = await db.run(
      `INSERT INTO receitas (nome, descricao, autor, imagem, usuario_id)
       VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao ?? null, autorFinal, imagem ?? null, usuario_id]
    );
    res.status(201).json({
      id: result.lastID,
      nome,
      descricao,
      autor: autorFinal,
      imagem,
      usuario_id
    });
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

// Buscar receitas do usuário autenticado (ou por query)
router.get("/mine", verificarToken, async (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.usuario;
  try {
    const receitas = await db.all("SELECT * FROM receitas WHERE usuario_id = ?", [usuario.id]);
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Excluir receita (apenas autor)
router.delete("/:id", verificarToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const usuario = req.usuario;
  try {
    const receita = await db.get("SELECT * FROM receitas WHERE id = ?", [id]);
    if (!receita) return res.status(404).json({ erro: "Receita não encontrada" });
    if (receita.usuario_id && receita.usuario_id !== usuario.id) {
      return res.status(403).json({ erro: "Você não tem permissão para excluir esta receita" });
    }

    const result = await db.run("DELETE FROM receitas WHERE id = ?", [id]);
    res.json({ mensagem: "Receita removida com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;