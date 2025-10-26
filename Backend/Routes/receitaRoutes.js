import express from "express";
import { listarReceitas, obterReceitaPorId } from "../controllers/receitaController.js";

const router = express.Router();

router.get("/", listarReceitas);
router.get("/:id", obterReceitaPorId);

export default router;
