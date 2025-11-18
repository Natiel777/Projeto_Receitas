const Receita = require("../models/Receita");

const receitaController = {
  criar: (req, res, next) => {
    const imagem = req.file ? req.file.filename : null;
    const { titulo, descricao, categoria } = req.body;
    const receita = {
      titulo,
      descricao,
      categoria,
      imagem,
      usuario_id: req.usuarioId,
    };
    Receita.criar(receita, (err, novaReceita) => {
      if (err) return next(err);
      res
        .status(201)
        .json({ mensagem: "Receita criada com sucesso", receita: novaReceita });
    });
  },

  listar: (req, res, next) => {
    Receita.listar((err, receitas) => {
      if (err) return next(err);
      res.json(receitas);
    });
  },

  detalhes: (req, res, next) => {
    Receita.buscarPorId(req.params.id, (err, receita) => {
      if (err || !receita) return next(err);
      res.json(receita);
    });
  },

  editar: (req, res, next) => {
    const imagem = req.file ? req.file.filename : req.body.imagem;
    const { titulo, descricao, categoria } = req.body;
    const dados = { titulo, descricao, categoria, imagem };
    Receita.atualizar(req.params.id, dados, (err, atualizada) => {
      if (err) return next(err);
      res.json({
        mensagem: "Receita atualizada com sucesso",
        receita: atualizada,
      });
    });
  },

  excluir: (req, res, next) => {
    Receita.excluir(req.params.id, (err) => {
      if (err) return next(err);
      res.json({ mensagem: "Receita excluída com sucesso" });
    });
  },
};

module.exports = receitaController;
