import express from 'express';
import db from '../db.js';
import { auth } from '../Middlewares/auth.js';
const router = express.Router();

router.post('/:id', auth, async (req, res) => {
  const { nota } = req.body;
  const receita = await db.get('SELECT id FROM receitas WHERE id=?', [req.params.id]);
  if (!receita) return res.status(404).json({ erro: 'Receita não encontrada' });
  await db.run('INSERT INTO avaliacoes (receita_id, usuario_id, nota) VALUES (?, ?, ?)', [req.params.id, req.user.id, nota]);
  res.json({ msg: 'Avaliação registrada' });
});

export default router;