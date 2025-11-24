const request = require("supertest");
const { app, prisma, resetDatabase } = require("./setup.js");

describe("Usuário API", () => {
  let token;
  let usuarioId;
  const email = `teste_${Date.now()}@mail.com`;
  const senha = "123456";

  beforeAll(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Registrar usuário", async () => {
    const res = await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "Teste", email, senha });

    expect(res.status).toBe(201);
    expect(res.body.usuario.email).toBe(email);
    usuarioId = res.body.usuario_id || res.body.usuario.id;
  });

  test("Login usuário", async () => {
    const res = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha });

    expect(res.status).toBe(200);
    expect(res.body.usuario.email).toBe(email);
    token = res.body.token;
  });
});