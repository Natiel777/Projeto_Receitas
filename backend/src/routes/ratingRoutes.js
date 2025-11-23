const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const auth = require("../middlewares/auth");

router.post("/", auth, ratingController.criar);
router.get("/receita/:receitaId", ratingController.listar);
router.put("/:id", auth, ratingController.editar);
router.delete("/:id", auth, ratingController.excluir);

module.exports = router;
