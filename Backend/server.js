import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { abrirConexao } from "./database/db.js";
import { logger } from "./Middlewares/logger.js";
import { tratarErros } from "./Middlewares/tratarErros.js";
import receitaRoutes from "./Routes/receitaRoutes.js";
import usuarioRoutes from "./Routes/usuarioRoutes.js";
import avaliarRoutes from "./Routes/avaliarRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middlewares globais
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(logger);

// Servir uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas principais
app.get("/", (req, res) => res.send("API Receitas Online funcionando!"));
app.use("/api/receitas", receitaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/avaliacoes", avaliarRoutes);

// Erros
app.use(tratarErros);

// Inicialização
(async () => {
  try {
    const db = await abrirConexao();
    app.locals.db = db;
    console.log("Banco de dados conectado!");

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
})();