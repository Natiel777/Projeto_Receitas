// "Banco de dados" em memória
const usuarios = [];

// Cadastrar usuário
export const cadastrarUsuario = (req, res) => {
  const { nome, senha } = req.body;
  if (!nome || !senha) {
    return res.status(400).json({ mensagem: "Nome e senha são obrigatórios" });
  }

  const existe = usuarios.find(u => u.nome === nome);
  if (existe) {
    return res.status(400).json({ mensagem: "Usuário já existe" });
  }

  const novoUsuario = { id: usuarios.length + 1, nome, senha };
  usuarios.push(novoUsuario);

  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", usuario: { id: novoUsuario.id, nome: novoUsuario.nome } });
};

// Listar usuários (sem senha)
export const listarUsuarios = (req, res) => {
  const lista = usuarios.map(u => ({ id: u.id, nome: u.nome }));
  res.json(lista);
};

// Autenticar usuário (login)
export const autenticarUsuario = (req, res) => {
  const { nome, senha } = req.body;
  if (!nome || !senha) {
    return res.status(400).json({ mensagem: "Nome e senha são obrigatórios" });
  }

  const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
  }

  res.json({ mensagem: "Login realizado com sucesso!", usuario: { id: usuario.id, nome: usuario.nome } });
};
