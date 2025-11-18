const Avaliacao = require("../models/Avaliacao");

const avaliacaoController = {
  criar: (req, res, next) => {
    const avaliacao = {
      nota: req.body.nota,
      usuario_id: req.usuarioId,
      receita_id: req.body.receita_id,
    };
    Avaliacao.criar(avaliacao, (err, novaAvaliacao) => {
      if (err) return next(err);
      res
        .status(201)
        .json({
          mensagem: "Avaliação registrada com sucesso",
          avaliacao: novaAvaliacao,
        });
    });
  },

  listar: (req, res, next) => {
    Avaliacao.listarPorReceita(req.params.receitaId, (err, avaliacoes) => {
      if (err) return next(err);
      res.json(avaliacoes);
    });
  },

  editar: (req, res, next) => {
    const { nota } = req.body;
    const avaliacaoId = req.params.id;
    const usuarioId = req.usuarioId;

    Avaliacao.editar(avaliacaoId, nota, usuarioId, (err, atualizada) => {
      if (err) return next(err);
      res.json({
        mensagem: "Avaliação editada com sucesso",
        avaliacao: atualizada,
      });
    });
  },

  excluir: (req, res, next) => {
    Avaliacao.excluir(req.params.id, (err) => {
      if (err) return next(err);
      res.json({ mensagem: "Avaliação excluída com sucesso" });
    });
  },
};

module.exports = avaliacaoController;
