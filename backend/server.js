require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

const usuarioRoutes = require("./src/routes/usuarioRoutes");
const receitaRoutes = require("./src/routes/receitaRoutes");
const comentarioRoutes = require("./src/routes/comentarioRoutes");
const avaliacaoRoutes = require("./src/routes/avaliacaoRoutes");
const tratarErros = require("./src/middlewares/tratarErros");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/receitas", receitaRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);

app.use(tratarErros);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});