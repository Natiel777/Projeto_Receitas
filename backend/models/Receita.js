const db = require("../config/db");

const Receita = {
  criar: (receita, callback) => {
    const query = `INSERT INTO receitas (titulo, descricao, imagem, usuario_id, categoria) VALUES (?, ?, ?, ?, ?)`;
    db.run(
      query,
      [
        receita.titulo,
        receita.descricao,
        receita.imagem,
        receita.usuario_id,
        receita.categoria,
      ],
      callback
    );
  },

  listar: (callback) => {
    db.all(`SELECT * FROM receitas`, callback);
  },

  buscarPorId: (id, callback) => {
    db.get(`SELECT * FROM receitas WHERE id = ?`, [id], callback);
  },

  buscarPorUsuario: (usuario_id, callback) => {
    db.all(
      `SELECT * FROM receitas WHERE usuario_id = ?`,
      [usuario_id],
      callback
    );
  },

  atualizar: (id, dados, callback) => {
    const query = `UPDATE receitas SET titulo = ?, descricao = ?, imagem = ?, categoria = ? WHERE id = ?`;
    db.run(
      query,
      [dados.titulo, dados.descricao, dados.imagem, dados.categoria, id],
      callback
    );
  },

  excluir: (id, callback) => {
    db.run(`DELETE FROM receitas WHERE id = ?`, [id], callback);
  },
};

module.exports = Receita;