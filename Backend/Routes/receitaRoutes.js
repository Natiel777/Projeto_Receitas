import express from "express";
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

// Criar nova receita
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { titulo, descricao, ingredientes, preparo, usuario_id } = req.body;

  try {
    const result = await db.run(
      `INSERT INTO receitas (titulo, descricao, ingredientes, preparo, usuario_id)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, descricao, ingredientes, preparo, usuario_id]
    );
    res.status(201).json({ id: result.lastID, titulo, descricao });
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

// Excluir receita
router.delete("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    const result = await db.run("DELETE FROM receitas WHERE id = ?", [id]);
    if (result.changes === 0)
      return res.status(404).json({ erro: "Receita não encontrada" });
    res.json({ mensagem: "Receita removida com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;