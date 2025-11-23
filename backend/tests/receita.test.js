const request = require("supertest");
const { app, db } = require("./setup.js");

describe("Receitas API", () => {
  let token;
  let receitaId;

  beforeAll(async () => {
    const email = `user_${Date.now()}@mail.com`;
    const senha = "123456";

    await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "User", email, senha });

    const login = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha });

    token = login.body.token;
  });

  test("Criar receita", async () => {
    const res = await request(app)
      .post("/api/receitas")
      .set("Authorization", `Bearer ${token}`)
      .send({ titulo: "Bolo", descricao: "Bolo de teste" });

    expect(res.status).toBe(201);
    expect(res.body.receita.titulo).toBe("Bolo");
    receitaId = res.body.receita.id;
  });

  test("Listar receitas", async () => {
    const res = await request(app).get("/api/receitas");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Editar receita", async () => {
    const res = await request(app)
      .put(`/api/receitas/${receitaId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ titulo: "Bolo Atualizado", descricao: "Descrição atualizada" });

    expect(res.status).toBe(200);
    expect(res.body.receita.titulo).toBe("Bolo Atualizado");
    expect(res.body.receita.descricao).toBe("Descrição atualizada");
  });

  test("Excluir receita", async () => {
    const res = await request(app)
      .delete(`/api/receitas/${receitaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);

    const resGet = await request(app).get("/api/receitas");
    expect(resGet.body).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ id: receitaId })
      ])
    );
  });
});