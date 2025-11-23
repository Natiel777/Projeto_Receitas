const request = require("supertest");
const { app, db } = require("./setup.js");

describe("Comentários API", () => {
  let token;
  let receitaId;
  let comentarioId;

  beforeAll(async () => {
    const email = `com_${Date.now()}@mail.com`;
    const senha = "123456";

    const resUser = await request(app)
      .post("/api/usuarios/registrar")
      .send({ nome: "Comentador", email, senha });

    const login = await request(app)
      .post("/api/usuarios/login")
      .send({ email, senha });

    token = login.body.token;

    const receita = await request(app)
      .post("/api/receitas")
      .set("Authorization", `Bearer ${token}`)
      .send({ titulo: "Receita para comentário", descricao: "Teste" });

    receitaId = receita.body.receita.id;
  });

  test("Adicionar comentário", async () => {
    const res = await request(app)
      .post("/api/comentarios")
      .set("Authorization", `Bearer ${token}`)
      .send({ texto: "Muito bom!", receita_id: receitaId });

    expect(res.status).toBe(201);
    expect(res.body.comentario.texto).toBe("Muito bom!");
    comentarioId = res.body.comentario.id;
  });

  test("Editar comentário", async () => {
    const res = await request(app)
      .put(`/api/comentarios/${comentarioId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ texto: "Excelente receita!" });

    expect(res.status).toBe(200);
    expect(res.body.comentario.texto).toBe("Excelente receita!");
  });

  test("Excluir comentário", async () => {
    const res = await request(app)
      .delete(`/api/comentarios/${comentarioId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);

    const resGet = await request(app)
      .get(`/api/comentarios/receita/${receitaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(resGet.body).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ id: comentarioId })
      ])
    );
  });
});