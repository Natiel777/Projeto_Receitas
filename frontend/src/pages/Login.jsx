import { useState } from "react";
import { useAuth } from "../auth/Auth";
import { fetchAPI } from "../services/api";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchAPI("usuarios/login", "POST", { email, senha });
      await login();
    } catch (err) {
      setErro(err.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 rounded-lg shadow-lg bg-white dark:bg-neutral-700 transition-colors duration-500 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
        Entrar
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        {erro && (
          <p className="text-red-600 dark:text-red-400 text-sm">{erro}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300"
        >
          Entrar
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
        >
          Esqueci minha senha
        </Link>
      </div>
    </div>
  );
}

export default Login;