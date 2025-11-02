import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { auth } from '../Middlewares/auth.js';
import { validarUsuario } from '../Middlewares/validarUsuario.js';

const router = express.Router();

// Cadastro
router.post('/cadastrar', validarUsuario, async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  try {
    const { lastID } = await db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash]);
    res.json({ id: lastID, nome, email });
  } catch {
    res.status(400).json({ erro: 'E-mail já cadastrado' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
  if (!user || !(await bcrypt.compare(senha, user.senha))) return res.status(401).json({ erro: 'Credenciais inválidas' });
  const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, 'segredo', { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ id: user.id, nome: user.nome, email: user.email });
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logout efetuado' });
});

// Usuário logado
router.get('/logado', auth, async (req, res) => {
  const u = await db.get('SELECT id, nome, email FROM usuarios WHERE id = ?', [req.user.id]);
  if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(u);
});

// Editar
router.put('/editar', auth, async (req, res) => {
  const { nome, email, senha } = req.body;
  const user = await db.get('SELECT * FROM usuarios WHERE id = ?', [req.user.id]);
  if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
  const novoHash = senha ? await bcrypt.hash(senha, 10) : user.senha;
  await db.run('UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?', [nome || user.nome, email || user.email, novoHash, req.user.id]);
  res.json({ id: req.user.id, nome: nome || user.nome, email: email || user.email });
});

// Excluir
router.delete('/excluir', auth, async (req, res) => {
  await db.run('DELETE FROM usuarios WHERE id=?', [req.user.id]);
  res.clearCookie('token');
  res.json({ msg: 'Usuário excluído' });
});

export default router;