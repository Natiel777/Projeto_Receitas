import express from "express";
import cors from "cors";
import receitaRoutes from "./Routes/receitaRoutes.js";
import usuarioRoutes from "./Routes/usuarioRoutes.js";
import { tratarErros } from "./Middlewares/tratarErros.js";
import { logger } from "./Middlewares/logger.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => res.send("API Receitas Online funcionando!"));

app.use("/api/receitas", receitaRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.use(tratarErros);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
