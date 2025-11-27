require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const criarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const userController = {
  registrar: async (req, res, next) => {
    try {
      let { nome, email, senha } = req.body;

      const jaExiste = await prisma.usuarios.findUnique({
        where: { email }
      });

      if (jaExiste) {
        return res.status(400).json({ erro: "Email já cadastrado." });
      }

      if (senha) senha = await bcrypt.hash(senha, 10);

      const usuario = await prisma.usuarios.create({
        data: { nome, email, senha },
      });

      res.status(201).json({ mensagem: "Usuário registrado com sucesso", usuario });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, senha } = req.body;

      const usuario = await prisma.usuarios.findUnique({ where: { email } });
      if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

      const match = await bcrypt.compare(senha, usuario.senha);
      if (!match) return res.status(401).json({ erro: "Credenciais inválidas" });

      const token = criarToken(usuario.id);

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json({ mensagem: "Login realizado com sucesso", usuario });
    } catch (err) {
      next(err);
    }
  },

  perfil: async (req, res, next) => {
    try {
      const usuario = await prisma.usuarios.findUnique({ where: { id: req.usuarioId } });
      if (!usuario) return next(new Error("Usuário não encontrado"));
      res.json(usuario);
    } catch (err) {
      next(err);
    }
  },

  editar: async (req, res, next) => {
    try {
      const { nome, email, senhaAtual, senha: novaSenha } = req.body;

      if (!senhaAtual || senhaAtual.trim() === "")
        return res.status(400).json({ erro: "Informe sua senha atual para confirmar alterações." });

      const usuario = await prisma.usuarios.findUnique({ where: { id: req.usuarioId } });
      if (!usuario) return next(new Error("Usuário não encontrado"));

      const confereSenha = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!confereSenha) return res.status(401).json({ erro: "Senha atual incorreta." });

      const dadosAtualizar = { nome, email };
      if (novaSenha && novaSenha.trim() !== "") dadosAtualizar.senha = await bcrypt.hash(novaSenha, 10);

      const atualizado = await prisma.usuarios.update({
        where: { id: req.usuarioId },
        data: dadosAtualizar,
      });

      res.json({ mensagem: "Dados atualizados com sucesso", usuario: atualizado });
    } catch (err) {
      next(err);
    }
  },

  excluir: async (req, res, next) => {
    try {
      const id = req.usuarioId;

      await prisma.receitas.deleteMany({ where: { usuario_id: id } });
      await prisma.comentarios.deleteMany({ where: { usuario_id: id } });
      await prisma.avaliacoes.deleteMany({ where: { usuario_id: id } });
      await prisma.usuarios.delete({ where: { id } });

      res.json({ mensagem: "Conta excluída com sucesso" });
    } catch (err) {
      next(err);
    }
  },

  esqueciSenha: async (req, res, next) => {
    try {
      const { email } = req.body;
      const usuario = await prisma.usuarios.findUnique({ where: { email } });
      if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

      const token = crypto.randomBytes(32).toString("hex");
      const expira = new Date(Date.now() + 1000 * 60 * 15);

      await prisma.usuarios.update({
        where: { id: usuario.id },
        data: { resetToken: token, resetExpira: expira },
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      const link = `${frontendUrl}/resetar-senha?token=${token}`;


      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: usuario.email,
        subject: "Redefinição de senha",
        text: `Clique no link para redefinir sua senha: ${link}`,
        html: `<p>Clique no link abaixo para redefinir sua senha:</p>
               <a href="${link}">${link}</a>`,
      });

      res.json({ mensagem: "E-mail de reset enviado com sucesso" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  resetarSenhaEmail: async (req, res, next) => {
    try {
      const { token, novaSenha } = req.body;
      if (!novaSenha || !token) return res.status(400).json({ erro: "Token e nova senha são obrigatórios." });

      const usuario = await prisma.usuarios.findFirst({
        where: { resetToken: token, resetExpira: { gt: new Date() } },
      });

      if (!usuario) return res.status(400).json({ erro: "Token inválido ou expirado." });

      const hash = await bcrypt.hash(novaSenha, 10);

      await prisma.usuarios.update({
        where: { id: usuario.id },
        data: { senha: hash, resetToken: null, resetExpira: null },
      });

      res.json({ mensagem: "Senha redefinida com sucesso" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;