import { Link } from "react-router-dom";
import { BASE_SERVER_URL } from "../services/api";

function CardReceita({ receita }) {
  const nomeDoAutor = receita.usuario?.nome || "Autor Desconhecido";

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={`${BASE_SERVER_URL}/uploads/${receita.imagem}`}
        alt={receita.titulo}
        className="w-full h-40 sm:h-48 object-cover rounded mb-3"
      />

      <p className="text-xs text-orange-500 dark:text-white mb-1">
        Por: <span className="font-semibold">{nomeDoAutor}</span>
      </p>

      <h2 className="text-lg font-bold mb-2 truncate">{receita.titulo}</h2>

      <p className="text-sm text-black flex-grow line-clamp-3 dark:text-white">
        {receita.descricao}
      </p>
      <Link
        to={`/receitas/${receita.id}`}
        className="text-black font-semibold mt-3 hover:underline self-start dark:text-white"
      >
        Ver mais
      </Link>
    </div>
  );
}

export default CardReceita;
