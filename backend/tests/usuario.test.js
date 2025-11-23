const request = require("supertest");
const { app, db } = require("./setup.js");

describe("Usuário API", () => {
  let token;
  let usuarioId;
  const email = `teste_${Date.now()}@mail.com`;
  const senha = "123456";

  test("Registrar usuário", async () => {
    const res = await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "Teste", email, senha });

    expect(res.status).toBe(201);
    expect(res.body.usuario.email).toBe(email);
    usuarioId = res.body.usuario_id;
  });

  test("Login usuário", async () => {
    const res = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha });

    expect(res.status).toBe(200);
    expect(res.body.usuario.email).toBe(email);
    token = res.body.token;
  });

  test("Atualizar usuário", async () => {
    const res = await request(app)
      .put("/api/usuarios/editar")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Teste Atualizado", email });

    expect(res.status).toBe(200);
    expect(res.body.usuario.nome).toBe("Teste Atualizado");
  });

  test("Excluir usuário", async () => {
    const res = await request(app)
      .delete(`/api/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);

    const loginCheck = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha });

    expect(loginCheck.status).toBe(401);
  });
});