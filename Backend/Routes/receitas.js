import express from 'express';
import db from '../db.js';
import { auth } from '../Middlewares/auth.js';
import { upload } from '../Middlewares/upload.js';

const router = express.Router();

router.get('/', async (_, res) => {
  const receitas = await db.all(`
    SELECT r.*, u.nome AS autor
    FROM receitas r LEFT JOIN usuarios u ON r.autor_id = u.id
    ORDER BY r.id DESC
  `);
  res.json(receitas);
});

router.post('/publicar', auth, upload.single('imagem'), async (req, res) => {
  const { titulo, ingredientes, modo_preparo } = req.body;
  if (!titulo || !ingredientes || !req.file) return res.status(400).json({ erro: 'Campos obrigatórios' });
  const { lastID } = await db.run('INSERT INTO receitas (titulo, ingredientes, modo_preparo, imagem, autor_id) VALUES (?, ?, ?, ?, ?)', [titulo, ingredientes, modo_preparo, req.file.filename, req.user.id]);
  res.json({ id: lastID });
});

router.put('/:id', auth, async (req, res) => {
  const { titulo, ingredientes, modo_preparo } = req.body;
  const receita = await db.get('SELECT * FROM receitas WHERE id=?', [req.params.id]);
  if (!receita || receita.autor_id !== req.user.id) return res.status(403).json({ erro: 'Sem permissão' });
  await db.run('UPDATE receitas SET titulo=?, ingredientes=?, modo_preparo=? WHERE id=?', [titulo, ingredientes, modo_preparo, req.params.id]);
  res.json({ msg: 'Atualizada' });
});

router.delete('/:id', auth, async (req, res) => {
  const receita = await db.get('SELECT * FROM receitas WHERE id=?', [req.params.id]);
  if (!receita || receita.autor_id !== req.user.id) return res.status(403).json({ erro: 'Sem permissão' });
  await db.run('DELETE FROM receitas WHERE id=?', [req.params.id]);
  res.json({ msg: 'Excluída' });
});

export default router;