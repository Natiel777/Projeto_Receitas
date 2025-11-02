function validarUsuario(req,res,next){
  const { nome, email, senha } = req.body;
  if(!nome || !email || !senha) return res.status(400).json({ erro:'Dados incompletos' });
  next();
}

module.exports = { validarUsuario };