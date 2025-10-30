import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, "receitas.db");
const seedFile = path.join(__dirname, "..", "data", "receitas.json");

export async function abrirConexao() {
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database,
  });

  // Tabelas
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

  await db.exec(`
    CREATE TABLE IF NOT EXISTS avaliacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      receita_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      nota INTEGER NOT NULL CHECK(nota >= 1 AND nota <= 5),
      comentario TEXT,
      FOREIGN KEY(receita_id) REFERENCES receitas(id),
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
      UNIQUE(receita_id, usuario_id)
    );
  `);

  // Seed receitas
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
        console.log("✅ Seed de receitas inserido");
      }
    }
  } catch (err) {
    console.error("Erro ao exibir receitas:", err);
  }

  return db;
}