const express = require("express");
const router = express.Router();
const avaliacaoController = require("../controllers/avaliacaoController");
const autenticar = require("../middlewares/autenticar");

router.post("/", autenticar, avaliacaoController.criar);
router.get("/receita/:receitaId", avaliacaoController.listar);
router.put("/:id", autenticar, avaliacaoController.editar);
router.delete("/:id", autenticar, avaliacaoController.excluir);

module.exports = router;
