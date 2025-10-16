// Middleware simples de logger
export default function logger(req, res, next) {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next(); // segue para o próximo middleware ou rota
}
