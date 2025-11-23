const request = require("supertest");
const { app, db } = require("./setup.js");

describe("Avaliações API", () => {
  let token;
  let usuarioId;
  let receitaId;
  let avaliacaoId;

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

  test("Criar avaliação", async () => {
    const res = await request(app)
      .post("/api/avaliacoes")
      .set("Authorization", `Bearer ${token}`)
      .send({ nota: 5, usuario_id: usuarioId, receita_id: receitaId });

    expect(res.status).toBe(201);
    expect(res.body.avaliacao.nota).toBe(5);
    avaliacaoId = res.body.avaliacao.id;
  });

  test("Editar avaliação", async () => {
    const res = await request(app)
      .put(`/api/avaliacoes/${avaliacaoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nota: 4 });

    expect(res.status).toBe(200);
    expect(res.body.avaliacao.nota).toBe(4);
  });

  test("Excluir avaliação", async () => {
    const res = await request(app)
      .delete(`/api/avaliacoes/${avaliacaoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);

    const resGet = await request(app)
      .get(`/api/avaliacoes/receita/${receitaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(resGet.body).toEqual(expect.not.arrayContaining([
      expect.objectContaining({ id: avaliacaoId })
    ]));
  });
});