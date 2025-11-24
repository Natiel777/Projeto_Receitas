const { PrismaClient } = require("@prisma/client");
const app = require("../server");

const prisma = new PrismaClient();

async function resetDatabase() {
  if (
    !process.env.DATABASE_URL ||
    !process.env.DATABASE_URL.includes("test.db")
  ) {
    console.warn(
      "ATENÇÃO: Limpeza de banco de dados abortada (Não é o test.db)."
    );
    return;
  }

  await prisma.avaliacoes.deleteMany();
  await prisma.comentarios.deleteMany();
  await prisma.receitas.deleteMany();
  await prisma.usuarios.deleteMany();
}

module.exports = { app, prisma, resetDatabase };
