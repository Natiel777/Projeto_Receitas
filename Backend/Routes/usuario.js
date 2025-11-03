import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../Models/Usuario.js";

dotenv.config();
const router = express.Router();

// Cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashed = await bcrypt.hash(senha, 10);
    const user = await Usuario.create({ nome, email, senha: hashed });
    res.json({ message: "Cadastro realizado", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: "Erro no cadastro" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await Usuario.findOne({ email });
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user._id, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

export default router;