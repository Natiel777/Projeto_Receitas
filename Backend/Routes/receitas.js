const express = require('express');
const router = express.Router();
const db = require('../db');
const { auth } = require('../Middlewares/auth');
const { upload } = require('../Middlewares/upload');

// Publicar
router.post('/publicar', auth, upload.single('imagem'), (req,res,next)=>{
  const { titulo, ingredientes, modo_preparo } = req.body;
  const autor_id = req.usuario.id;
  const imagem = req.file ? req.file.filename : null;
  db.run(`INSERT INTO receitas (titulo,ingredientes,modo_preparo,imagem,autor_id) VALUES (?,?,?,?,?)`,
    [titulo,ingredientes,modo_preparo,imagem,autor_id],
    function(err){ if(err) return next(err); res.json({ id:this.lastID, titulo, ingredientes, modo_preparo, imagem }); });
});

// Editar
router.put('/:id', auth, upload.single('imagem'), (req,res,next)=>{
  const { titulo, ingredientes, modo_preparo } = req.body;
  const imagem = req.file ? req.file.filename : null;
  db.run(`UPDATE receitas SET titulo=?, ingredientes=?, modo_preparo=?, imagem=? WHERE id=? AND autor_id=?`,
    [titulo,ingredientes,modo_preparo,imagem,req.params.id,req.usuario.id], function(err){
      if(err) return next(err); res.json({ id:req.params.id, titulo, ingredientes, modo_preparo, imagem });
    });
});

// Excluir
router.delete('/:id', auth, (req,res,next)=>{
  db.run(`DELETE FROM receitas WHERE id=? AND autor_id=?`, [req.params.id, req.usuario.id], function(err){
    if(err) return next(err); res.json({ msg:'Receita excluída' });
  });
});

// Listar
router.get('/', (req,res,next)=>{
  db.all(`SELECT r.*, u.nome as autor FROM receitas r JOIN usuarios u ON r.autor_id = u.id`, [], (err,rows)=>{
    if(err) return next(err); res.json(rows);
  });
});

module.exports = router;