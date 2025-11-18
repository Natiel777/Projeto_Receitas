const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath =
  process.env.NODE_ENV === "test"
    ? path.resolve(__dirname, "../../data/test.db")
    : path.resolve(__dirname, "../data/receitas.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log(`Conectado ao banco de dados: ${dbPath}`);
    inicializarTabelas();
  }
});

function inicializarTabelas() {
  db.serialize(() => {
    db.run(`PRAGMA foreign_keys = ON`);

    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      imagem TEXT,
      categoria TEXT,
      usuario_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS comentarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT NOT NULL,
      usuario_id INTEGER,
      receita_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (receita_id) REFERENCES receitas(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS avaliacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nota INTEGER NOT NULL,
      usuario_id INTEGER,
      receita_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (receita_id) REFERENCES receitas(id) ON DELETE CASCADE
    )`);
  });
}

module.exports = db;
