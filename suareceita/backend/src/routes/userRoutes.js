const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/userController");
const autenticar = require("../middlewares/auth");

router.post("/registrar", usuarioController.registrar);
router.post("/login", usuarioController.login);
router.get("/perfil", autenticar, usuarioController.perfil);
router.put("/editar", autenticar, usuarioController.editar);
router.delete("/excluir", autenticar, usuarioController.excluir);
router.post("/esqueci-senha", usuarioController.esqueciSenha);
router.post("/resetar-senha-email", usuarioController.resetarSenhaEmail);

module.exports = router;
