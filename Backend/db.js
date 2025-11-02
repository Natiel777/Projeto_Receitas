import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
  filename: './database.db',
  driver: sqlite3.Database
});

await db.exec(`
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT, email TEXT UNIQUE, senha TEXT
);
CREATE TABLE IF NOT EXISTS receitas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT, ingredientes TEXT, modo_preparo TEXT, imagem TEXT, autor_id INTEGER,
  FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS avaliacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  receita_id INTEGER, usuario_id INTEGER, nota INTEGER,
  FOREIGN KEY (receita_id) REFERENCES receitas(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
`);

export default db;