const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization) {
      const [tipo, valor] = req.headers.authorization.split(" ");
      if (tipo === "Bearer") token = valor;
    }

    if (!token) {
      return res
        .status(401)
        .json({ erro: "Acesso negado. Nenhuma autenticação fornecida." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioId = decoded.id;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ erro: "Sessão expirada." });
    }

    return res.status(401).json({ erro: "Autenticação inválida." });
  }
};

module.exports = auth;
