const prisma = require("../config/prisma");

const ratingController = {
  criar: async (req, res, next) => {
    try {
      const { nota, receita_id } = req.body;
      const usuarioId = req.usuarioId;

      const avaliacao = await prisma.avaliacoes.create({
        data: {
          nota: Number(nota),
          usuario_id: usuarioId,
          receita_id: Number(receita_id),
        },
      });

      res.status(201).json({
        mensagem: "Avaliação registrada com sucesso",
        avaliacao,
      });
    } catch (err) {
      next(err);
    }
  },

  listar: async (req, res, next) => {
    try {
      const receitaId = Number(req.params.receitaId);

      const avaliacoes = await prisma.avaliacoes.findMany({
        where: { receita_id: receitaId },
        include: {
          usuario: { select: { id: true, nome: true } },
        },
      });

      res.json(avaliacoes);
    } catch (err) {
      next(err);
    }
  },

  editar: async (req, res, next) => {
    try {
      const avaliacaoId = Number(req.params.id);
      const usuarioId = req.usuarioId;
      const { nota } = req.body;

      const existente = await prisma.avaliacoes.findUnique({
        where: { id: avaliacaoId },
      });

      if (!existente) {
        return res.status(404).json({ erro: "Avaliação não encontrada" });
      }

      if (existente.usuario_id !== usuarioId) {
        return res
          .status(403)
          .json({ erro: "Você não pode editar esta avaliação" });
      }

      const atualizada = await prisma.avaliacoes.update({
        where: { id: avaliacaoId },
        data: { nota: Number(nota) },
      });

      res.json({
        mensagem: "Avaliação editada com sucesso",
        avaliacao: atualizada,
      });
    } catch (err) {
      next(err);
    }
  },

  excluir: async (req, res, next) => {
    try {
      const avaliacaoId = Number(req.params.id);

      await prisma.avaliacoes.delete({
        where: { id: avaliacaoId },
      });

      res.json({ mensagem: "Avaliação excluída com sucesso" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ratingController;
