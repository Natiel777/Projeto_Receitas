import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let usuarios = [];

export const listarUsuarios = (req, res) => {
  res.json(usuarios);
};

export const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  const novo = { id: Date.now(), nome, email, senha: hash };
  usuarios.push(novo);
  res.status(201).json({ mensagem: "Usuário criado", usuario: novo });
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (!user) return res.status(401).json({ erro: "Usuário não encontrado" });

  const valido = await bcrypt.compare(senha, user.senha);
  if (!valido) return res.status(401).json({ erro: "Senha inválida" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ mensagem: "Login realizado", token });
};
