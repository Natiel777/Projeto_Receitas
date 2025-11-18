const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" });
    }

    req.usuarioId = decoded.id;
    next();
  });
};

module.exports = autenticar;
