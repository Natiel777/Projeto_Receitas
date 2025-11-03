import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import usuarioRoutes from "./Routes/usuario.js";
import perfilRoutes from "./Routes/perfil.js";
import receitaRoutes from "./Routes/receitas.js";
import comentarioRoutes from "./Routes/comentarios.js";

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5500", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });
app.use(limiter);

app.use("/user", usuarioRoutes);
app.use("/profile", perfilRoutes);
app.use("/receitas", receitaRoutes);
app.use("/comentarios", comentarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));