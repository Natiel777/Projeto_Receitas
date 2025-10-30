import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validarUsuario } from "../Middlewares/validarUsuario.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "troque_essa_chave_para_producao";
const JWT_EXPIRES = "7d"; // token válido por 7 dias

// Listar usuários (apenas id, nome, email)
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  try {
    const users = await db.all("SELECT id, nome, email FROM usuarios");
    res.json(users);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar usuário (validação via middleware)
router.post("/", validarUsuario, async (req, res) => {
  const db = req.app.locals.db;
  const { nome, email, senha } = req.body;
  try {
    // hash da senha
    const hashed = await bcrypt.hash(senha, 10);
    const result = await db.run(
      `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
      [nome, email, hashed]
    );
    const novo = { id: result.lastID, nome, email };
    res.status(201).json(novo);
  } catch (err) {
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
    const user = await db.get("SELECT id, nome, email FROM usuarios WHERE id = ?", [id]);
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Login - retorna token JWT com payload { usuario: { id, nome, email } }
router.post("/login", async (req, res) => {
  const db = req.app.locals.db;
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: "E-mail e senha são obrigatórios" });

  try {
    const usuario = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) return res.status(401).json({ erro: "Credenciais inválidas" });

    const payload = { usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;