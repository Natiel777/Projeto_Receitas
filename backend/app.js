const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./src/routes/usuarioRoutes");
const receitaRoutes = require("./src/routes/receitaRoutes");
const comentarioRoutes = require("./src/routes/comentarioRoutes");
const avaliacaoRoutes = require("./src/routes/avaliacaoRoutes");
const tratarErros = require("./src/middlewares/tratarErros");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/receitas", receitaRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);

app.use(tratarErros);

module.exports = app;
