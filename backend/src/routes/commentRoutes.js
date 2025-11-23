const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");

router.post("/", auth, commentController.criar);
router.get("/receita/:receitaId", commentController.listar);
router.put("/:id", auth, commentController.editar);
router.delete("/:id", auth, commentController.excluir);

module.exports = router;
