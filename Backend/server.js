// Importando os módulos que vamos usar
import express from "express"; // servidor
import cors from "cors";       // libera acesso entre frontend e backend
import { db } from "./db.js";  // conexão com o banco de dados
import usuarioRoutes from "./routes/usuarioRoutes.js"; // rotas de usuários
import receitaRoutes from "./routes/receitaRoutes.js"; // rotas de receitas
import logger from "./middlewares/logger.js";          // middleware pra mostrar logs no console

const app = express();
const PORT = 5000;

// Faz o servidor entender JSON
app.use(express.json());

// Libera acesso do frontend pro backend
app.use(cors());

// Mostra no console o método e a rota de cada requisição
app.use(logger);

// Rotas principais
app.use("/api/usuarios", usuarioRoutes); // tudo que for de usuário
app.use("/api/receitas", receitaRoutes); // tudo que for de receita

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
