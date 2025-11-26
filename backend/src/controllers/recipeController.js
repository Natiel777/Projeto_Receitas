const prisma = require("../config/prisma");
const leoProfanity = require("leo-profanity");

leoProfanity.loadDictionary();

const RECIPE_CATEGORIES = [
  "Aperitivos",
  "Acompanhamentos",
  "Assados",
  "Bebidas",
  "Bolos e Tortas",
  "Carnes",
  "Churrasco",
  "Comida de Rua",
  "Comida Internacional",
  "Confeitaria",
  "Conservas",
  "Doces e Sobremesas",
  "Entradas",
  "Lanches",
  "Massas",
  "Ovos e Laticínios",
  "Pães e Fermentados",
  "Peixes e Frutos do Mar",
  "Pratos de Inverno",
  "Pratos de Verão",
  "Pratos Principais",
  "Refeições Rápidas",
  "Saladas",
  "Sanduíches",
  "Sopas e Caldos",
  "Vegan",
  "Vegetariano",
];

const recipeController = {
  criar: async (req, res, next) => {
    try {
      const { titulo, descricao, categoria } = req.body;
      const imagem = req.file ? req.file.filename : null;

      if (!RECIPE_CATEGORIES.includes(categoria)) {
        return res.status(400).json({ mensagem: "Categoria inválida." });
      }

      const isTitleClean = !leoProfanity.check(titulo);
      const isDescriptionClean = !leoProfanity.check(descricao);

      if (!isTitleClean || !isDescriptionClean) {
        return res.status(400).json({
          mensagem:
            "Conteúdo censurado. O título ou a descrição contêm palavras impróprias.",
        });
      }

      const receita = await prisma.receitas.create({
        data: {
          titulo,
          descricao,
          categoria,
          imagem,
          usuario_id: req.usuarioId,
        },
      });

      res.status(201).json({
        mensagem: "Receita criada com sucesso",
        receita,
      });
    } catch (err) {
      next(err);
    }
  },

  listar: async (req, res, next) => {
    try {
      const receitas = await prisma.receitas.findMany({
        include: {
          usuario: { select: { id: true, nome: true } },
          avaliacoes: true,
        },
        orderBy: { id: "desc" },
      });

      res.json(receitas);
    } catch (err) {
      next(err);
    }
  },

  detalhes: async (req, res, next) => {
    try {
      const receita = await prisma.receitas.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          usuario: { select: { id: true, nome: true } },
          comentarios: {
            include: { usuario: { select: { id: true, nome: true } } },
          },
          avaliacoes: true,
        },
      });

      if (!receita) return next(new Error("Receita não encontrada"));

      res.json(receita);
    } catch (err) {
      next(err);
    }
  },

  editar: async (req, res, next) => {
    try {
      const imagem = req.file ? req.file.filename : req.body.imagem;

      const dados = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        imagem,
      };

      const atualizada = await prisma.receitas.update({
        where: { id: Number(req.params.id) },
        data: dados,
      });

      res.json({
        mensagem: "Receita atualizada com sucesso",
        receita: atualizada,
      });
    } catch (err) {
      next(err);
    }
  },

  excluir: async (req, res, next) => {
    try {
      await prisma.receitas.delete({
        where: { id: Number(req.params.id) },
      });

      res.json({ mensagem: "Receita excluída com sucesso" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = recipeController;
