const express = require('express');
const router = express.Router();
const db = require('../db');
const { auth } = require('../Middlewares/auth');

router.post('/:id', auth, (req,res,next)=>{
  const receita_id = req.params.id;
  const usuario_id = req.usuario.id;
  const { nota } = req.body;
  db.run(`INSERT INTO avaliacoes (receita_id,usuario_id,nota) VALUES (?,?,?)`, [receita_id,usuario_id,nota], function(err){
    if(err) return next(err); res.json({ id:this.lastID, receita_id, usuario_id, nota });
  });
});

module.exports = router;