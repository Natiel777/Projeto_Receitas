import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAPI } from "../api/api";
import CardReceita from "../components/CardReceita";

function ListarReceitas() {
  const [receitas, setReceitas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const termoBusca = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    fetchAPI("receitas")
      .then((data) => {
        setReceitas(data);
        setLoading(false);
      })
      .catch((err) => {
        setErro(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (termoBusca) {
      const resultado = receitas.filter((r) => {
        const titulo = r?.titulo?.toLowerCase() || "";
        const descricao = r?.descricao?.toLowerCase() || "";
        return (
          titulo.includes(termoBusca.toLowerCase()) ||
          descricao.includes(termoBusca.toLowerCase())
        );
      });
      setFiltradas(resultado);
    } else {
      setFiltradas(receitas);
    }
  }, [termoBusca, receitas]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
        Receitas
      </h2>

      {erro && <p className="text-red-600 dark:text-red-400 mb-4">{erro}</p>}
      {loading && (
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Carregando receitas...
        </p>
      )}

      {termoBusca && !loading && (
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 transition-colors">
          Resultados para:{" "}
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {termoBusca}
          </span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && filtradas.length > 0
          ? filtradas.map((r) => <CardReceita key={r.id} receita={r} />)
          : !loading && (
              <p className="text-neutral-600 dark:text-neutral-400 transition-colors">
                Nenhuma receita encontrada.
              </p>
            )}
      </div>
    </div>
  );
}

export default ListarReceitas;