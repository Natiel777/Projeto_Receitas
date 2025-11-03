import express from "express";
import auth from "../Middlewares/auth.js";
import Comentario from "../Models/Comentario.js";
import Filter from "leo-profanity";

const router = express.Router();

// Listar comentários de uma receita
router.get("/:receitaId", async (req, res) => {
  try {
    const comentarios = await Comentario.find({ receita_id: req.params.receitaId });
    res.json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar comentários" });
  }
});

// Postar comentário
router.post("/:receitaId", auth, async (req, res) => {
  try {
    const texto = Filter.clean(req.body.texto);
    const comentario = await Comentario.create({
      receita_id: req.params.receitaId,
      usuario_id: req.user.id,
      usuario_nome: req.user.nome,
      texto
    });
    res.json(comentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao postar comentário" });
  }
});

export default router;