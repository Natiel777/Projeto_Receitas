import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";

function ResetarSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenUrl = searchParams.get("token");
    if (!tokenUrl) {
      setErro("Token inválido ou ausente.");
    } else {
      setToken(tokenUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (!novaSenha || novaSenha.trim().length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      await fetchAPI("usuarios/resetar-senha-email", "POST", {
        token,
        novaSenha,
      });
      setMensagem("Senha redefinida com sucesso! Redirecionando para login");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErro(err.message || "Erro ao redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 rounded-lg shadow-lg bg-white dark:bg-neutral-700 transition-colors duration-500 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
        Redefinir Senha
      </h2>

      {erro && (
        <p className="text-red-600 dark:text-red-400 text-sm mb-4">{erro}</p>
      )}
      {mensagem && (
        <p className="text-green-600 dark:text-green-400 text-sm mb-4">
          {mensagem}
        </p>
      )}

      {!mensagem && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            placeholder="Nova senha"
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Redefinindo Senha..." : "Redefinir Senha"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetarSenha;
