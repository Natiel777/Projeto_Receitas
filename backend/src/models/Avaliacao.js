const db = require("../config/db");

const Avaliacao = {
  criar: (avaliacao, callback) => {
    const { nota, usuario_id, receita_id } = avaliacao;

    db.get(
      `SELECT id FROM avaliacoes WHERE usuario_id = ? AND receita_id = ?`,
      [usuario_id, receita_id],
      (err, row) => {
        if (err) return callback(err);

        if (row) {
          db.run(
            `UPDATE avaliacoes SET nota = ? WHERE id = ?`,
            [nota, row.id],
            function (err) {
              if (err) return callback(err);
              callback(null);
            }
          );
        } else {
          db.run(
            `INSERT INTO avaliacoes (nota, usuario_id, receita_id) VALUES (?, ?, ?)`,
            [nota, usuario_id, receita_id],
            callback
          );
        }
      }
    );
  },

  listarPorReceita: (receitaId, callback) => {
    db.all(
      `SELECT a.id, a.nota, a.usuario_id, u.nome AS usuario_nome
       FROM avaliacoes a
       JOIN usuarios u ON a.usuario_id = u.id
       WHERE a.receita_id = ?`,
      [receitaId],
      callback
    );
  },

  editar: (id, nota, usuario_id, callback) => {
    db.run(
      `UPDATE avaliacoes SET nota = ? WHERE id = ? AND usuario_id = ?`,
      [nota, id, usuario_id],
      function (err) {
        if (err) return callback(err);
        if (this.changes === 0) return callback(new Error("Não autorizado"));
        callback(null);
      }
    );
  },

  excluir: (id, callback) => {
    db.run(`DELETE FROM avaliacoes WHERE id = ?`, [id], callback);
  },
};

module.exports = Avaliacao;
