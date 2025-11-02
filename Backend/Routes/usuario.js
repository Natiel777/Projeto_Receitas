const express = require('express');
const router = express.Router();
const db = require('../db');
const { validarUsuario } = require('../Middlewares/validarUsuario');
const { auth } = require('../Middlewares/auth');

// Cadastro
router.post('/cadastrar', validarUsuario, (req,res,next)=>{
  const { nome,email,senha } = req.body;
  db.run(`INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)`, [nome,email,senha], function(err){
    if(err) return next(err);
    res.cookie('usuarioId', this.lastID, { httpOnly:true });
    res.json({ id:this.lastID, nome, email });
  });
});

// Login
router.post('/login',(req,res,next)=>{
  const { email, senha } = req.body;
  db.get(`SELECT * FROM usuarios WHERE email=? AND senha=?`,[email,senha],(err,row)=>{
    if(err) return next(err);
    if(!row) return res.status(401).json({ erro:'Usuário ou senha inválidos' });
    res.cookie('usuarioId', row.id, { httpOnly:true });
    res.json({ id:row.id, nome:row.nome, email:row.email });
  });
});

// Logout
router.post('/logout', auth, (req,res)=>{ res.clearCookie('usuarioId'); res.json({ msg:'Logout efetuado' }); });

// Editar
router.put('/editar', auth, (req,res,next)=>{
  const { nome,email,senha } = req.body;
  db.run(`UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?`, [nome,email,senha,req.usuario.id], function(err){
    if(err) return next(err);
    res.json({ id:req.usuario.id, nome, email });
  });
});

// Excluir usuário
router.delete('/excluir', auth, (req,res,next)=>{
  db.run(`DELETE FROM usuarios WHERE id=?`, [req.usuario.id], function(err){
    if(err) return next(err);
    res.clearCookie('usuarioId');
    res.json({ msg:'Usuário excluído' });
  });
});

module.exports = router;