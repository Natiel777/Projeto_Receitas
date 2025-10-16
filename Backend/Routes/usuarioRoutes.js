import express from "express";
import { cadastrarUsuario, listarUsuarios } from "../Controllers/usuarioController.js";

const router = express.Router();

router.post("/", cadastrarUsuario); // POST /api/usuarios
router.get("/", listarUsuarios);    // GET /api/usuarios

export default router;
