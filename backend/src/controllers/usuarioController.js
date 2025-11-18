const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const Receita = require("../models/Receita");
const Comentario = require("../models/Comentario");
const Avaliacao = require("../models/Avaliacao");

const criarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const usuarioController = {
  registrar: async (req, res, next) => {
    try {
      if (req.body.senha) {
        req.body.senha = await bcrypt.hash(req.body.senha, 10);
      }
      await Usuario.criar(req.body, (err, usuario) => {
        if (err) return next(err);
        res
          .status(201)
          .json({ mensagem: "Usuário registrado com sucesso", usuario });
      });
    } catch (err) {
      next(err);
    }
  },

  login: (req, res, next) => {
    const { email, senha } = req.body;
    Usuario.buscarPorEmail(email, async (err, usuario) => {
      if (err || !usuario)
        return res.status(401).json({ erro: "Credenciais inválidas" });
      const match = await bcrypt.compare(senha, usuario.senha);
      if (!match)
        return res.status(401).json({ erro: "Credenciais inválidas" });

      const token = criarToken(usuario.id);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json({ mensagem: "Login realizado com sucesso", usuario });
    });
  },

  perfil: (req, res, next) => {
    Usuario.buscarPorId(req.usuarioId, (err, usuario) => {
      if (err || !usuario) return next(err);
      res.json(usuario);
    });
  },

  editar: async (req, res, next) => {
    try {
      const { nome, email, senhaAtual, senha: novaSenha } = req.body;

      if (!senhaAtual || senhaAtual.trim().length === 0) {
        return res
          .status(400)
          .json({ erro: "Informe sua senha atual para confirmar alterações." });
      }

      Usuario.buscarPorId(req.usuarioId, async (err, usuario) => {
        if (err || !usuario) return next(err);

        const confereSenha = await bcrypt.compare(senhaAtual, usuario.senha);
        if (!confereSenha) {
          return res.status(401).json({ erro: "Senha atual incorreta." });
        }

        const dados = { nome, email };
        if (novaSenha && novaSenha.trim().length > 0) {
          dados.senha = await bcrypt.hash(novaSenha, 10);
        }

        Usuario.atualizar(req.usuarioId, dados, (err2, atualizado) => {
          if (err2) return next(err2);
          res.json({
            mensagem: "Dados atualizados com sucesso",
            usuario: atualizado,
          });
        });
      });
    } catch (err) {
      next(err);
    }
  },

  excluir: (req, res, next) => {
    const id = req.usuarioId;
    Receita.buscarPorUsuario(id, (err, receitas) => {
      if (receitas) {
        receitas.forEach((r) => Receita.excluir(r.id, () => {}));
      }
    });
    Usuario.excluir(id, (err) => {
      if (err) return next(err);
      res.json({ mensagem: "Conta excluída com sucesso" });
    });
  },
};

module.exports = usuarioController;