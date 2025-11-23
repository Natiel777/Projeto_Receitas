const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const auth = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", auth, upload.single("imagem"), recipeController.criar);
router.get("/", recipeController.listar);
router.get("/:id", recipeController.detalhes);
router.put(
  "/:id",
  auth,
  upload.single("imagem"),
  recipeController.editar
);
router.delete("/:id", auth, recipeController.excluir);

module.exports = router;
