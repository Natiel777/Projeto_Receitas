import express from "express";
import { cadastrarUsuario, loginUsuario } from "../Controllers/usuarioController.js";

const router = express.Router();

router.post("/", cadastrarUsuario);
router.post("/login", loginUsuario);

export default router;
