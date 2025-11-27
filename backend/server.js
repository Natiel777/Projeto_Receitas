require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

const userRoutes = require("./src/routes/userRoutes");
const recipeRoutes = require("./src/routes/recipeRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const ratingRoutes = require("./src/routes/ratingRoutes");
const errors = require("./src/middlewares/errors");

app.use("/api/usuarios", userRoutes);
app.use("/api/receitas", recipeRoutes);
app.use("/api/comentarios", commentRoutes);
app.use("/api/avaliacoes", ratingRoutes);

app.use(errors);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
