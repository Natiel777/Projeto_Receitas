const request = require("supertest");
const { app, prisma, resetDatabase } = require("./setup.js");

describe("Registro de Usuário", () => {
  const email = `teste_registro_${Date.now()}@mail.com`;
  const senha = "123456";

  beforeAll(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Registro de novo usuário com sucesso! (Status 201)", async () => {
    const res = await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "Teste Registro", email, senha });

    expect(res.status).toBe(201);
    expect(res.body.mensagem).toBe("Usuário registrado com sucesso");
    expect(res.body.usuario).toBeDefined();
    expect(res.body.usuario.email).toBe(email);
    expect(res.body.usuario.senha).not.toBe(senha);
  });

  test("Email já cadastrado! (Status 400)", async () => {
    const res = await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "Teste Duplicado", email, senha });

    expect(res.status).toBe(400);
    expect(res.body.erro).toBe("Email já cadastrado.");
  });
});
