import { useEffect, useState } from "react";
import { useAuth } from "../auth/Auth";
import { fetchAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

function EditarUsuario() {
  const { autenticado } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!autenticado) return;
    fetchAPI("usuarios/perfil")
      .then((data) => {
        setNome(data.nome || "");
        setEmail(data.email || "");
      })
      .catch((err) => setErro(err.message));
  }, [autenticado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!senhaAtual.trim()) {
      setErro("Você precisa informar sua senha atual para confirmar.");
      return;
    }

    const payload = {
      nome,
      email,
      senhaAtual,
      ...(novaSenha.trim() && { senha: novaSenha }),
    };

    try {
      await fetchAPI("usuarios/editar", "PUT", payload);
      setSenhaAtual("");
      setNovaSenha("");
      navigate("/perfil");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 rounded-lg shadow-lg bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100 transition-colors duration-500 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors"></h2>
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
        Editar Perfil
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          autoComplete="username"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <input
          label="Senha atual"
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          placeholder="Digite sua senha atual"
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <input
          label="Nova senha"
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          autoComplete="new-password"
          placeholder="Digite a nova senha (opcional)"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        {erro && (
          <p className="text-red-600 dark:text-red-400 text-sm">{erro}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default EditarUsuario;
