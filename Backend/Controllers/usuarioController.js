const usuarios = [];

export const cadastrarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha)
    return res.status(400).json({ erro: "Preencha todos os campos" });

  const existe = usuarios.find(u => u.email === email);
  if (existe) return res.status(400).json({ erro: "Usuário já cadastrado" });

  const novoUsuario = { id: Date.now(), nome, email, senha };
  usuarios.push(novoUsuario);
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
};

export const loginUsuario = (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

  // Simulação de token JWT simples
  const token = `${usuario.id}-${Date.now()}`;
  res.json({ mensagem: "Login realizado", token });
};
