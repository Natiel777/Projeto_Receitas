import express from "express";
import cors from "cors";
import logger from "./middlewares/logger.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Rotas
app.use("/api/usuarios", usuarioRoutes);

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
