import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRouter from "./routes/usuarios.js";
import { logger } from "./middlewares/logger.js";
import { tratarErros } from "./middlewares/tratarErros.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/usuarios", usuariosRouter);

app.use(tratarErros);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
