export const validarUsuario = (req, res, next) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
  }
  next();
};