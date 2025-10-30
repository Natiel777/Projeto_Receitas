import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Abre o banco de dados SQLite (modo async/await)
export async function abrirConexao() {
  const db = await open({
    filename: path.resolve("Backend", "database", "receitas.db"),
    driver: sqlite3.Database,
  });

  // Cria tabelas se não existirem
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      ingredientes TEXT,
      preparo TEXT,
      usuario_id INTEGER,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );
  `);

  return db;
}