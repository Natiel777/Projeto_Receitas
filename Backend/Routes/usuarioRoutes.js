import express from "express";
const router = express.Router();

// Listar usuários
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  try {
    const users = await db.all("SELECT id, nome, email FROM usuarios");
    res.json(users);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar usuário
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha)
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });

  try {
    const result = await db.run(
      `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
      [nome, email, senha]
    );
    res.status(201).json({ id: result.lastID, nome, email });
  } catch (err) {
    // captura erro de chave única no email
    if (err && err.message && err.message.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ erro: "Email já cadastrado" });
    }
    res.status(500).json({ erro: err.message });
  }
});

// Buscar usuário por ID
router.get("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    const user = await db.get(
      "SELECT id, nome, email FROM usuarios WHERE id = ?",
      [id]
    );
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;
