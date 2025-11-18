const request = require("supertest");
const { app, db } = require("./setup.js");

describe("Avaliações API", () => {
  let token;
  let usuarioId;
  let receitaId;

  beforeAll(async () => {
    const email = `av_${Date.now()}@mail.com`;

    const resUser = await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "Avaliador", email, senha: "123456" });

    usuarioId = resUser.body.usuario.id;

    const login = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha: "123456" });

    token = login.body.token;

    const receita = await request(app)
      .post("/api/receitas")
      .set("Authorization", `Bearer ${token}`)
      .send({ titulo: "Receita para avaliação", descricao: "Teste" });

    receitaId = receita.body.receita.id;
  });

  test("Avaliar receita", async () => {
    const res = await request(app)
      .post("/api/avaliacoes")
      .set("Authorization", `Bearer ${token}`)
      .send({ nota: 5, usuario_id: usuarioId, receita_id: receitaId });

    expect(res.status).toBe(201);
    expect(res.body.avaliacao.nota).toBe(5);
  });
});
