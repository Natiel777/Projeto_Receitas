const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const autenticar = require("../middlewares/autenticar");

router.post("/registrar", usuarioController.registrar);
router.post("/login", usuarioController.login);
router.get("/perfil", autenticar, usuarioController.perfil);
router.put("/editar", autenticar, usuarioController.editar);
router.delete("/excluir", autenticar, usuarioController.excluir);

module.exports = router;
