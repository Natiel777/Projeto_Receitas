const prisma = require("../config/prisma");
const leoProfanity = require("leo-profanity");

leoProfanity.loadDictionary();

const commentController = {
  criar: async (req, res, next) => {
    try {
      let { texto, receita_id } = req.body;
      const usuarioId = req.usuarioId;

      if (!texto || !receita_id) {
        return res
          .status(400)
          .json({ erro: "Texto e receita são obrigatórios." });
      }

      texto = leoProfanity.clean(texto);

      const comentario = await prisma.comentarios.create({
        data: {
          texto,
          usuario_id: usuarioId,
          receita_id: Number(receita_id),
        },
        include: {
          usuario: { select: { id: true, nome: true } },
        },
      });

      res.status(201).json({
        mensagem: "Comentário criado com sucesso",
        comentario,
      });
    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      next(err);
    }
  },

  listar: async (req, res, next) => {
    try {
      const receitaId = Number(req.params.receitaId);

      const comentarios = await prisma.comentarios.findMany({
        where: { receita_id: receitaId },
        include: {
          usuario: { select: { id: true, nome: true } },
        },
        orderBy: { id: "desc" },
      });

      res.json(comentarios);
    } catch (err) {
      next(err);
    }
  },

  editar: async (req, res, next) => {
    try {
      const comentarioId = Number(req.params.id);
      let { texto } = req.body;
      const usuarioId = req.usuarioId;

      const existente = await prisma.comentarios.findUnique({
        where: { id: comentarioId },
      });

      if (!existente || existente.usuario_id !== usuarioId) {
        return res
          .status(403)
          .json({ erro: "Você não pode editar este comentário." });
      }

      texto = leoProfanity.clean(texto);

      const atualizado = await prisma.comentarios.update({
        where: { id: comentarioId },
        data: { texto },
      });

      res.json({
        mensagem: "Comentário editado com sucesso",
        comentario: atualizado,
      });
    } catch (err) {
      next(err);
    }
  },

  excluir: async (req, res, next) => {
    try {
      const comentarioId = Number(req.params.id);
      await prisma.comentarios.delete({ where: { id: comentarioId } });

      res.json({ mensagem: "Comentário excluído com sucesso" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = commentController;
