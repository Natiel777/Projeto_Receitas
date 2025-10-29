import express from "express";
import { getReceitas, addReceita } from "../Controllers/receitaController.js";

const router = express.Router();

router.get("/", getReceitas);
router.post("/", addReceita);

export default router;
