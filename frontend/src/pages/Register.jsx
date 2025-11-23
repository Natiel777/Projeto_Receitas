import { useState } from "react";
import { fetchAPI } from "../services/api";
import { useAuth } from "../auth/Auth";

function Registrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchAPI("usuarios/registrar", "POST", { nome, email, senha });
      await fetchAPI("usuarios/login", "POST", { email, senha });
      await login();
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 rounded-lg shadow-lg bg-white dark:bg-neutral-700 transition-colors duration-100 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white transition-colors">
        Criar Conta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
            Nome
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            autoComplete="username"
            placeholder="Digite seu nome"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Digite seu email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
            Senha
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="Crie uma senha"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          />
        </div>

        {erro && (
          <p className="text-red-600 dark:text-red-400 text-sm">{erro}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}

export default Registrar;
