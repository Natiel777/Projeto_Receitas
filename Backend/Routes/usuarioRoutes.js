import { Router } from "express";
import { listarUsuarios, criarUsuario, login } from "../controllers/usuariosController.js";
import { validarUsuario } from "../middlewares/validarUsuario.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", validarUsuario, criarUsuario);
router.post("/login", login);

export default router;
