const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const autenticar = require("../middlewares/autenticar");

router.post("/", autenticar, comentarioController.criar);
router.get("/receita/:receitaId", comentarioController.listar);
router.put("/:id", autenticar, comentarioController.editar);
router.delete("/:id", autenticar, comentarioController.excluir);

module.exports = router;
