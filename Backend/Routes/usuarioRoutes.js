import express from "express";
import bcrypt from "bcrypt";
import { gerarToken } from "../Middlewares/auth.js";

const router = express.Router();

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
    if (err.message.includes("UNIQUE"))
      return res.status(409).json({ erro: "Email já cadastrado" });
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

    const senhaOk = await bcrypt.compare(senha, user.senha);
    if (!senhaOk) return res.status(401).json({ erro: "Senha incorreta" });

    const token = gerarToken({ id: user.id, nome: user.nome, email: user.email });
    res.json({ token, nome: user.nome, id: user.id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;