// Configuração de ambiente segura
import 'dotenv/config'; // Importa e carrega automaticamente variáveis do .env

// Importações principais
import express from "express";
import cors from "cors";
import receitaRoutes from "./Routes/receitaRoutes.js";
import usuarioRoutes from "./Routes/usuarioRoutes.js";
import { tratarErros } from "./Middlewares/tratarErros.js";
import { logger } from "./Middlewares/logger.js";
import { abrirConexao } from "./database/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Configurações iniciais
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(logger);

// Publicar arquivos de imagem (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Receitas Online funcionando!");
});

// Rotas principais
app.use("/api/receitas", receitaRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Middleware de tratamento de erros
app.use(tratarErros);

// Inicialização do servidor
(async () => {
  try {
    const db = await abrirConexao();
    console.log("Conectado ao banco de dados");
    app.locals.db = db;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err);
    process.exit(1);
  }
})();