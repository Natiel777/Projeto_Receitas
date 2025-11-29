const request = require("supertest");
const { app, prisma, resetDatabase } = require("./setup.js");

describe("Login de Usuário", () => {
  const email = `teste_login_${Date.now()}@mail.com`;
  const senha = "123456";

  beforeAll(async () => {
    await resetDatabase();
    await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "Teste Login", email, senha });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Deve realizar o login com credenciais válidas e retornar um token (Status 200)", async () => {
    const res = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha });

    expect(res.status).toBe(200);
    expect(res.body.mensagem).toBe("Login realizado com sucesso");
    expect(res.body.usuario).toBeDefined();
    expect(res.body.usuario.email).toBe(email);
    expect(res.body.token).toBeDefined();
    const setCookieHeader = res.headers['set-cookie'];
    expect(setCookieHeader).toBeDefined();
    expect(setCookieHeader[0]).toContain('token=');
    expect(setCookieHeader[0]).toContain('HttpOnly');
  });

  test("Login com senha incorreta! (Status 401)", async () => {
    const res = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha: "senhaIncorreta" });

    expect(res.status).toBe(401);
    expect(res.body.erro).toBe("Credenciais inválidas");
  });

  test("Login com email não cadastrado! (Status 401)", async () => {
    const res = await request(app)
      .post("/api/usuarios/login")
      .send({ email: "nao_existe@mail.com", senha });

    expect(res.status).toBe(401);
    expect(res.body.erro).toBe("Credenciais inválidas");
  });
});
