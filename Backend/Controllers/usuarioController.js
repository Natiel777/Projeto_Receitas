import { db } from "../db.js";

export const cadastrarUsuario = (req, res) => {
  const { nome, senha } = req.body;
  const sql = "INSERT INTO usuarios (nome, senha) VALUES (?, ?)";
  db.query(sql, [nome, senha], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  });
};

export const listarUsuarios = (req, res) => {
  db.query("SELECT id, nome FROM usuarios", (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(result);
  });
};
