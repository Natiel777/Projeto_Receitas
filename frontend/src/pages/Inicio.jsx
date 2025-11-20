import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../api/api";
import CardReceita from "../components/CardReceita";
import SearchBar from "../components/SearchBar";

function Inicio() {
  const [receitas, setReceitas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAPI("receitas", "GET")
      .then((data) => {
        const recentes = data.sort((a, b) => b.id - a.id).slice(0, 7);
        setReceitas(recentes);
      })
      .catch((err) => setErro(err.message));
  }, []);

  const handleSearch = (query) => {
    navigate(`/receitas?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black-500">
        Bem-vindo ao Receitas Online
      </h1>
      <p className="text-black dark:text-neutral-300 mb-8">
        Descubra e compartilhe receitas deliciosas com nossa comunidade!
      </p>

      <div className="max-w-md mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Receitas Recentes</h2>
      {erro && <p className="text-orange-500 mb-2">{erro}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {receitas.length > 0 ? (
          receitas.map((r) => <CardReceita key={r.id} receita={r} />)
        ) : (
          <p className="text-gray-500">Nenhuma receita encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default Inicio;
