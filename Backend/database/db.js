import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve("./database/receitas.db");

// Garante que a pasta existe
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export async function abrirConexao() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Cria as tabelas, caso não existam
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      autor TEXT,
      imagem TEXT,
      usuario_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
  `);

  console.log("Banco de dados conectado com sucesso!");
  return db;
}
