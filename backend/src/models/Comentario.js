const db = require("../config/db");

const Comentario = {
  criar: (comentario, callback) => {
    const { texto, usuario_id, receita_id } = comentario;
    db.run(
      `INSERT INTO comentarios (texto, usuario_id, receita_id) VALUES (?, ?, ?)`,
      [texto, usuario_id, receita_id],
      callback
    );
  },

  listarPorReceita: (receitaId, callback) => {
    db.all(
      `SELECT c.id, c.texto, c.usuario_id, u.nome AS usuario_nome
       FROM comentarios c
       JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.receita_id = ?
       ORDER BY c.id DESC
       LIMIT 5`,
      [receitaId],
      callback
    );
  },

  editar: (id, texto, usuario_id, callback) => {
    db.run(
      `UPDATE comentarios SET texto = ? WHERE id = ? AND usuario_id = ?`,
      [texto, id, usuario_id],
      function (err) {
        if (err) return callback(err);
        if (this.changes === 0) return callback(new Error("Não autorizado"));
        callback(null);
      }
    );
  },

  excluir: (id, callback) => {
    db.run(`DELETE FROM comentarios WHERE id = ?`, [id], callback);
  },
};

module.exports = Comentario;
