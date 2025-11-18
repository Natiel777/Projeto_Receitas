const db = require("../config/db");

const Usuario = {
  criar: (usuario, callback) => {
    const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    db.run(query, [usuario.nome, usuario.email, usuario.senha], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...usuario });
    });
  },

  buscarPorEmail: (email, callback) => {
    db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], callback);
  },

  buscarPorId: (id, callback) => {
    db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], callback);
  },

  atualizar: (id, dados, callback) => {
    let query = `UPDATE usuarios SET nome = ?, email = ?`;
    const params = [dados.nome ?? null, dados.email ?? null];

    if (dados.senha) {
      query += `, senha = ?`;
      params.push(dados.senha);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    db.run(query, params, callback);
  },

  excluir: (id, callback) => {
    db.run(`DELETE FROM usuarios WHERE id = ?`, [id], callback);
  },
};

module.exports = Usuario;
