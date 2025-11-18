const Comentario = require("../models/Comentario");

const comentarioController = {
  criar: (req, res, next) => {
    const comentario = {
      texto: req.body.texto,
      usuario_id: req.usuarioId,
      receita_id: req.body.receita_id,
    };
    Comentario.criar(comentario, (err, novoComentario) => {
      if (err) return next(err);
      res
        .status(201)
        .json({
          mensagem: "Comentário criado com sucesso",
          comentario: novoComentario,
        });
    });
  },

  listar: (req, res, next) => {
    Comentario.listarPorReceita(req.params.receitaId, (err, comentarios) => {
      if (err) return next(err);
      res.json(comentarios);
    });
  },

  editar: (req, res, next) => {
    const { texto } = req.body;
    const comentarioId = req.params.id;
    const usuarioId = req.usuarioId;

    Comentario.editar(comentarioId, texto, usuarioId, (err, atualizado) => {
      if (err) return next(err);
      res.json({
        mensagem: "Comentário editado com sucesso",
        comentario: atualizado,
      });
    });
  },

  excluir: (req, res, next) => {
    Comentario.excluir(req.params.id, (err) => {
      if (err) return next(err);
      res.json({ mensagem: "Comentário excluído com sucesso" });
    });
  },
};

module.exports = comentarioController;
