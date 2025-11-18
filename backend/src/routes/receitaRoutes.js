const express = require("express");
const router = express.Router();
const receitaController = require("../controllers/receitaController");
const autenticar = require("../middlewares/autenticar");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", autenticar, upload.single("imagem"), receitaController.criar);
router.get("/", receitaController.listar);
router.get("/:id", receitaController.detalhes);
router.put(
  "/:id",
  autenticar,
  upload.single("imagem"),
  receitaController.editar
);
router.delete("/:id", autenticar, receitaController.excluir);

module.exports = router;
