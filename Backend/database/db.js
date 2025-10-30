import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, "receitas.db");
const seedFile = path.join(__dirname, "..", "data", "receitas.json");

// Abre o banco de dados SQLite (modo async/await)
export async function abrirConexao() {
  const db = await open({
    filename: dbFile,
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
      nome TEXT NOT NULL,
      descricao TEXT,
      autor TEXT,
      imagem TEXT,
      usuario_id INTEGER,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );
  `);

  try {
    const row = await db.get("SELECT COUNT(*) as c FROM receitas");
    if (!row || row.c === 0) {
      if (fs.existsSync(seedFile)) {
        const raw = fs.readFileSync(seedFile, "utf-8");
        const seed = JSON.parse(raw);
        for (const r of seed) {
          const nome = r.nome ?? r.titulo ?? null;
          const descricao = r.descricao ?? null;
          const autor = r.autor ?? null;
          const imagem = r.imagem ?? null;
          await db.run(
            `INSERT INTO receitas (nome, descricao, autor, imagem) VALUES (?, ?, ?, ?)`,
            [nome, descricao, autor, imagem]
          );
        }
        console.log("✅ Seed de receitas inserido a partir de Backend/data/receitas.json");
      } else {
        console.log("ℹ️ Arquivo de seed não encontrado em Backend/data/receitas.json");
      }
    }
  } catch (err) {
    console.error("Erro ao semear receitas:", err);
  }

  return db;
}
