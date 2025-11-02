const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('receitas.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS receitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    ingredientes TEXT,
    modo_preparo TEXT,
    imagem TEXT,
    autor_id INTEGER,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    receita_id INTEGER,
    usuario_id INTEGER,
    nota INTEGER,
    FOREIGN KEY (receita_id) REFERENCES receitas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`);
});

module.exports = db;