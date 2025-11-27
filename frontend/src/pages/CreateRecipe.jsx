import { useEffect, useState } from "react";
import { useAuth } from "../auth/Auth";
import { useNavigate } from "react-router-dom";

import { createReceita } from "../api/api";

function CriarReceita() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [imagem, setImagem] = useState(null);
  const [erro, setErro] = useState("");

  const { autenticado, carregando } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!carregando && !autenticado) {
      navigate("/login");
    }
  }, [carregando, autenticado, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descricaoFormatada = `
Ingredientes:
${ingredientes.trim()}

Modo de Preparo:
${modoPreparo.trim()}
    `.trim();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("categoria", categoria);
    formData.append("descricao", descricaoFormatada);
    if (imagem) formData.append("imagem", imagem);

    try {
      await createReceita(formData);
      navigate("/receitas");
    } catch (err) {
      setErro(err.message);
    }
  };

  if (carregando) return <p>Verificando login...</p>;
  if (!autenticado) return null;

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 rounded-lg shadow-lg bg-white dark:bg-neutral-700 transition-colors duration-500 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
        Criar Receita
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <input
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <textarea
          placeholder="Ingredientes (um por linha)"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <textarea
          placeholder="Modo de Preparo (passo a passo)"
          value={modoPreparo}
          onChange={(e) => setModoPreparo(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <input
          label="Imagem"
          type="file"
          onChange={(e) => setImagem(e.target.files[0])}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        {erro && (
          <p className="text-red-600 dark:text-red-400 text-sm">{erro}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300"
        >
          Publicar Receita
        </button>
      </form>
    </div>
  );
}

export default CriarReceita;