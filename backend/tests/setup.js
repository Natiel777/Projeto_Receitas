const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = require("../app");

const dbPath =
  process.env.NODE_ENV === "test"
    ? path.resolve("data/test.db")
    : path.resolve("src/data/receitas.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log(`Conectado ao banco de dados: ${dbPath}`);
  }
});

module.exports = { app, db };
