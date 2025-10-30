import express from "express";
import cors from "cors";
import receitaRoutes from "./Routes/receitaRoutes.js";
import usuarioRoutes from "./Routes/usuarioRoutes.js";
import { tratarErros } from "./Middlewares/tratarErros.js";
import { logger } from "./Middlewares/logger.js";
import { abrirConexao } from "./database/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => res.send("🍽️ API Receitas Online funcionando!"));

// Rotas principais
app.use("/api/receitas", receitaRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Middleware de erro
app.use(tratarErros);

// Inicialização
(async () => {
  try {
    const db = await abrirConexao();
    console.log("✅ Conectado ao banco SQLite");
    app.locals.db = db; // disponibiliza o db globalmente nas rotas

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao conectar ao banco:", err);
  }
})();