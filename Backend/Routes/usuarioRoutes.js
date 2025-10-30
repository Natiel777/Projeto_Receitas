import express from "express";
const router = express.Router();

// Listar todos os usuários
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  try {
    const usuarios = await db.all("SELECT id, nome, email FROM usuarios");
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar novo usuário
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { nome, email, senha } = req.body;

  try {
    const result = await db.run(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    res.status(201).json({ id: result.lastID, nome, email });
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      res.status(400).json({ erro: "Email já cadastrado" });
    } else {
      res.status(500).json({ erro: err.message });
    }
  }
});

// Buscar usuário por e-mail
router.get("/:email", async (req, res) => {
  const db = req.app.locals.db;
  const { email } = req.params;
  try {
    const usuario = await db.get("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;