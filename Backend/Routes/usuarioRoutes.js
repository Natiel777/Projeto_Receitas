import express from "express";
import { cadastrarUsuario, listarUsuarios, autenticarUsuario } from "../controllers/usuarioController.js";

const router = express.Router();

// Rotas de usuário
router.post("/", cadastrarUsuario);        // POST /api/usuarios -> cadastrar usuário
router.get("/", listarUsuarios);           // GET /api/usuarios  -> listar usuários
router.post("/login", autenticarUsuario);  // POST /api/usuarios/login -> login

export default router;
