const path = require("path");
const { PrismaClient } = require("@prisma/client");
const app = require("../server");

const dbPath =
  process.env.NODE_ENV === "test"
    ? path.resolve("prisma/test.db")
    : path.resolve("prisma/dev.db");

process.env.DATABASE_URL = `file:${dbPath}?cache=shared`;

const prisma = new PrismaClient();

async function resetDatabase() {
  const tablenames = Object.keys(prisma._dmmf.modelMap);
  for (const name of tablenames) {
    await prisma[name].deleteMany();
  }
}

module.exports = { app, prisma, resetDatabase };