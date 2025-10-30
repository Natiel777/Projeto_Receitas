import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// Cadastro
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha)
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });

  try {
    const hash = await bcrypt.hash(senha, 10);
    const result = await db.run(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, hash]
    );
    res.status(201).json({ id: result.lastID, nome, email });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ erro: "Email já cadastrado" });
    }
    res.status(500).json({ erro: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const db = req.app.locals.db;
  const { email, senha } = req.body;

  try {
    const user = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (!user) return res.status(401).json({ erro: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, nome: user.nome, id: user.id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;